=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - HomeController
    *
    * 処理概要      :   
    * 作成日        :   2017/07/27
    * 作成者        :   quypn – quypn@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   HOME
    * @copyright   :   Copyright (c) ANS-ASIA
    * @version     :   1.0.0
    * ****************************************************************************
=end
module Home
    class HomeController < ApplicationController
        include ApplicationHelper #app/helpers/application_helper.rb
        include HomeHelper #app/helpers/home/home_helper.rb
        ###
         # getData
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/10 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def getData
            @lang               = Helper.getLang
            @setting            = Setting.find_by(:id => 1, :lang => @lang)
            @dataSlide          = HomePage.getDataSlide()
            @dataDifferent      = HomePage.getDataDifferent()
            @dataMedia          = HomePage.getDataMedia()
            @dataCourses        = HomePage.getDataCourses()
            @dataEvent          = HomePage.getDataEvent()
            @dataCourseType     = Helper.getLibraries(2, @lang)
            @dataEducationlevel = Helper.getLibraries(6, @lang)
        end

        ###
         # getData index
         # -----------------------------------------------
         # @author      :   quypn     - 2017/09/28 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def getDataIndex
            self.getData()
            # Add by Daonx - ANS804 - 2017/08/22
            # Edit by Daonx - ANS804 - 2017/08/25
            @dataPopupEvent = HomePage.getBannerEvent
            if @dataPopupEvent != nil && @dataPopupEvent[:event] != nil && @dataPopupEvent[:event][:image] != nil
                # create direction
                @direction      = "#{Rails.public_path}" + @dataPopupEvent[:event][:image]
                # check isset file
                @dataPopupEvent = File.exist?(@direction) ? @dataPopupEvent : nil
            end
            # End - Add by Daonx - ANS804 - 2017/08/22
        end

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
            begin
                self.getDataIndex()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # index of english
         # -----------------------------------------------
         # @author      :   quypn     - 2017/09/28 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def indexEn
            begin
                I18n.locale = 'en'
                self.getDataIndex()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # index
         # -----------------------------------------------
         # @author      :   quypn     - 2017/09/28 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def indexJa
            begin
                I18n.locale = 'ja'
                self.getDataIndex()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # return page with course deteils
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/10 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def courseDetail
            begin
                @idClass = HomePage.getIdClassByBeautyId(params[:beauty_id])
                @verify  = params[:verify]
                self.getData()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # return page with form apply
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/10 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def showApply
            begin
                if(params[:beauty_id] != nil)
                    @idClass = HomePage.getIdClassByBeautyId(params[:beauty_id])
                end
                @showApply = 1;
                self.getData()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # user regist course
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/10 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def registCourse
            result = Hash.new
            result['status'] = true
            begin # try
                regist         = RegisterCourse.new(regist_params)
                id             = Helper.getID('register_courses')
                regist.id      = id
                regist.status  = 0
                regist.token   = Helper.generateToken(id)
                regist.timeout = Time.now + 172800 # 48h
                if regist.save
                    SubscribeMailer.mail_verify_regist_course(id).deliver_later
                    CourseClass.where(:id => regist_params['class_id']).update_all('view = view + 1')
                    result['status'] = true
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

        def regist_params
            params.require(:regist).permit(:id, :class_id, :name, :profile, :address, :email, :phone, :message)
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
        def verifyRegistCourse
            begin
                result = HomePage.verifyRegistCourse(params[:id], params[:token])
                redirect_to :controller => 'home', :action => 'courseDetail', :beauty_id => params[:beauty_id], :verify => result, :lang => Helper.getLang
            rescue
                # byebug
                redirect_to error_path
            end
        end
        ###
         # refer info of class by id
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/09 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referClass
            result = Hash.new
            result['status'] = true
            begin # try
                @lang  = Helper.getLang
                @class = HomePage.referClass(params[:id].to_i)
                if @class != nil
                    result['status'] = true
                    result['html']   = render_to_string(partial: "home/course_details")
                else
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
         # return page with form regist Advisory
         # -----------------------------------------------
         # @author      :   quypn     - 2017/11/09 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def showRegistAdvisory
            begin
                @showRegistAdvisory = 1
                self.getData()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # regist Advisory
         # -----------------------------------------------
         # @author      :   havv     - 2017/08/10 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def registAdvisory
            result = Hash.new
            result['status'] = true
            begin # try
                id                 = Helper.getID('register_advisories', 'id');

                registerAdvisory   = RegisterAdvisory.create(
                    id:                 id, 
                    name:               params[:name],
                    address:            params[:address],
                    email:              params[:email],
                    phone:              params[:phone],
                    message:            params[:message],
                    status:             params[:status].to_i,
                    education_level:    params[:education_level].to_i,
                    course_type:        params[:course_type].to_i
                )
                
                if registerAdvisory.present?
                    # send mail for register
                    SubscribeMailer.mail_to_register_adviories(params[:email]).deliver_later
                    # regist success
                    result['status'] = true
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

        ###
         # Subscribe Email
         # -----------------------------------------------
         # @author      :   havv     - 2017/08/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def subscribeEmail
            result = Hash.new
            result['status'] = true
            begin # try
                # find email exist
                subscribe = Subscribe.find_by(email: params[:email], deleted_at: nil)

                if subscribe.nil?
                    # email not exist 
                    # insert data

                    id = Helper.getID('subscribes', 'id');

                    subscribe = Subscribe.create(
                        id:                 id, 
                        email:              params[:email],
                        status:             1
                    )
                end

                if subscribe.present?
                    # send mail for subscriber
                    SubscribeMailer.mail_to_subscriber(params[:email]).deliver_later
                    # subscribe success
                    result['status'] = true
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

        ###
         # refer a event
         # -----------------------------------------------
         # @author      :   havv     - 2017/08/14 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referEvent
            result           = Hash.new
            result['status'] = true
            begin # try
                @lang     = Helper.getLang
                @event    = HomePage.referEvent(params[:id].to_i)
                @dataTest = Helper.getLibraries(7, @lang)

                if @event.present?
                    result['status'] = true
                    result['html']   = render_to_string(partial: "home/regist_event")
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

        ###
         # regist event
         # -----------------------------------------------
         # @author      :   havv     - 2017/08/15 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def registEvent
            result = Hash.new
            result['status'] = true
            begin # try
                id              = Helper.getID('register_events', 'id');

                registerEvent   = RegisterEvent.create(
                    id:                 id,
                    event_id:           params[:event_id].to_i,
                    name:               params[:name],
                    email:              params[:email],
                    phone:              params[:phone],
                    test_type:          params[:test_type],
                    status:             params[:status].to_i
                )
                
                if registerEvent.present?
                    # send mail for subscriber
                    SubscribeMailer.mail_to_register_event(params[:email], params[:event_id].to_i).deliver_later
                    result['status'] = true
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

        ###
         # return page with regist event
         # -----------------------------------------------
         # @author      :   havv     - 2017/08/15 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def showRegistEvent
            begin
                @idEvent = HomePage.getIdEventByBeautyId(params[:beauty_id])
                self.getData()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # refer a event detail
         # -----------------------------------------------
         # @author      :   Daonx - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referEventDetail
            result           = Hash.new
            result['status'] = true
            begin # try
                @lang     = Helper.getLang
                @event    = HomePage.referEventDetail(params[:event_id].to_i)
                
                if @event.present?
                    result['status'] = true
                    result['html']   = render_to_string(partial: "home/event_detail")
                else
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
         # showEventDetail
         # -----------------------------------------------
         # @author      :   Daonx     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def showEventDetail
            begin
                @eventDetailId = HomePage.getIdEventByBeautyId(params[:beauty_id])
                self.getData()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
         # get data of event nearest
         # -----------------------------------------------
         # @author      :   Daonx - 2017/08/22 - create
         # @param       :   
         # @return      :   
         # @access      :   public
         # @see         :   remark
        ###
        def referPopupEventNearest
            result          = Hash.new
            result[:status] = true
            begin
                @lang             = Helper.getLang
                @dataEventNearest = Hash.new
                @dataEventNearest = HomePage.getBannerEvent

                if @dataEventNearest.present?
                    result[:status] = true
                    result[:html]   = render_to_string(partial: "home/show_event_nearest")
                else
                    result[:status] = false
                end
            rescue
                result[:status] = false
                result[:error]  = "#{$!}"
            ensure # finally
                render json: result
            end
        end

        ###
         # return page greeting
         # -----------------------------------------------
         # @author      :   dao     - 2017/11/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def greeting
            begin
                @showVideoAboutUs = 1
                self.getData()
                render 'home/index'
            rescue
                redirect_to error_path
            end
        end

        ###
        # maintenance
        # -----------------------------------------------
        # @author      :   daonx     - 2017/11/13 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def maintenance
                render 'error/maintenance', layout: false
            
        end
    end
end