=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * MAILLER - support sent email
    *
    * 処理概要      :   
    * 作成日        :   2017/08/30
    * 作成者        :   ANS809 – quypn@ans-asia.com
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
class SubscribeMailer < ApplicationMailer
    include ApplicationHelper #app/helpers/application_helper.rb
    ###
     # sent email to verify the regist course of user
     # -----------------------------------------------
     # @author      :   quypn     - 2017/08/30 - create
     # @param       :   id - id regist course
     # @return      :   null
     # @access      :   public
     # @see         :   remark
    ###
    def mail_verify_regist_course(id)
        begin
            @lang = Helper.getLang
            @regist = RegisterCourse.joins('LEFT JOIN course_classes ON course_classes.id = register_courses.class_id AND course_classes.lang = \''+@lang+'\'')
                                    .joins('LEFT JOIN courses ON courses.id = course_classes.course_id AND courses.lang = course_classes.lang')
                                    .where(id: id, deleted_at: nil)
                                    .select('courses.title AS course_nm, course_classes.title AS class_nm, course_classes.beauty_id AS class_link, register_courses.id, register_courses.token, register_courses.email').first
            if @regist != nil
                @setting = Setting.where(lang: @lang, id: 1, deleted_at: nil).select(:email, :address, :phone_dn).first
                mail(to: @regist.email, subject: '[ANS Asia] BrSE School - ' + t('mail_regist_course_subject'))
            end
        rescue
        end
    end
    ###
     # sent email to notify create user admin success
     # -----------------------------------------------
     # @author      :   quypn     - 2017/09/15 - create
     # @param       :   fullname - name of user
     # @param       :   username - username of user
     # @param       :   password - password of user
     # @param       :   email - email will to sent to
     # @return      :   null
     # @access      :   public
     # @see         :   remark
    ###
    def mail_new_regist_user(fullname, username, password, email)
        begin
            @lang = Helper.getLang
            @fullname = fullname
            @username = username
            @password = password
            @setting = Setting.where(lang: @lang, id: 1, deleted_at: nil).select(:email, :address, :phone_dn).first
            mail(to: email, subject: '[ANS Asia] BrSE School - ' + t('create_admin_account_success'))
        rescue
        end
    end
    ###
     # sent email to notify resset password
     # -----------------------------------------------
     # @author      :   quypn     - 2017/09/15 - create
     # @param       :   fullname - name of user
     # @param       :   username - username of user
     # @param       :   password - new password of user
     # @param       :   email - email will to sent to
     # @param       :   nameChange - account resset password
     # @param       :   timeChange - time when resset password
     # @return      :   null
     # @access      :   public
     # @see         :   remark
    ###
    def mail_reset_pass(fullname, username, password, email, nameChange, timeChange)
        begin
            @lang = Helper.getLang
            @fullname = fullname
            @username = username
            @password = password
            @nameChange = nameChange
            @timeChange = timeChange
            @setting = Setting.where(lang: @lang, id: 1, deleted_at: nil).select(:email, :address, :phone_dn).first
            mail(to: email, subject: '[ANS Asia] BrSE School - ' + t('reset_password_success'))
        rescue
        end
    end
    ###
     # sent email to subscriber when regist subscriber
     # -----------------------------------------------
     # @author      :   havv     - 2017/09/21 - create
     # @param       :   email - email of subscriber
     # @return      :   null
     # @access      :   public
     # @see         :   remark
    ###
    def mail_to_subscriber(email)
        begin
            @lang = Helper.getLang
            @setting = Setting.where(lang: @lang, id: 1, deleted_at: nil).select(:email, :address, :phone_dn).first
            mail(to: email, subject: '[ANS Asia] BrSE School - ' + t('mail_title_thanks_for_subscribing'))
        rescue
        end
    end
    ###
     # sent email to register adviories when regist adviories
     # -----------------------------------------------
     # @author      :   havv     - 2017/09/21 - create
     # @param       :   email - email of register adviories
     # @return      :   null
     # @access      :   public
     # @see         :   remark
    ###
    def mail_to_register_adviories(email)
        begin
            @lang = Helper.getLang
            @setting = Setting.where(lang: @lang, id: 1, deleted_at: nil).select(:email, :address, :phone_dn).first
            mail(to: email, subject: '[ANS Asia] BrSE School - ' + t('mail_title_thanks_for_registration'))
        rescue
        end
    end
    ###
     # sent email to register event when regist event
     # -----------------------------------------------
     # @author      :   havv     - 2017/09/21 - create
     # @param       :   email - email of register adviories
     # @param       :   event_id - int - id of event
     # @return      :   null
     # @access      :   public
     # @see         :   remark
    ###
    def mail_to_register_event(email, event_id)
        begin
            @lang        = Helper.getLang
            event        = Event.where(id: event_id, lang: @lang).select(:id, :title, :start, :end, :place, :link).first
            @setting     = Setting.where(lang: @lang, id: 1, deleted_at: nil).select(:email, :address, :phone_dn).first
            
            @title       = event.title
            @place       = event.place
            if @lang == 'vi'
                @link_detail = $domain.to_s + '/event-detail/' + event.link.to_s
            else
                @link_detail = $domain.to_s + '/' + @lang + '/event-detail/' + event.link.to_s
            end
            @time        = nil

            start_date   = event.start.strftime("%d - %m - %Y")
            start_time   = event.start.strftime("%Hh%M")
            end_date     = event.end.strftime("%d - %m - %Y")
            end_time     = event.end.strftime("%Hh%M")

            if start_date = end_date
                @time = t('event_time_text_day') + ' ' + start_date + ', ' + start_time + ' ~ ' + end_time + '.'
            else
                @time = start_time + ' ' + t('event_time_text_day') + ' ' + start_date +  ' ~ ' + end_time + ' ' + t('event_time_text_day') + ' ' + end_date + '.'
            end
            
            mail(to: email, subject: '[ANS Asia] BrSE School - ' + t('mail_title_thanks_for_registration'))
        rescue
        end
    end
end