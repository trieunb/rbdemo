=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - AlbumsHelper
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
    module AlbumsHelper
        class AlbumsHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of table album
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/31 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getAlbums
                return Album.where(deleted_at: nil)
                            .select('
                                id,
                                img,
                                thumb
                            ').order(id: :DESC)
            end
            ###
             # save photos user upload
             # -----------------------------------------------
             # @author      :   quypn     - 2017/09/12 - create
             # @param       :   photos - list info file image neeed to save
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.savePhotos(photos)
                result           = Hash.new
                result['status'] = true
                
                image            = Hash.new
                thumb            = Hash.new
                begin
                    ActiveRecord::Base.transaction do
                        photos.each do |item|
                            file_type                     = item['name'].split('.').last
                            
                            # info file image
                            linkImage                     = '/images/event/album/image/'
                            new_name_file_image           = Time.now.to_i
                            new_name_file_image_with_type = "#{new_name_file_image}_" + item['id'] + "." + file_type
                            imageTemp                     = linkImage + new_name_file_image_with_type
                            image.store(imageTemp,item['data'])
                            
                            # info file thumb
                            linkThumb                     = '/images/event/album/thumb/'
                            new_name_file_thumb           = Time.now.to_i
                            new_name_file_thumb_with_type = "#{new_name_file_thumb}_"  + item['id'] + "." + file_type
                            thumbTemp                     = linkThumb + new_name_file_thumb_with_type
                            thumb.store(thumbTemp,item['thumb'])

                            # save to DB
                            id = Helper.getID('albums')
                            Album.create(
                                    id: id,
                                    img: imageTemp,
                                    thumb: thumbTemp,
                                    created_by: $user_id
                                )
                        end
                    end
                rescue
                    result['status'] = false
                    result['error'] = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
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
             # delete photos
             # -----------------------------------------------
             # @author      :   quypn     - 2017/09/12 - create
             # @param       :   ids - list id of photo need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteAlbum(ids)
                result           = Hash.new
                result['status'] = true
                begin
                    ActiveRecord::Base.transaction do
                        ids.each do |id|
                            update = Album.where(:id => id)
                                            .update_all(
                                                deleted_by:    $user_id,
                                                deleted_at:    Time.now
                                            )
                        end
                    end
                rescue
                    result['status'] = false
                    result['error'] = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    if result['status']
                        ids.each do |id|
                            photo  = Album.find_by(id: id)

                            checkIssetImage = Album.where(img: photo['img'], deleted_at: nil).where.not(id: id).first
                            if checkIssetImage == nil
                                begin
                                    FileUtils.rm('public' + photo['img'])
                                rescue
                                end
                            end

                            checkIssetThumb = Album.where(thumb: photo['thumb'], deleted_at: nil).where.not(id: id).first
                            if checkIssetThumb == nil
                                begin
                                    FileUtils.rm('public' + photo['thumb'])
                                rescue
                                end
                            end
                        end
                    end
                    return result
                end
            end
        end
    end
end