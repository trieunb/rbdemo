=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - CoursesHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/22
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
require 'fileutils'
module Admin
    module CoursesHelper
        class CoursesHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data need to view
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/22 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getData
                data = Hash.new
                lang = Helper.getLang
                data['level'] = Helper.getLibraries(2, lang)
                data['place'] = Helper.getLibraries(3, lang)
                data['unit'] = Helper.getLibraries(5, lang)
                data['lang'] = Language.where(deleted_at: nil).where.not(language_code: 'vi').select('id, language_name, language_code').order('id')
                return data
            end
            ###
             # get course by lelvel and place
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/24 - create
             # @param       :   level - int - id level of course
             # @param       :   place - int - id place of course
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getCourse(level, place)
                lang = Helper.getLang
                course = Hash.new
                course['course_vi'] = Course.find_by(lang: 'vi', level:level, location: place, deleted_at: nil)
                course['course_ja'] = Course.find_by(lang: 'ja', level:level, location: place, deleted_at: nil)
                return course
            end
            ###
             # update of course by id
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/24 - create
             # @param       :   course - Hash - data update of course
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateCourse(course)
                result              = Hash.new
                result['status']    = true
                
                linkImage           = nil
                linkImageTitle      = nil
                
                removeOldImage      = false
                oldImage            = nil
                
                removeOldImageTitle = false
                oldImageTitle       = nil
                begin # try
                    ActiveRecord::Base.transaction do 
                        oldCourse = Course.find_by( id: course[:id], lang: 'vi', deleted_at: nil)
                        if oldCourse != nil
                            oldImage         = oldCourse.image
                            oldImageTitle    = oldCourse.image_title
                            update           = true
                            updateImage      = true
                            updateImageTitle = true

                            # check and update image
                            if course[:image] != nil && course[:image] != ''
                                course2 = Course.where(image: oldImage, deleted_at: nil).where.not('id=' + course[:id] + ' AND lang=\'vi\'').first
                                if course2 == nil
                                    removeOldImage   = true
                                end

                                file1 = Helper.save_file(course[:image], '/images/courses/')
                                if file1.present? && file1['status']
                                    linkImage = file1['link']
                                else
                                    update = false
                                    result = file1
                                end
                            end

                            # check and update image title
                            if course[:image_title] != nil && course[:image_title] != ''
                                course2 = Course.where(image: oldCourse.image_title, deleted_at: nil).where.not('id=' + course[:id] + ' AND lang=\'vi\'').first
                                if course2 == nil
                                    removeOldImageTitle = true
                                end

                                file2 = Helper.save_file(course[:image_title], '/images/courses/')
                                if file2.present? && file2['status']
                                    linkImageTitle = file2['link']
                                else
                                    update = false
                                    result = file2
                                end
                            end

                            # if save file not error then update
                            if update
                                if linkImage.present?
                                    updateImage = Course.where(id: course[:id], lang: 'vi', deleted_at: nil)
                                                        .update_all(
                                                            image:  linkImage
                                                        )
                                end
                                if linkImageTitle.present?
                                    updateImageTitle = Course.where(id: course[:id], lang: 'vi', deleted_at: nil)
                                                            .update_all(
                                                                image_title: linkImageTitle
                                                            )
                                end
                                
                                updateAll = Course.where(id: course[:id], lang: 'vi', deleted_at: nil)
                                                .update_all(
                                                    title:          course[:title],
                                                    description:    course[:description],
                                                    unit:           course[:unit]
                                                )
                                
                                updateVi = Course.where(id: course[:id], deleted_at: nil)
                                                .update_all(
                                                    price:          course[:price].gsub(',',''),
                                                    unit_price:     course[:unit_price],
                                                    updated_at:     Time.now,
                                                    updated_by:     $user_id
                                                )
                                result['status'] = updateImage && updateImageTitle && updateAll && updateVi
                            end
                        end
                    end
                rescue # catch
                    result['status'] = false
                    result['error'] = "#{$!}"

                    if linkImage.present?
                        begin
                            FileUtils.rm('public' + linkImage)
                        rescue
                        end
                    end

                    if linkImageTitle.present?
                        begin
                            FileUtils.rm('public' + linkImageTitle)
                        rescue
                        end
                    end

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure # finally
                    result['status'] = Helper.to_b(result['status'])
                    if result['status']
                        if removeOldImage && oldImage.present?
                            begin
                                FileUtils.rm('public' + oldImage)
                            rescue
                            end
                        end

                        if removeOldImageTitle && oldImageTitle.present?
                            begin
                                FileUtils.rm('public' + oldImageTitle)
                            rescue
                            end
                        end
                    end
                    return result
                end
            end
            ###
             # update data translate of course by id
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/24 - create
             # @param       :   course - Hash - data translate of course
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateCourseTrans(course)
                result              = Hash.new
                result['status']    = true
                
                linkImage           = nil
                linkImageTitle      = nil
                
                removeOldImage      = false
                oldImage            = nil
                
                removeOldImageTitle = false
                oldImageTitle       = nil
                begin # try
                    ActiveRecord::Base.transaction do 
                        oldCourse = Course.find_by( id: course[:id], lang: course[:lang], deleted_at: nil)
                        if oldCourse != nil
                            oldImage         = oldCourse.image
                            oldImageTitle    = oldCourse.image_title
                            update           = true
                            updateImage      = true
                            updateImageTitle = true
                            # check and update image
                            if course[:image] != nil && course[:image] != ''
                                course2 = Course.where(image: oldImage, deleted_at: nil).where.not('id=' + course[:id] + ' AND lang=\'' + course[:lang] + '\'').first
                                if course2 == nil
                                    removeOldImage = true
                                end
                                file1 = Helper.save_file(course[:image], '/images/courses/')
                                if file1['status']
                                    linkImage = file1['link']
                                else
                                    update = false
                                    result = file1
                                end
                            end
                            # check and update image title
                            if course[:image_title] != nil && course[:image_title] != ''
                                course2 = Course.where(image: oldImageTitle, deleted_at: nil).where.not('id=' + course[:id] + ' AND lang=\'' + course[:lang] + '\'').first
                                if course2 == nil
                                    removeOldImageTitle = true
                                end
                                file2 = Helper.save_file(course[:image_title], '/images/courses/')
                                if file2['status']
                                    linkImageTitle = file2['link']
                                else
                                    update = false
                                    result = file2
                                end
                            end
                            # if save file not error then update
                            if update
                                if linkImage.present?
                                    updateImage = Course.where(id: course[:id], lang: course[:lang], deleted_at: nil)
                                                        .update_all(
                                                            image:  linkImage
                                                        )
                                end

                                if linkImageTitle.present?
                                    updateImageTitle = Course.where(id: course[:id], lang: course[:lang], deleted_at: nil)
                                                            .update_all(
                                                                image_title: linkImageTitle
                                                            )
                                end

                                updateTrans = Course.where(id: course[:id], lang: course[:lang], deleted_at: nil)
                                                    .update_all(
                                                        title:          course[:title],
                                                        description:    course[:description],
                                                        unit:           course[:unit],
                                                        updated_at:     Time.now,
                                                        updated_by:     $user_id
                                                    )
                                result['status'] = updateImage && updateImageTitle && updateTrans
                            end
                        end
                    end
                rescue # catch
                    result['status'] = false
                    result['error'] = "#{$!}"

                    if linkImage.present?
                        begin
                            FileUtils.rm('public' + linkImage)
                        rescue
                        end
                    end

                    if linkImageTitle.present?
                        begin
                            FileUtils.rm('public' + linkImageTitle)
                        rescue
                        end
                    end

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure # finally
                    result['status'] = Helper.to_b(result['status'])
                    if result['status']
                        if removeOldImage && oldImage.present?
                            begin
                                FileUtils.rm('public' + oldImage)
                            rescue
                            end
                        end

                        if removeOldImageTitle && oldImageTitle.present?
                            begin
                                FileUtils.rm('public' + oldImageTitle)
                            rescue
                            end
                        end
                    end
                    
                    return result
                end
            end
            ###
             # get classes by course
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/28 - create
             # @param       :   search - Hash - data search
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getClasses(search)
                lang = Helper.getLang
                classes = CourseClass.joins('LEFT JOIN courses ON courses.id = course_classes.course_id AND courses.lang = course_classes.lang')
                                     .where(lang: lang, deleted_at: nil)
                if search[:course_id] != nil && search[:course_id] != 0 && search[:course_id] != '0'
                    classes = classes.where(course_id: search[:course_id])
                end
                classes = classes.select('course_classes.id, courses.title AS course, course_classes.course_id, course_classes.name, course_classes.title, target, course_classes.price, course_classes.time, course_classes.show, course_classes.beauty_id')
                return classes
            end
            ###
             # update a class show or not show in home page
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/28 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateShowClass(data)
                result = Hash.new
                result['status'] = true
                begin # try
                    ActiveRecord::Base.transaction do   
                        curentShow = CourseClass.find_by(id: data[:id], deleted_at: nil).show
                        numberShow = CourseClass.where.not(id: data[:id]).where(course_id: data[:course_id], deleted_at: nil, show: true).count
                        # will update if set this class show in home page
                        # will update if set this class hide in home page and course of this class have least one class show in homepage
                        if !curentShow || (curentShow && numberShow > 0)
                            result['status'] = CourseClass.where(id: data[:id])
                                                 .update_all(
                                                        show: !curentShow,
                                                        updated_at: Time.now,
                                                        updated_by: $user_id
                                                    )
                        else
                            result['status'] = false
                            result['msgNo'] = 26
                        end
                    end
                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"
                    result['msgNo']  = 7

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure # finally
                    return result
                end
            end
            ###
             # get data of class by id
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/28 - create
             # @param       :   id - int - id of class need to get
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDataClass(id)
                lang = Helper.getLang
                data = Hash.new
                data['class_vi'] = CourseClass.find_by(lang: 'vi', id: id, deleted_at: nil)
                data['class_ja'] = CourseClass.find_by(lang: 'ja', id: id, deleted_at: nil)
                data['lang'] = Language.where(deleted_at: nil).where.not(language_code: 'vi').select('id, language_name, language_code').order('id')
                data['courses'] = Course.where(deleted_at: nil, lang: lang).select(:id, :title)
                data['location'] = Helper.getLibraries(8, lang)
                return data
            end
            ###
             # update a class show or not show in home page
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/30 - create
             # @param       :   data - Hash - data translate need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateClassTrans(data)
                update = true
                begin
                    ActiveRecord::Base.transaction do
                        update = CourseClass.where(:id => data[:id], :lang => data[:lang])
                                            .update_all(
                                                title:         data[:title],
                                                name:          data[:name],
                                                content:       data[:content],
                                                target:        data[:target],
                                                time:          data[:time],
                                                admission:     data[:admission],
                                                quantity:      data[:quantity],
                                                opening:       data[:opening],
                                                study_time:    data[:study_time],
                                                price:         data[:price],
                                                benefits:      data[:benefits],
                                                curriculum:    data[:curriculum],
                                                requirements:  data[:requirements],
                                                updated_by:    $user_id,
                                                updated_at:    Time.now
                                            )
                    end
                rescue
                    update = false
                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    return update
                end
            end
            ###
             # create a new class
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/30 - create
             # @param       :   data - Hash - data of new class
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.saveClass(data)
                result           = Hash.new
                result['status'] = true
                result['msgNo']  = 7
                
                linkImage        = nil
                begin
                    ActiveRecord::Base.transaction do
                        #first: save image icon
                        file      = Helper.save_file(data[:icon], '/images/courses/')
                        linkImage = file['link'] if (file.present? && file['link'].present?)
                        # if save file success then save to database
                        if file['status'] == true
                            lang = Language.where(deleted_at: nil).select('id, language_name, language_code')
                            id = Helper.getID('course_classes')
                            # check beauty_id exist or not
                            haveClass = CourseClass.find_by(beauty_id: data[:beauty_id])
                            if haveClass != nil
                                # if beauty_id exist then create new beauty_id
                                data[:beauty_id] = data[:beauty_id] + '-' + id.to_s
                            end
                            lang.each do |item|
                                CourseClass.create(
                                        id:            id,
                                        lang:          item[:language_code],
                                        beauty_id:     data[:beauty_id],
                                        course_id:     data[:course_id],
                                        title:         data[:title],
                                        name:          data[:name],
                                        content:       data[:content],
                                        target:        data[:target],
                                        time:          data[:time],
                                        admission:     data[:admission],
                                        quantity:      data[:quantity],
                                        opening:       data[:opening],
                                        study_time:    data[:study_time],
                                        price:         data[:price],
                                        benefits:      data[:benefits],
                                        curriculum:    data[:curriculum],
                                        requirements:  data[:requirements],
                                        location:      data[:location],
                                        icon:          file['link'],
                                        show:          (data[:show] == 'on' ? true : false),
                                        created_by:    $user_id
                                    )
                            end
                            result['id'] = id
                            #SubscribeMailer.sent_new_class(id).deliver_later
                        else
                            result = file
                        end
                    end
                rescue
                    result['status'] = false
                    result['error'] = "#{$!}"

                    if linkImage.present?
                        begin
                            FileUtils.rm('public' + linkImage)
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
             # update data of a class
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/30 - create
             # @param       :   data - Hash - data of class need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateClass(data)
                result           = Hash.new
                result['status'] = true
                result['id']     = data[:id]
                result['msgNo']  = 7

                oldIcon          = nil
                removeOldIcon    = false

                iconSave         = nil
                begin
                    ActiveRecord::Base.transaction do
                        oldClass = CourseClass.find_by(id: data[:id], lang: 'vi', deleted_at: nil)
                        # if this class exist
                        if oldClass != nil
                            haveClass  = CourseClass.where.not(id: data[:id]).where(course_id: oldClass.course_id).count
                            updateIcon = true
                            update     = true
                            # check if change course of class and that course have only this class then will not update
                            if data[:course_id].to_s != oldClass.course_id.to_s && haveClass == 0
                                update = false
                                result['msgNo'] = 26
                            end
                            oldIcon = oldClass.icon
                            # check if update image icon
                            if data[:icon] != nil && data[:icon] != '' && update
                                useClass = CourseClass.where(lang: 'vi', icon: oldIcon, deleted_at: nil).where.not(id: data[:id]).first
                                # remove old icon if it not user by other class
                                if useClass == nil
                                    removeOldIcon = true
                                end
                                # save new image icon
                                file = Helper.save_file(data[:icon], '/images/courses/')
                                # if save file success them continue update, else not update
                                if file['status']
                                    iconSave = file['link']
                                else
                                    update = false
                                    result = file
                                end
                            end
                            if update
                                if iconSave.present?
                                    updateIcon = CourseClass.where(id: data[:id])
                                                            .update_all(
                                                                icon: iconSave
                                                            )
                                end

                                updateVi = CourseClass.where(id: data[:id], lang: 'vi')
                                                    .update_all(
                                                        title:         data[:title],
                                                        name:          data[:name],
                                                        content:       data[:content],
                                                        target:        data[:target],
                                                        time:          data[:time],
                                                        admission:     data[:admission],
                                                        quantity:      data[:quantity],
                                                        opening:       data[:opening],
                                                        study_time:    data[:study_time],
                                                        price:         data[:price],
                                                        benefits:      data[:benefits],
                                                        curriculum:    data[:curriculum],
                                                        requirements:  data[:requirements]
                                                    )
                                updateAll = CourseClass.where(id: data[:id])
                                                    .update_all(
                                                        show:          data[:show] == 'on' ? true : false,
                                                        location:      data[:location],
                                                        course_id:     data[:course_id],
                                                        updated_at:    Time.now,
                                                        updated_by:    $user_id
                                                    )
                                result['status'] = updateIcon && updateVi && updateAll
                                #SubscribeMailer.sent_new_class(id).deliver_later
                            else
                                result['status'] = false
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
                        if removeOldIcon && oldIcon.present?
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
             # delete a class
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/30 - create
             # @param       :   id - int - id of class need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteClass(id)
                result           = Hash.new
                result['status'] = true
                result['msgNo']  = 7

                update           = true

                oldIcon          = nil
                removeOldIcon    = false
                begin
                    oldClass = CourseClass.find_by(id: id, lang: 'vi', deleted_at: nil)
                    if oldClass != nil
                        countClass = CourseClass.where.not(id: id).where(course_id: oldClass.course_id).count
                        
                        oldIcon    = oldClass.icon
                        update     = true
                        # check if course of this class just have only this class then will not delete
                        if countClass == 0
                            update = false
                            result['msgNo'] = 26
                        end
                        if update
                            checkIssetClass = CourseClass.where(icon: oldIcon, deleted_at: nil)
                                                          .where.not(id: id)
                                                          .first
                            # remove fileicon if it not user by other class
                            if checkIssetClass == nil
                                removeOldIcon = true
                            end
                            updateCourse = CourseClass.where(id: id)
                                            .update_all(
                                                    deleted_at:    Time.now,
                                                    deleted_by:    $user_id
                                                )
                            result['status'] = updateCourse
                        else
                            result['status'] = false
                        end
                    end
                rescue
                    result['status'] = false
                    result['error'] = "#{$!}"

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
                    end
                    
                    return result
                end
            end
        end
    end
end