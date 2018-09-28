=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - MediasHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/31
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
    module MediasHelper
        class MediasHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of table media
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/31 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getMedias
                lang = Helper.getLang
                return Media.joins('LEFT JOIN libraries ON
                                        libraries.library_id = 9
                                    AND libraries.lang       = "' + lang + '"' + '
                                    AND libraries.number     = media.format')
                            .where(deleted_at: nil)
                            .select('
                                media.id,
                                media.icon,
                                media.logo,
                                media.url,
                                media.format,
                                media.background,
                                media.node,
                                libraries.name as name_format
                            ')
            end
            ###
             # get data of table media by id
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/31 - create
             # @param       :   id - int - id of media need to get
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getMedia(id)
                data          = Hash.new
                data['media'] = Media.find_by(id: id, deleted_at: nil)
                return data
            end
            ###
             # create a media
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/31 - create
             # @param       :   media - Hash - data of media need to add
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.saveMedia(media)
                result               = Hash.new
                result['status']     = true

                upload_icon          = nil
                upload_logo          = nil
                
                upload_url           = Hash.new
                upload_url['status'] = true
                upload_url['link']   = ''
                begin
                    ActiveRecord::Base.transaction do
                        upload_icon = Helper.save_file(media[:icon], '/images/media/icon/')
                        upload_logo = Helper.save_file(media[:logo], '/images/media/logo/')
                        if media[:format].to_i == 2
                            upload_url = Helper.save_file(media[:url], '/videos/media/')
                            url = upload_url['link']
                        elsif media[:format].to_i == 3
                            upload_url = Helper.save_file(media[:url], '/images/media/image/')
                            url = upload_url['link']
                        else
                            url = media[:url_name]
                        end

                        # delete file upload when have file upload false
                        if (!upload_icon['status'] or !upload_logo['status'] or !upload_url['status'])
                            if (upload_icon['status'])
                                begin
                                    # remove file Icon
                                    FileUtils.rm('public' + upload_icon['link'])
                                rescue
                                end
                            end

                            if (upload_logo['status'])
                                begin
                                    # remove file Logo
                                    FileUtils.rm('public' + upload_logo['link'])
                                rescue
                                end
                            end

                            if (upload_url['status'] and upload_url['status'] != '')
                                begin
                                    # remove file Url
                                    FileUtils.rm('public' + upload_url['link'])
                                rescue
                                end
                            end

                            result['status'] = false
                        end

                        # insert into table Media
                        if (result)
                            id   = Helper.getID('media')
                            Media.create(
                                        id:         id,
                                        media_typ:  1,
                                        icon:       upload_icon['link'],
                                        logo:       upload_logo['link'],
                                        url:        url,
                                        format:     media[:format],
                                        background: media[:background],
                                        node:       media[:note],
                                        created_by: $user_id
                                    )
                            result['id'] = id
                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"

                    if (upload_icon['status'] or upload_logo['status'] or upload_url['status'])
                        if (upload_icon['status'])
                            begin
                                # remove file Icon
                                FileUtils.rm('public' + upload_icon['link'])
                            rescue
                            end
                        end

                        if (upload_logo['status'])
                            begin
                                # remove file Logo
                                FileUtils.rm('public' + upload_logo['link'])
                            rescue
                            end
                        end

                        if (upload_url['status'] and upload_url['status'] != '')
                            begin
                                # remove file Url
                                FileUtils.rm('public' + upload_url['link'])
                            rescue
                            end
                        end
                    end

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    return result
                end
            end
            ###
             # update a media
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/31 - create
             # @param       :   media - Hash - data of media need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateMedia(media)
                result           = Hash.new
                result['status'] = true
                result['id']     = ''
                
                # update           = true

                iconLink         = ''
                logoLink         = ''
                urlLink          = ''
                iconStatus       = ''
                logoStatus       = ''
                urlStatus        = ''

                updateIcon       = false
                updateLogo       = false
                updateUrl        = false

                removeOldIcon    = false
                removeOldLogo    = false
                removeOldUrl     = false

                oldIcon          = nil
                oldLogo          = nil
                oldUrl           = nil

                begin
                    ActiveRecord::Base.transaction do
                        oldMedia = Media.find_by(id: media[:id])
                        if oldMedia != nil
                            oldIcon   = oldMedia.icon
                            oldLogo   = oldMedia.logo
                            oldUrl    = oldMedia.url
                            oldFormat = oldMedia.format

                            # remove file Icon (if icon not exist in table media) and save file (file change)
                            if media[:icon].present?
                                checkIssetIcon = Media.where(icon: oldIcon, deleted_at: nil)
                                                      .where.not(id: media[:id])
                                                      .first
                                if checkIssetIcon == nil
                                    removeOldIcon = true
                                end

                                file_icon = Helper.save_file(media[:icon], '/images/media/icon/')
                                if file_icon['status']
                                    iconLink = file_icon['link']
                                    iconStatus = true
                                else
                                    iconStatus = false
                                end
                            else
                                # iconStatus = false
                            end

                            # remove file Logo (if logo not exist in table media) and save file (file change)
                            if media[:logo].present?
                                checkIssetLogo = Media.where(logo: oldLogo, deleted_at: nil)
                                                      .where.not(id: media[:id])
                                                      .first
                                if checkIssetLogo == nil
                                    removeOldLogo = true
                                end

                                file_logo = Helper.save_file(media[:logo], '/images/media/logo/')
                                if file_logo['status']
                                    logoLink = file_logo['link']
                                    logoStatus = true
                                else
                                    logoStatus = false
                                end
                            else
                                # logoStatus = false
                            end

                            # remove file Url (if img or video not exist in table media) and save file (file change)
                            if media[:url].present?
                                checkUrl = oldUrl.split(".").last =~ (/(jpeg|jpg|png|mp4)/i)
                                
                                if checkUrl
                                    checkIssetUrl = Media.where(url: oldUrl, deleted_at: nil)
                                                         .where.not(id: media[:id])
                                                         .first
                                    if checkIssetUrl == nil
                                        removeOldUrl = true
                                    end
                                end
                                    
                                if media[:format].to_i == 2
                                    file_url = Helper.save_file(media[:url], '/videos/media/')
                                elsif media[:format].to_i == 3
                                    file_url = Helper.save_file(media[:url], '/images/media/image/')
                                end
                                
                                if file_url['status']
                                    urlLink = file_url['link']
                                    urlStatus = true
                                else
                                    urlStatus = false
                                end
                            else
                                # urlStatus = false
                            end
                            
                            # remove file if have file save fails
                            if (!iconStatus or !logoStatus or !urlStatus)
                                if iconStatus
                                    begin
                                    # remove file Icon
                                    FileUtils.rm('public' + iconLink)
                                    rescue
                                    end
                                end

                                if logoStatus
                                    begin
                                    # remove file Logo
                                    FileUtils.rm('public' + logoLink)
                                    rescue
                                    end
                                end

                                if urlStatus
                                    begin
                                    # remove file Url
                                    FileUtils.rm('public' + urlLink)
                                    rescue
                                    end
                                end
                            end

                            if ((iconStatus or iconStatus == '') and (logoStatus or logoStatus == '') and (urlStatus or urlStatus == ''))
                                #  update Icon
                                if (iconStatus === true)
                                    updateIcon = Media.where(id: media[:id])
                                                  .update_all(
                                                          icon:       iconLink,
                                                  )
                                end

                                #  update Logo
                                if (logoStatus === true)
                                    updateLogo = Media.where(id: media[:id])
                                                  .update_all(
                                                          logo:       logoLink,
                                                  )
                                end

                                #  update Link
                                if (urlStatus === true)
                                    updateUrl = Media.where(id: media[:id])
                                                  .update_all(
                                                          url:        urlLink,
                                                  )
                                elsif (urlStatus === '')
                                    updateUrl = Media.where(id: media[:id])
                                                  .update_all(
                                                          url:        media[:url_name],
                                                  )
                                end

                                update = Media.where(id: media[:id])
                                              .update_all(
                                                      format:     media[:format],
                                                      background: media[:background],
                                                      node:       media[:note],
                                                      created_by: $user_id,
                                                      updated_at: Time.now,
                                                      updated_by: $user_id
                                              )
                            end
                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"

                    # remove file if have any error
                    if (iconStatus or logoStatus or urlStatus)
                        if iconStatus
                            begin
                            # remove file Icon
                            FileUtils.rm('public' + iconLink)
                            rescue
                            end
                        end

                        if logoStatus
                            begin
                            # remove file Logo
                            FileUtils.rm('public' + logoLink)
                            rescue
                            end
                        end

                        if urlStatus
                            begin
                            # remove file Url
                            FileUtils.rm('public' + urlLink)
                            rescue
                            end
                        end
                    end

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    result['status'] = Helper.to_b(result['status'])
                    if result['status']
                        if removeOldIcon && oldIcon.present?
                            begin
                                FileUtils.rm('public' + oldIcon)
                            rescue
                            end
                        end
                        if removeOldLogo && oldLogo.present?
                            begin
                                FileUtils.rm('public' + oldLogo)
                            rescue
                            end
                        end
                        if removeOldUrl && oldUrl.present?
                            begin
                                FileUtils.rm('public' + oldUrl)
                            rescue
                            end
                        end
                    end

                    return result
                end
            end
            ###
             # delete a media
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/31 - create
             # @param       :   id - int - id of media need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteMedia(id)
                result     = true

                linkIcon   = nil
                removeIcon = false
                
                linkLogo   = nil
                removeLogo = false
                
                linkUrl    = nil
                removeUrl  = false
                begin
                    ActiveRecord::Base.transaction do
                        media  = Media.find_by(id: id)

                        # check existence of icon 
                        mediaIcon = Media.where(icon: media['icon'], deleted_at: nil)
                                         .where.not(id: id)
                                         .first
                        if mediaIcon == nil
                            linkIcon   = media['icon']
                            removeIcon = true
                        end

                        # check existence of logo 
                        mediaLogo = Media.where(logo: media['logo'], deleted_at: nil)
                                         .where.not(id: id)
                                         .first
                        if mediaLogo == nil
                            linkLogo   = media['logo']
                            removeLogo = true
                        end

                        # check existence of url
                        if media['url'].split('.').last.match(/(png|jpg|jpeg|mp4)/)
                            mediaUrl = Media.where(url: media['url'], deleted_at: nil)
                                            .where.not(id: id)
                                            .first
                        else 
                            mediaUrl = 1
                        end

                        if mediaUrl == nil
                            linkUrl   = media['url']
                            removeUrl = true
                        end

                        update = Media.where(id: id)
                                      .update_all(
                                            deleted_by: $user_id,
                                            deleted_at: Time.now
                                      )
                        result = update
                    end
                rescue
                    result = false

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    if result
                        # Icon
                        if removeIcon && linkIcon.present?
                            begin
                                FileUtils.rm('public' + linkIcon)
                            rescue
                            end
                        end
                        # Logo
                        if removeLogo && linkLogo.present?
                            begin
                                FileUtils.rm('public' + linkLogo)
                            rescue
                            end
                        end
                        # Url
                        if removeUrl && linkUrl.present?
                            begin
                                FileUtils.rm('public' + linkUrl)
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
