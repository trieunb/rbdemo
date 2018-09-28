=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - DashdoardController
    *
    * 処理概要      :   
    * 作成日        :   2017/07/27
    * 作成者        :   quypn – quypn@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   ADMIN
    * @copyright   :   Copyright (c) ANS-ASIA
    * @version     :   1.0.0
    * ****************************************************************************
=end
require 'open-uri'
module Admin
    class DashboardController < AdminController
        include ApplicationHelper
        ###
        # index
        # -----------------------------------------------
        # @author      :   quypn     - 2017/07/27 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def index
            lang = Helper.getLang
            @regists = RegisterCourse.joins('LEFT JOIN course_classes ON register_courses.class_id = course_classes.id')
                        .where(deleted_at: nil).where.not(status: 0)
                        .where('course_classes.lang = \'' + lang + '\'')
                        .where(status: 1)
                        .order(id: :DESC)
                        .select('register_courses.id, course_classes.title AS name_class, register_courses.name, address, email, phone, profile, message, status, register_courses.created_at')
            @status = Helper.getLibraries(4, lang)
            @location = Helper.getLibraries(8, lang)
            render 'admin/dashboard/index'
        end
        def referWeather
            result = Hash.new
            result['status'] = true
            begin # try
                lang = Helper.getLang
                @weather = JSON.load(open("http://api.openweathermap.org/data/2.5/forecast/daily?id=#{params[:id]}&units=metric&cnt=7&APPID=7aeec999a36738dccb8046e5dd50e502&lang=#{lang}"))
                if @weather != nil
                    result['status'] = true
                    result['lang'] = lang
                    result['html'] = render_to_string(partial: "admin/dashboard/weather")
                else
                    result['status'] = false
                end
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end