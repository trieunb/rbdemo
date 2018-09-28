=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - SlidesHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/24
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
    module SlidesHelper
        class SlidesHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of table slide
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/24 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getSlides
                lang = Helper.getLang
                return Slide.where(deleted_at: nil, lang: lang)
                             .select(
                                :id,
                                :img,
                                :link,
                                :show
                             )
            end
            ###
             # get data of table slide by id
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/24 - create
             # @param       :   id - int - id of slide need to get
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getSlide(id)
                data             = Hash.new
                data['slide_vi'] = Slide.find_by(lang: 'vi', id: id, deleted_at: nil)
                data['slide_ja'] = Slide.find_by(lang: 'ja', id: id, deleted_at: nil)
                data['lang']     = Language.where(deleted_at: nil).where.not(language_code: 'vi').select('id, language_name, language_code').order('id')
                return data
            end
            ###
             # create a slide
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/24 - create
             # @param       :   slide - Hash - data of slide need to add
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.saveSlide(slide)
                result          = Hash.new
                result[:status] = true
                linkImage       = nil
                begin
                    ActiveRecord::Base.transaction do
                        file      = Helper.save_file(slide[:img], '/images/slide/')
                        linkImage = file['link'] if file && file['link']
                        
                        if file['status'] == true
                            lang = Language.where(deleted_at: nil).select('id, language_name, language_code')
                            id   = Helper.getID('slides')
                            lang.each do |item|
                                Slide.create(
                                        id:         id,
                                        lang:       item[:language_code],
                                        img:        file['link'],
                                        link:       slide[:link],
                                        show:       (slide[:show] == 'on' ? 1 : 0),
                                        created_by: $user_id
                                    )
                            end
                            result['id'] = id
                        else
                            result = file
                        end
                    end
                rescue
                    if linkImage.present?
                        begin
                            FileUtils.rm('public' + linkImage)
                        rescue
                        end
                    end
                    result['status'] = false
                    result['error']  = "#{$!}"
                    # Roll back
                    raise ActiveRecord::RollBack
                ensure
                    return result
                end
            end
            ###
             # update a slide
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/24 - create
             # @param       :   slide - Hash - data of slide need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateSlide(slide)
                result           = Hash.new
                result['status'] = true

                linkImage        = nil

                removeOldImage   = false
                oldImage         = nil
                begin
                    ActiveRecord::Base.transaction do
                        oldSlide = Slide.find_by(id: slide[:id], lang: 'vi')
                        if oldSlide != nil
                            oldImage    = oldSlide.img
                            
                            # declare variables
                            update      = true
                            imageUrl    = ''
                            updateImage = true

                            # remove file (if img not exist in table slide) and save file (file change)
                            if slide[:img].present?
                                checkIssetImage = Slide.where(img: oldImage, deleted_at: nil)
                                              .where.not('id=' + slide[:id] + ' AND lang=\'vi\'')
                                              .first
                                if checkIssetImage == nil
                                    removeOldImage = true
                                end

                                file      = Helper.save_file(slide[:img], '/images/slide/')
                                linkImage = file['link'] if (file && file['status'] && file['link'])

                                if file['status']
                                    imageUrl = file['link']
                                else
                                    update = false
                                    result = file
                                end
                            end

                            if update
                                if imageUrl.present?
                                    updateImage = Slide.where(id: slide[:id], lang: 'vi')
                                                    .update_all(
                                                            img: imageUrl,
                                                        )
                                end

                                updateSlide = Slide.where(id: slide[:id])
                                                .update_all(
                                                        link:       slide[:link],
                                                        show:       slide[:show] == 'on' ? 1 : 0,
                                                        updated_at: Time.now,
                                                        updated_by: $user_id
                                                )
                                                
                                result['status'] = updateImage && updateSlide
                            end
                        end
                    end
                rescue
                    if linkImage.present?
                        begin
                            FileUtils.rm('public' + linkImage)
                        rescue
                        end
                    end

                    result['status'] = false
                    result['error']  = "#{$!}"

                    # Roll back
                    raise ActiveRecord::RollBack
                ensure
                    result['status'] = Helper.to_b(result['status'])
                    if result['status'] && removeOldImage && oldImage.present?
                        begin
                            FileUtils.rm('public' + oldImage)
                        rescue
                        end
                    end

                    return result
                end
            end
            ###
             # update data translate of a slide
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/24 - create
             # @param       :   slide - Hash - data translate of slide need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateSlideTrans(slide)
                result           = Hash.new
                result['status'] = true

                linkImage        = nil

                removeOldImage   = false
                oldImage         = nil
                begin
                    ActiveRecord::Base.transaction do
                        oldSlide = Slide.find_by(id: slide[:id], lang: slide[:lang])
                        if oldSlide != nil
                            oldImage    = oldSlide.img
                            
                            # declare variables
                            update      = true
                            imageUrl    = ''
                            updateImage = true

                            if slide[:img] != nil && slide[:img] != ''
                                checkIssetImage = Slide.where(img: oldImage, deleted_at: nil)
                                                  .where.not('id=' + slide[:id] + ' AND lang=\'' + slide[:lang] + '\'')
                                                  .first

                                if checkIssetImage == nil
                                    removeOldImage = true
                                end

                                file      = Helper.save_file(slide[:img], '/images/slide/')
                                linkImage = file['link'] if (file && file['status'] && file['link'])

                                if file['status']
                                    imageUrl = file['link']
                                else
                                    update = false
                                    result = file
                                end

                                if update
                                    if imageUrl.present?
                                        updateImage = Slide.where(id: slide[:id], lang: slide[:lang])
                                                        .update_all(
                                                                img: imageUrl,
                                                                updated_at: Time.now,
                                                                updated_by: $user_id
                                                            )
                                    end
                                                    
                                    result['status'] = updateImage
                                end
                            end
                        end
                    end
                rescue
                    if linkImage.present?
                        begin
                            FileUtils.rm('public' + linkImage)
                        rescue
                        end
                    end

                    result['status'] = false
                    result['error']  = "#{$!}"
                    # Roll back
                    raise ActiveRecord::RollBack
                ensure
                    result['status'] = Helper.to_b(result['status'])
                    if result['status'] && removeOldImage && oldImage.present?
                        begin
                            FileUtils.rm('public' + oldImage)
                        rescue
                        end
                    end

                    return result['status']
                end
            end
            ###
             # delete a slide
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/24 - create
             # @param       :   id - int - id of slide need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteSlide(id)
                result        = true
                # direction
                # Vienamese
                linkImageVi   = nil
                removeImageVi = false
                
                # Japan
                linkImageJa   = nil
                removeImageJa = false
                
                # English
                linkImageEn   = nil
                removeImageEn = false
                begin
                    ActiveRecord::Base.transaction do
                        #####################
                        # VI - check existance of img
                        slideVi  = Slide.find_by(id: id, lang: 'vi')

                        checkIssetImage = Slide.where(img: slideVi['img'],deleted_at: nil)
                                               .where.not(id: id, lang: 'vi')
                                               .first

                        if checkIssetImage == nil
                            linkImageVi   = slideVi['img']
                            removeImageVi = true
                        end
                        #######################################################################
                        
                        #####################
                        # JA - check existance of img
                        slideJa  = Slide.find_by(id: id, lang: 'ja')

                        checkIssetImage = Slide.where(img: slideJa['img'],deleted_at: nil)
                                               .where.not(id: id, lang: 'ja')
                                               .first

                        if checkIssetImage == nil
                            linkImageJa   = slideJa['img']
                            removeImageJa = true
                        end
                        #######################################################################

                        #####################
                        # EN - check existance of img
                        slideEn  = Slide.find_by(id: id, lang: 'en')

                        checkIssetImage = Slide.where(img: slideEn['img'],deleted_at: nil)
                                               .where.not(id: id, lang: 'en')
                                               .first

                        if checkIssetImage == nil
                            linkImageEn   = slideEn['img']
                            removeImageEn = true
                        end
                        #######################################################################

                        update = Slide.where(id: id)
                                      .update_all(
                                            deleted_by: $user_id,
                                            deleted_at: Time.now
                                      )
                        result = update
                    end
                rescue
                    result = false
                    # Roll back
                    raise ActiveRecord::RollBack
                ensure
                    if result
                        # Vienamese
                        if removeImageVi && linkImageVi.present?
                            begin
                                FileUtils.rm('public' + linkImageVi)
                            rescue
                            end
                        end
                        # Japan
                        if removeImageJa && linkImageJa.present?
                            begin
                                FileUtils.rm('public' + linkImageJa)
                            rescue
                            end
                        end
                        # English
                        if removeImageEn && linkImageEn.present?
                            begin
                                FileUtils.rm('public' + linkImageEn)
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