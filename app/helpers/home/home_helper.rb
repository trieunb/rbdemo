=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - HomeHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/10
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
module Home
    module HomeHelper
        class HomePage
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of slide
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/10 - create
             # @param       :   null
             # @return      :   Hasher - list slide had geted
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDataSlide
                lang            = Helper.getLang
                data            = Hash.new
                data['letters'] = Letter.where(lang: lang, show: true, deleted_at: nil).order(id: :DESC).limit(3)
                data['slides']  = Slide.where(lang: lang, show: true, deleted_at: nil)
                return data
            end
            ###
             # get data for section different
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/10 - create
             # @param       :   null
             # @return      :   Hasher - list info different had geted
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDataDifferent
                lang    = Helper.getLang
                data    = Different.where(lang: lang, show: true, deleted_at: nil)
                return data
            end
            ###
             # get data for section media
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/10 - create
             # @param       :   null
             # @return      :   Hasher - list info of slide had geted
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDataMedia
                data = Media.where(deleted_at: nil)
                            .select('id,media_typ,icon,logo,url,format,background,node')
                return data
            end
            ###
             # get data for section courses
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/10 - create
             # @param       :   null
             # @return      :   Hasher - list info of courses had geted
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDataCourses
                lang = Helper.getLang
                data = Hash.new
                data['brse_vi'] = Course.joins('LEFT JOIN libraries ON courses.lang = libraries.lang AND library_id = 5 AND libraries.number = courses.unit_price')
                                        .where(lang: lang, id: 1, deleted_at: nil)
                                        .select('courses.id, courses.title, courses.description, courses.image_title, courses.image, courses.price, libraries.name AS unitprice, courses.unit').first
                data['brse_jp'] = Course.joins('LEFT JOIN libraries ON courses.lang = libraries.lang AND library_id = 5 AND libraries.number = courses.unit_price')
                                        .where(lang: lang, id: 2, deleted_at: nil)
                                        .select('courses.id, courses.title, courses.description, courses.image_title, courses.image, courses.price, libraries.name AS unitprice, courses.unit').first
                data['se_vi'] = Course.joins('LEFT JOIN libraries ON courses.lang = libraries.lang AND library_id = 5 AND libraries.number = courses.unit_price')
                                        .where(lang: lang, id: 3, deleted_at: nil)
                                        .select('courses.id, courses.title, courses.description, courses.image_title, courses.image, courses.price, libraries.name AS unitprice, courses.unit').first
                data['se_jp'] = Course.joins('LEFT JOIN libraries ON courses.lang = libraries.lang AND library_id = 5 AND libraries.number = courses.unit_price')
                                        .where(lang: lang, id: 4, deleted_at: nil)
                                        .select('courses.id, courses.title, courses.description, courses.image_title, courses.image, courses.price, libraries.name AS unitprice, courses.unit').first
                data['brse_vi_class'] = CourseClass.where(lang: lang, course_id: 1, deleted_at: nil, show: true)
                                                   .select(:id, :name, :title, :icon, :beauty_id).limit(3)
                data['brse_jp_class'] = CourseClass.where(lang: lang, course_id: 2, deleted_at: nil, show: true)
                                                   .select(:id, :name, :title, :icon, :beauty_id).first
                data['se_vi_class'] = CourseClass.where(lang: lang, course_id: 3, deleted_at: nil, show: true)
                                                  .select(:id, :name, :title, :icon, :beauty_id).limit(3)
                data['se_jp_class'] = CourseClass.where(lang: lang, course_id: 4, deleted_at: nil, show: true)
                                                 .select(:id, :name, :title, :icon, :beauty_id).first
                return data
            end
            ###
             # veryfi regist course
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/30 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.verifyRegistCourse(id, token)
                begin
                    update = RegisterCourse.where(id: id, token: token, status: 0)
                                           .where("timeout >= ?", Time.now)
                                           .update_all(status: 1)
                    if update >= 1
                        return true
                    else
                        verified = RegisterCourse.where(id: id, token: token).where.not(status: 0)
                                           .where("timeout >= ?", Time.now).first
                        if verified != nil
                            return true
                        else
                            return false
                        end
                    end
                rescue
                    return false
                end
            end
            ###
             # get data for section event
             # -----------------------------------------------
             # @author      :   daonx     - 2017/08/10 - create
             # @param       :   null
             # @return      :   Hasher - list info of event had geted
             # @access      :   public
             # @see         :   remark
            ###
            def self.getDataEvent
                lang              = Helper.getLang
                data              = Hash.new
                data['photos']    = nil
                data['events']    = nil
                data['questions'] = nil

                data['photos']    = Album.where(deleted_at: nil)
                                         .select(:img, :thumb)

                data['events']    = Event.where(lang: lang, deleted_at: nil, show: 1)
                                         .order(start: :desc)
                                         .select(:id, :lang, :title, :start, :link)

                data['questions'] = Question.where(lang: lang, deleted_at: nil)
                                            .select(:question, :answer)
                return data
            end
            ###
             # get id class by beauty id
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/10 - create
             # @param       :   beauty_id - string - beauty_id of class need to get
             # @return      :   int - id of Class
             # @access      :   public
             # @see         :   remark
            ###
            def self.getIdClassByBeautyId(beauty_id)
                begin
                    lang  = Helper.getLang
                    _class = CourseClass.find_by(lang: lang, beauty_id: beauty_id, deleted_at: nil)
                    if _class != nil
                        return _class.id
                    else
                        return 0
                    end
                rescue
                    return 0
                end
            end
            ###
             # get id event by beauty id
             # -----------------------------------------------
             # @author      :   havv     - 2017/09/20 - create
             # @param       :   beauty_id - string - beauty_id of event need to get
             # @return      :   int - id of event
             # @access      :   public
             # @see         :   remark
            ###
            def self.getIdEventByBeautyId(beauty_id)
                begin
                    lang  = Helper.getLang
                    _event = Event.find_by(lang: lang, link: beauty_id, deleted_at: nil)
                    if _event != nil
                        return _event.id
                    else
                        return 0
                    end
                rescue
                    return 0
                end
            end
            ###
             # get data class of course follow id
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/10 - create
             # @param       :   id - int - id of class need to get
             # @return      :   Hasher - info of class had geted
             # @access      :   public
             # @see         :   remark
            ###
            def self.referClass(id)
                begin
                    lang  = Helper.getLang
                    data = CourseClass.joins('LEFT JOIN courses ON course_classes.lang = courses.lang AND course_classes.course_id = courses.id')
                                        .joins('LEFT JOIN libraries ON course_classes.lang = libraries.lang AND libraries.library_id = 8 AND course_classes.location = libraries.number')
                                        .where(lang: lang, id: id, deleted_at: nil)
                                        .select('course_classes.id, course_classes.beauty_id, course_classes.name, course_classes.title, course_classes.content, course_classes.target, course_classes.time, course_classes.admission, course_classes.opening, course_classes.study_time, course_classes.price, course_classes.quantity, course_classes.benefits, course_classes.curriculum, course_classes.requirements, course_classes.rate, course_classes.comment, course_classes.view, course_classes.icon, libraries.name AS location_nm').first
                    return data
                rescue
                    return nil
                end
            end
            ###
             # get data of a event follow id
             # -----------------------------------------------
             # @author      :   havv     - 2017/08/14 - create
             # @param       :   id - int - id of event need to get
             # @return      :   Hasher - info of class had geted
             # @access      :   public
             # @see         :   remark
            ###
            def self.referEvent(id)
                begin
                    lang = Helper.getLang
                    data = Event.where(
                                        id: id,
                                        lang: lang, 
                                        deleted_at: nil
                                    )
                                .select(
                                        'id, 
                                        title,
                                        start as start_date,
                                        start as start_time,
                                        end as end_date,
                                        end as end_time,
                                        place,
                                        link'
                                    )
                                .first

                    data.start_date = data.start_date.strftime("%d - %m - %Y")
                    data.start_time = data.start_time.strftime("%Hh%M")
                    data.end_date   = data.end_date.strftime("%d - %m - %Y")
                    data.end_time   = data.end_time.strftime("%Hh%M")

                    return data
                rescue
                    return nil
                end
            end
            ###
             # get data for event detail
             # -----------------------------------------------
             # @author      :   Daonx - 2017/08/17 - create
             # @param       :   
             # @return      :   
             # @access      :   public
             # @see         :   remark
            ###
            def self.referEventDetail(id)
                begin
                    @lang        = Helper.getLang
                    data         = Hash.new
                    data[:event] = Event.where(
                                    id: id,
                                    lang: @lang,
                                    deleted_at: nil
                                )
                                .select(
                                    'id, 
                                    title,
                                    detail,
                                    start AS start_date,
                                    start AS start_time,
                                    image,
                                    place,
                                    link'
                                ).first

                    data[:event_details] = EventDetail.where(
                                                event_id: id,
                                                deleted_at: nil
                                            )
                                            .select(
                                                'img,
                                                thumb'
                                            )
                            
                    data[:past]             = Date.parse(data[:event].start_date.to_s).past?
                    if @lang == "ja" || @lang == "en"
                        data[:event].start_date = data[:event].start_date.strftime("%Y - %m - %d")
                    else
                        data[:event].start_date = data[:event].start_date.strftime("%d - %m - %Y")
                    end
                    
                    data[:event].start_time = data[:event].start_time.strftime("%Hh%M")
                    
                    return data
                rescue
                    return nil
                end
            end
            ###
             # get banner of event nearest
             # -----------------------------------------------
             # @author      :   Daonx - 2017/08/17 - create
             # @param       :   
             # @return      :   
             # @access      :   public
             # @see         :   remark
            ###
            def self.getBannerEvent
                begin
                    # where(["lang = ? and start > ? and deleted_at = ?", @lang, Time.now, nil])
                    @lang         = Helper.getLang
                    @data         = Hash.new
                    @data[:event] = Event.where(["lang = ? and start > ?", @lang, Time.now])
                                         .where(deleted_at: nil)
                                         .order(:start)
                                         .select(
                                            'id,
                                            start,
                                            image,
                                            link'
                                         ).first
                    if @data[:event] != nil
                        @data[:isset] = 1
                    else
                        @data[:isset] = 0
                    end
                         
                    return @data
                rescue
                    return nil
                end
            end
        end
    end
end