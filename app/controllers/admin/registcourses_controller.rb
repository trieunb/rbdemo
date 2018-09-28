=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - RegistCourseController
    *
    * 処理概要      :   
    * 作成日        :   2017/08/18
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
module Admin
    class RegistcoursesController < AdminController
        include ApplicationHelper
        include RegistcoursesHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            lang = Helper.getLang
            @classes = CourseClass.where(lang: lang)
            @status = Helper.getLibraries(4, lang)
            notVerify = RegisterCourse.where(deleted_at: nil, status: 0).where("timeout < ?", Time.now).select(:id)
            notVerify.each do |item|
                RegistCoursesHlp.delete(item.id, true)
            end
            render 'admin/registCourses/index'
        end
        ###
         # search list regist course follow search condition
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/21 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def search
            result = Hash.new
            result['status'] = true
            begin # try
                search_result = RegistCoursesHlp.getRegists(params[:search])
                if(search_result['status'])
                    lang = Helper.getLang
                    @status = Helper.getLibraries(4, lang)
                    @regists = search_result['data']
                    result['data'] = render_to_string(partial: "admin/registCourses/list_regist")
                else
                    result = search_result
                end
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # update status of regist course follow id
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/21 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateStatus
            result           = Hash.new
            result['status'] = true
            begin # try
                result['status'] = RegistCoursesHlp.updateStatus(params[:id],params[:status])
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                # byebug
                render json: result
            end
        end
        ###
         # delete a regist course by id
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/21 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result = Hash.new
            begin # try
                result = RegistCoursesHlp.delete(params[:id])
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end