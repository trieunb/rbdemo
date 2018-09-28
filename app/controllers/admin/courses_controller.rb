=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - CoursesController
    *
    * 処理概要      :   
    * 作成日        :   2017/08/22
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
    class CoursesController < AdminController
        include ApplicationHelper
        include CoursesHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/22 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @data = CoursesHlp.getData
            @course = CoursesHlp.getCourse(1, 1)
            render 'admin/courses/courses'
        end
        ###
         # get data translate of course
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/22 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referCourseTrans
            result = Hash.new
            result['status'] = true
            begin # try
                result['data'] = Course.find_by( id: params[:id], lang: params[:lang], deleted_at: nil)
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # get data of course
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/22 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referCourse
            result = Hash.new
            result['status'] = true
            begin # try
                result['data'] = CoursesHlp.getCourse(params[:level], params[:locale])
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # update data of course
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/23 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateCourse
            result = Hash.new
            result['status'] = true
            begin # try
                update = CoursesHlp.updateCourse(params[:course])
                if !update['status']
                    result = update
                end
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # update data translate of course
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/23 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateCourseTrans
            result = Hash.new
            result['status'] = true
            begin # try
                update = CoursesHlp.updateCourseTrans(params[:course])
                if !update['status']
                    result = update
                end
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # get data of classes
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/25 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def classes
            @lang = Helper.getLang
            @data = Course.where(lang: @lang).select('id, title')
            @classes = CoursesHlp.getClasses({:course_id => 0})
            render 'admin/courses/classes'
        end
        ###
         # get list classes follow course
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/28 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referClasses
            result = Hash.new
            result['status'] = true
            begin # try
                @lang = Helper.getLang
                @classes = CoursesHlp.getClasses(params)
                result['data'] = render_to_string(partial: "admin/courses/list_classes")
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # get list classes follow course
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/28 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateShowClass
            result = Hash.new
            result['status'] = true
            begin # try
                result = CoursesHlp.updateShowClass(params)
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # get data need to a class and return view add class
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/29 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def getClass
            @mode = 'I'
            data = CoursesHlp.getDataClass(params[:id])
            @lang = data['lang']
            @class_vi = nil
            @class_ja = nil
            @courses = data['courses']
            @location = data['location']
            render 'admin/courses/class_of_course'
        end
        ###
         # get data of class and return view edit class
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/29 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def editClass
            @mode = 'U'
            data = CoursesHlp.getDataClass(params[:id])
            @lang = data['lang']
            @class_vi = data['class_vi']
            @class_ja = data['class_ja']
            @courses = data['courses']
            @location = data['location']
            if @class_vi == nil
                @mode = 'I'
            end
            render 'admin/courses/class_of_course'
        end
        ###
         # get data translate of a class
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/29 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referClassTrans
            result = Hash.new
            result['status'] = true
            begin # try
                result['data'] = CourseClass.find_by( id: params[:id], lang: params[:lang], deleted_at: nil)
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # update data translate of a class
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/30 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateClassTrans
            result           = Hash.new
            result['status'] = true
            begin # try
                if !CoursesHlp.updateClassTrans(params[:class])
                    result['status'] = false
                end
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # create or update data of a class
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/30 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveClass
            if params[:mode] == 'I'
                update = CoursesHlp.saveClass(params[:class])
            else
                update = CoursesHlp.updateClass(params[:class])
            end
            render json: update
        end
        ###
         # delete a class
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/30 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def deleteClass
            result = Hash.new
            result['status'] = true
            begin # try
                result = CoursesHlp.deleteClass(params[:id])
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end