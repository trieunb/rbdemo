=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - SettingHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/14
    * 作成者        :   quypn – quypn@ans-asia.com
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
module Admin
    module SettingHelper
        class SettingHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
            # get data of table setting
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/14 - create
            # @param       :   null
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.getSetting
                data = Hash.new
                data['setting_vi'] = Setting.find_by(lang: 'vi', id: 1, deleted_at: nil)
                data['setting_ja'] = Setting.find_by(lang: 'ja', id: 1, deleted_at: nil)
                data['lang'] = Language.where(deleted_at: nil).where.not(language_code: 'vi').select('id, language_name, language_code').order('id')
                return data
            end
            ###
            # save data of table setting with main language
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/15 - create
            # @param       :   data - Hash - data setting to save
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.updateSetting(data)
                begin
                    setting = Setting.where(:id => 1, :lang => 'vi').first
                    image = setting.selection_process
                    update = true
                    if data[:selection_process] != nil && data[:selection_process] != ''
                        seting2 = Setting.where(:id => 1, :selection_process => image).where.not(:lang => 'vi').first
                        if seting2 == nil
                            begin
                                FileUtils.rm('public' + image)
                            rescue
                            end
                        end
                        file1 = Helper.save_file(data[:selection_process], '/images/subscribe/')
                        if !file1['status']
                            update = false
                            result = file1
                        else
                            image = file1['link']
                        end
                    end
                    if update
                        update1 = Setting.where(:id => 1, :lang => 'vi')
                                         .update_all(
                                            description:   data[:description],
                                            keyword:       data[:keyword],
                                            address:       data[:address],
                                            intro_video:   data[:intro_video],
                                            different:     data[:different],
                                            welcome:       data[:welcome],
                                            greeting:      data[:greeting],
                                            selection_process:      image
                                         )
                        image = setting.img_of_direction
                        update = true
                        if data[:img_of_direction] != nil && data[:img_of_direction] != ''
                            begin
                                FileUtils.rm('public' + image)
                            rescue
                            end
                            file1 = Helper.save_file(data[:img_of_direction], '/images/slide/')
                            if !file1['status']
                                update = false
                                result = file1
                            else
                                image = file1['link']
                            end
                        end
                        if update
                            update2 = Setting.where(:id => 1)
                                             .update_all(
                                                facebook:      data[:facebook],
                                                google_plus:   data[:google_plus],
                                                skype:         data[:skype],
                                                ameblo:        data[:ameblo],
                                                phone_dn:      data[:phone_dn],
                                                phone_hn:      data[:phone_hn],
                                                phone_tokyo:   data[:phone_tokyo],
                                                email:         data[:email],
                                                position_lat:  data[:position_lat],
                                                position_lng:  data[:position_lng],
                                                img_of_direction:  image,
                                                updated_by:    $user_id,
                                                updated_at:    Time.now
                                             )
                            return update1&&update2
                        else
                            return false
                        end
                    else
                        return false
                    end
                rescue
                    return false
                end
            end
            ###
            # save data of table setting with translate language
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/15 - create
            # @param       :   data - Hash - data setting to save
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.updateSettingTrans(data)
                begin
                    setting = Setting.where(:id => 1, :lang => data[:lang]).first
                    image = setting.selection_process
                    update = true
                    if data[:selection_process] != nil && data[:selection_process] != ''
                        seting2 = Setting.where(:id => 1, :selection_process => image).where.not(:lang => data[:lang]).first
                        if seting2 == nil
                            begin
                                FileUtils.rm('public' + image)
                            rescue
                            end
                        end
                        file1 = Helper.save_file(data[:selection_process], '/images/subscribe/')
                        if !file1['status']
                            update = false
                            result = file1
                        else
                            image = file1['link']
                        end
                    end
                    if update
                        update = Setting.where(:id => 1, :lang => data[:lang])
                                         .update_all(
                                            description:   data[:description],
                                            keyword:       data[:keyword],
                                            address:       data[:address],
                                            intro_video:   data[:intro_video],
                                            different:     data[:different],
                                            welcome:       data[:welcome],
                                            greeting:      data[:greeting],
                                            selection_process:      image,
                                            updated_by:    $user_id,
                                            updated_at:    Time.now
                                         )
                        return update
                    else
                        return false
                    end
                rescue
                    return false
                end
            end
        end
    end
end