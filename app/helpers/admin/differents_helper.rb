=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - DifferentsHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/09/11
    * 作成者        :   daonx – daonx@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   HELPER
    * @copyright   :   Copyright (c) ANS-ASIA
    * @version     :   1.0.0
    * ****************************************************************************
=end
require 'fileutils'
module Admin
    module DifferentsHelper
        class DifferentsHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of table different
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/11 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDifferents
                lang = Helper.getLang
                return Different.where(deleted_at: nil, lang: lang)
                             .select(
                                :id,
                                :title,
                                :content,
                                :icon,
                                :show
                             )
            end
            ###
             # get data of table different by id
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/11 - create
             # @param       :   id - int - id of different need to get
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDifferent(id)
                data                 = Hash.new
                data['different_vi'] = Different.find_by(lang: 'vi', id: id, deleted_at: nil)
                data['different_ja'] = Different.find_by(lang: 'ja', id: id, deleted_at: nil)
                data['lang']         = Language.where(deleted_at: nil)
                                               .where.not(language_code: 'vi')
                                               .select('id, language_name, language_code')
                                               .order('id')
                return data
            end
            ###
             # create a different
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/11 - create
             # @param       :   different - Hash - data of different need to add
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.saveDifferent(different)
                result               = Hash.new
                result['status']     = true
                
                uploadIcon           = Hash.new
                uploadIcon['status'] = true
                uploadIcon['link']   = ''
                begin
                    ActiveRecord::Base.transaction do
                        file                 = Helper.save_file(different[:icon], '/images/different/')
                        uploadIcon['link']   = file['link']   if file.present? && file['link'].present?
                        uploadIcon['status'] = file['status'] if file.present? && file['status'].present?

                        if file.present? && file['status'].present?
                            lang = Language.where(deleted_at: nil).select('id, language_name, language_code')
                            id   = Helper.getID('differents')
                            lang.each do |item|
                                Different.create(
                                        id:         id,
                                        lang:       item[:language_code],
                                        title:      different[:title],
                                        content:    different[:content],
                                        icon:       file['link'],
                                        show:       (different[:show] == 'on' ? 1 : 0),
                                        created_by: $user_id
                                    )
                            end
                            result['id'] = id
                        else
                            result = file
                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"

                    if (uploadIcon['status'])
                        begin
                            # remove file Icon
                            FileUtils.rm('public' + uploadIcon['link'])
                        rescue
                        end
                    end

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    return result
                end
            end
            ###
             # update a different
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/11 - create
             # @param       :   different - Hash - data of different need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateDifferent(different)
                result           = Hash.new
                result['status'] = true
                update           = true

                oldIcon          = nil
                removeOldIcon    = false

                iconSave         = nil
                begin
                    ActiveRecord::Base.transaction do
                        oldDifferent = Different.find_by(id: different[:id], lang: 'vi')

                        if oldDifferent != nil
                            oldIcon   = oldDifferent.icon

                            # remove file (if icon not exist in table different) and save file (file change)
                            if different[:icon].present?
                                checkExistsIcon = Different.where(lang: 'vi', icon: oldIcon, deleted_at: nil)
                                                           .where.not(id: different[:id])
                                                           .first
                                if checkExistsIcon == nil
                                    removeOldIcon = true
                                end

                                file = Helper.save_file(different[:icon], '/images/different/')
                                if file['status']
                                    iconSave = file['link']
                                else
                                    update = false
                                    result = file
                                end
                            end
                            
                            if update
                                update_vi = Different.where(id: different[:id], lang: 'vi')
                                                      .update_all(
                                                            title:      different[:title],
                                                            content:    different[:content],
                                                      )

                                if iconSave.present?
                                    update_icon = Different.where(id: different[:id])
                                                          .update_all(
                                                                icon:       iconSave
                                                          )
                                end

                                update_all = Different.where(id: different[:id])
                                                      .update_all(
                                                            show:       different[:show] == 'on' ? 1 : 0,
                                                            updated_at: Time.now,
                                                            updated_by: $user_id
                                                      )
                                
                                
                                result['id']     = update_vi && update_all ? different[:id] : ''
                                result['status'] = update_vi && update_all
                            end

                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"

                    if iconSave.present?
                        begin
                            FileUtils.rm('public' + iconSave)
                        rescue
                        end
                    end

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    result['status'] = Helper.to_b(result['status'])
                    if result['status']
                        if removeOldIcon
                            begin
                                FileUtils.rm('public' + oldIcon)
                            rescue
                            end
                        end
                    end

                    return result
                end
            end
            ###
             # update data translate of a different
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/11 - create
             # @param       :   different - Hash - data translate of different need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateDifferentTrans(different)
                result           = Hash.new
                result['status'] = true
                update           = true

                begin
                    ActiveRecord::Base.transaction do
                        oldDifferent = Different.find_by(id: different[:id], lang: different[:lang])

                        if oldDifferent != nil
                            update = Different.where(id: different[:id], lang: different[:lang])
                                              .update_all(
                                                    title:      different[:title],
                                                    content:    different[:content],
                                                    updated_at: Time.now,
                                                    updated_by: $user_id
                                                )
                                            
                            result['status'] = update
                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"
                ensure
                    return result['status']
                end
            end
            ###
             # delete a different
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/11 - create
             # @param       :   id - int - id of different need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteDifferent(id)
                result           = Hash.new
                result['status'] = true

                oldIcon          = nil
                removeOldIcon    = false
                begin
                    ActiveRecord::Base.transaction do
                        different = Different.find_by(id: id, lang: 'vi')
                        
                        # check isset icon in other
                        icon      = Different.where(icon: different[:icon],
                                                    deleted_at: nil)
                                             .where.not(id: id)
                                             .first

                        oldIcon = different[:icon]

                        if icon == nil
                            removeOldIcon = true
                        end

                        update = Different.where(id: id)
                                          .update_all(
                                                deleted_by: $user_id,
                                                deleted_at: Time.now
                                          )
                        result = update
                    end
                rescue
                    return false

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    if result
                        if removeOldIcon
                            begin
                                FileUtils.rm('public' + oldIcon)
                            rescue
                            end
                        end
                    end

                    return result
                end
            end
        end
    end
end