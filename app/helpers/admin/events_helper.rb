=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - EventsHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/09/13
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
    module EventsHelper
        class EventsHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of table event
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getEvents
                lang = Helper.getLang
                return Event.where(deleted_at: nil, lang: lang)
                             .select(
                                :id,
                                :title,
                                :detail,
                                :start,
                                :end,
                                :place,
                                :image,
                                :link,
                                :show
                             )
            end
            ###
             # get data of table event by id
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   id - int - id of event need to get
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getEvent(id)
                data             = Hash.new
                data['event_vi'] = Event.where(lang: 'vi', id: id, deleted_at: nil)
                                        .select(
                                            :id,
                                            :title,
                                            :detail,
                                            :start,
                                            :end,
                                            :place,
                                            :image,
                                            :link,
                                            :show
                                        )
                                        .first
                data['event_ja'] = Event.where(lang: 'ja', id: id, deleted_at: nil)
                                        .select(
                                            :id,
                                            :title,
                                            :detail,
                                            :start,
                                            :end,
                                            :place,
                                            :image,
                                            :link,
                                            :show
                                        )
                                        .first
                data['event_detail'] = EventDetail.where(event_id: id, deleted_at: nil)
                                                  .select(
                                                    :id,
                                                    :event_id,
                                                    :img,
                                                    :thumb
                                                  )
                data['lang']     = Language.where(deleted_at: nil)
                                           .where.not(language_code: 'vi')
                                           .select('id, language_name, language_code')
                                           .order('id')
                                           # byebug
                return data
            end
            ###
             # create a event
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   event - Hash - data of event need to add
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.saveEvent(event)
                result           = Hash.new
                result['status'] = true
                linkImage        = nil
                begin
                    ActiveRecord::Base.transaction do
                        file      = Helper.save_file(event[:image], '/images/event/detail/banner/')
                        linkImage = file['link'] if (file && file['status'] && file['link'])
                        if file['status'] == true
                            lang = Language.where(deleted_at: nil).select('id, language_name, language_code')
                            id   = Helper.getID('events')
                            # check link exist or not
                            haveEvent = Event.find_by(link: event[:link])
                            if haveEvent != nil
                                # if link exist then create new link
                                event[:link] = event[:link] + '-' + id.to_s
                            end
                            lang.each do |item|
                                Event.create(
                                        id:         id,
                                        lang:       item[:language_code],
                                        title:      event[:title],
                                        detail:     event[:detail],
                                        start:      event[:start] + ':00',
                                        end:        event[:end] + ':00',
                                        link:       event[:link],
                                        place:      event[:place],
                                        image:      linkImage,
                                        show:       (event[:show] == 'on' ? 1 : 0),
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
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure
                    return result
                end
            end
            ###
             # update a event
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   event - Hash - data of event need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateEvent(event)
                result           = Hash.new
                result['status'] = true

                linkImage        = nil

                removeOldImage   = false
                oldImage         = nil
                begin
                    ActiveRecord::Base.transaction do
                        oldEvent = Event.find_by(id: event[:id], lang: 'vi')
                        if oldEvent != nil
                            oldImage          = oldEvent.image
                            
                            # declare variables
                            update         = true
                            imageUrl       = ''
                            updateImage    = true

                            # remove file (if image not exist in table event) and save file (file change)
                            if event[:image].present?
                                checkIssetImage = Event.where(image: oldImage, deleted_at: nil)
                                                       .where.not('id=' + event[:id] + ' AND lang=\'vi\'')
                                                       .first
                                if checkIssetImage == nil
                                    removeOldImage = true
                                end
                                
                                file = Helper.save_file(event[:image], '/images/event/detail/banner/')
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
                                    updateImage = Event.where(id: event[:id],lang: 'vi')
                                                       .update_all(
                                                            image:      imageUrl,
                                                        )
                                end

                                updateEventMain = Event.where(id: event[:id],lang: 'vi')
                                                .update_all(
                                                        title:      event[:title],
                                                        detail:     event[:detail],
                                                        place:      event[:place],
                                                )

                                updateEventAll = Event.where(id: event[:id])
                                                .update_all(
                                                        start:      event[:start] + ':00',
                                                        end:        event[:end] + ':00',
                                                        show:       event[:show] == 'on' ? 1 : 0,
                                                        updated_at: Time.now,
                                                        updated_by: $user_id
                                                )
                                              
                                result['status'] = updateImage && updateEventMain && updateEventAll
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
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure
                    result['status'] = Helper.to_b(result['status'])
                    if result['status'] && removeOldImage == true && oldImage.present?
                        begin
                            FileUtils.rm('public' + oldImage)
                        rescue
                        end
                    end

                    # return
                    return result
                end
            end
            ###
             # update data translate of a event
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   event - Hash - data translate of event need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateEventTrans(event)
                result           = Hash.new
                result['status'] = true
                removeOldImage   = false
                oldImage         = nil
                begin
                    ActiveRecord::Base.transaction do
                        oldEvent = Event.find_by(id: event[:id], lang: event[:lang])
                        if oldEvent != nil
                            oldImage       = oldEvent.image
                            
                            # declare variables
                            update         = true
                            imageUrl       = ''
                            updateImage    = true

                            # remove file (if image not exist in table event) and save file (file change)
                            if event[:image].present?
                                checkIssetImage = Event.where(image: oldImage, deleted_at: nil)
                                                       .where.not('id=' + event[:id] + ' AND lang=\'' + event[:lang] + '\'')
                                                       .first
                                if checkIssetImage == nil
                                    removeOldImage = true
                                end

                                file = Helper.save_file(event[:image], '/images/event/detail/banner/')

                                if file['status']
                                    imageUrl = file['link']
                                else
                                    update = false
                                    result = file
                                end
                            end

                            if update
                                if imageUrl.present?
                                    updateImage = Event.where(id: event[:id],lang: event[:lang])
                                                       .update_all(
                                                            image:      imageUrl,
                                                        )
                                end

                                updateEvent = Event.where(id: event[:id], lang: event[:lang])
                                                .update_all(
                                                        title:      event[:title],
                                                        detail:     event[:detail],
                                                        place:      event[:place],
                                                        updated_at: Time.now,
                                                        updated_by: $user_id
                                                    )
                            
                                result['status'] = updateImage && updateEvent
                            end
                        end

                        return result
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure
                    result['status'] = Helper.to_b(result['status'])
                    if result['status'] && removeOldImage == true && oldImage.present?
                        begin
                            FileUtils.rm('public' + oldImage)
                        rescue
                        end
                    end

                    # return
                    return result
                end
            end
            ###
             # delete a event
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   id - int - id of event need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteEvent(id)
                result                 = true
                # direction
                linkImageEventVi       = nil
                linkImageEventJa       = nil
                linkImageEventEn       = nil
                linkThumbEventDetail   = nil
                linkImageEventDetail   = nil
                
                removeImageEventVi     = false
                removeImageEventJa     = false
                removeImageEventEn     = false
                removeThumbEventDetail = false
                removeImageEventDetail = false
                begin
                    ActiveRecord::Base.transaction do
                        #####################
                        # VI - EVENT - check existance of img
                        event = Event.find_by(id: id, lang: 'vi')
                        
                        image = Event.where(image: event['image'],
                                             deleted_at: nil)
                                      .where.not(id: id, lang: 'vi')
                                      .first

                        if image == nil
                            linkImageEventVi   = event['image']
                            removeImageEventVi = true
                        end
                        #######################################################################

                        #####################
                        # JA - EVENT - check existance of img
                        event = Event.find_by(id: id, lang: 'ja')
                        
                        image = Event.where(image: event['image'],
                                             deleted_at: nil)
                                      .where.not(id: id, lang: 'ja')
                                      .first

                        if image == nil
                            linkImageEventJa   = event['image']
                            removeImageEventJa = true
                        end
                        #######################################################################

                        #####################
                        # EN - EVENT - check existance of img
                        event = Event.find_by(id: id, lang: 'en')
                        
                        image = Event.where(image: event['image'],
                                             deleted_at: nil)
                                      .where.not(id: id, lang: 'en')
                                      .first

                        if image == nil
                            linkImageEventEn   = event['image']
                            removeImageEventEn = true
                        end
                        #######################################################################

                        event_details = EventDetail.where(event_id: id)
                        
                        #####################
                        # EVENTDETAILS - check existance of img and thumb
                        if event_details != nil    
                            event_details.each do |event_detail|
                                image_detail = EventDetail.where(img: event_detail['img'],
                                                                 deleted_at: nil)
                                                          .where.not(event_id: id)
                                                          .first
                                                          
                                if image_detail == nil
                                    linkThumbEventDetail   = event_detail['img']
                                    removeThumbEventDetail = true
                                end

                                thumb_detail = EventDetail.where(thumb: event_detail['thumb'],
                                                                 deleted_at: nil)
                                                          .where.not(event_id: id)
                                                          .first
                                                          
                                if thumb_detail == nil
                                    linkImageEventDetail   = event_detail['thumb']
                                    removeThumbEventDetail = true
                                end
                            end
                        end
                        #######################################################################

                        update_event = Event.where(id: id)
                                      .update_all(
                                            deleted_by: $user_id,
                                            deleted_at: Time.now
                                      )

                        update_event_details = EventDetail.where(event_id: id)
                                      .update_all(
                                            deleted_by: $user_id,
                                            deleted_at: Time.now
                                      )

                        return result = (update_event && update_event_details)
                    end
                rescue
                    result = false
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure
                    if result
                        # EVENT
                        if removeImageEventVi && linkImageEventVi.present?
                            begin
                                FileUtils.rm('public' + linkImageEventVi)
                            rescue
                            end
                        end
                        if removeImageEventJa && linkImageEventJa.present?
                            begin
                                FileUtils.rm('public' + linkImageEventJa)
                            rescue
                            end
                        end
                        if removeImageEventEn && linkImageEventEn.present?
                            begin
                                FileUtils.rm('public' + linkImageEventEn)
                            rescue
                            end
                        end

                        # EVENTDETAILS
                        if removeThumbEventDetail && linkThumbEventDetail.present?
                            begin
                                FileUtils.rm('public' + linkThumbEventDetail)
                            rescue
                            end
                        end
                        if removeImageEventDetail && linkImageEventDetail.present?
                            begin
                                FileUtils.rm('public' + linkImageEventDetail)
                            rescue
                            end
                        end
                    end

                    return result
                end
            end
            ###
             # save photos user upload
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   photos - list info file image neeed to save
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.savePhotos(photos,event_id)
                result           = Hash.new
                result['status'] = true
                
                image            = Hash.new
                thumb            = Hash.new
                begin
                    ActiveRecord::Base.transaction do
                        photos.each do |item|
                            file_type           = item['name'].split('.').last
                            
                            # info file main
                            direction_image     = '/images/event/detail/album/img/'
                            new_image           = Time.now.to_i
                            new_image_with_type = "#{new_image}_" + item['id'] + "." + file_type
                            imageTemp           = direction_image + new_image_with_type
                            image.store(imageTemp,item['data'])

                            
                            # info file thumb
                            direction_thumb     = '/images/event/detail/album/thumb/'
                            new_thumb           = Time.now.to_i
                            new_thumb_with_type = "#{new_thumb}_"  + item['id'] + "." + file_type
                            thumbTemp           = direction_thumb + new_thumb_with_type
                            thumb.store(thumbTemp,item['thumb'])

                            # save to DB
                            id = Helper.getID('event_details')
                            
                            EventDetail.create(
                                    id:         id,
                                    event_id:   event_id,
                                    img:        imageTemp,
                                    thumb:      thumbTemp,
                                    created_by: $user_id
                                )
                        end
                        
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure
                    # byebug
                    if result['status']
                        if image.present?
                            image.each do |index,item|
                                # save image
                                File.open('public' + index, "wb")  do |f|
                                    f.write(Base64.decode64(item.split(';base64,').last)) 
                                end
                            end
                        end

                        if thumb.present?
                            thumb.each do |index,item|
                                # save thumnail
                                File.open('public' + index, "wb")  do |f|
                                    f.write(Base64.decode64(item.split(';base64,').last)) 
                                end
                            end
                        end
                    end

                    return result
                end
            end
            ###
             # delete thumbnails and image
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/13 - create
             # @param       :   ids - list id of photo need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteThumbImage(ids)
                result           = Hash.new
                result['status'] = true
                
                # direction
                linkImage        = nil
                linkThumb        = nil
                
                removeImage      = false
                removeThumb      = false
                begin
                    ActiveRecord::Base.transaction do
                        ids.each do |id|
                            photo = EventDetail.find_by(id: id)
                            
                            img   = EventDetail.where(img: photo['img'], deleted_at: nil)
                                               .where.not(id: id)
                                               .first
                            if img == nil
                                linkImage   = event_detail['img']
                                removeImage = true
                            end

                            thumb = EventDetail.where(thumb: photo['thumb'], deleted_at: nil).where.not(id: id).first
                            if thumb == nil
                                linkThumb   = event_detail['thumb']
                                removeThumb = true
                            end

                            update = EventDetail.where(:id => id)
                                            .update_all(
                                                deleted_by: $user_id,
                                                deleted_at: Time.now
                                            )
                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"
                    # Roll back
                    raise ActiveRecord::RollBack
                ensure
                    if result['status']
                        if removeImage && linkImage.present?
                            begin
                                FileUtils.rm('public' + linkImage)
                            rescue
                            end
                        end
                        if removeThumb && linkThumb.present?
                            begin
                                FileUtils.rm('public' + linkThumb)
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