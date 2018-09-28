=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - RegistAdvisoriesController
    *
    * 処理概要      :   
    * 作成日        :   2017/08/16
    * 作成者        :   havv – quypn@ans-asia.com
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
    class RegisteventsController < AdminController
        include ApplicationHelper
        include RegisteventsHelper
        include EventsHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   havv     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            lang       = Helper.getLang
            @status    = Helper.getLibraries(4, lang)
            @test_type = Helper.getLibraries(7, lang)
            @events    = EventsHlp.getEvents
            render 'admin/regist_events/index'
        end
        ###
         # search list regist Advisories follow search condition
         # -----------------------------------------------
         # @author      :   havv     - 2017/09/15 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def search
            result                 = Hash.new
            result['status']       = true
            begin # try
                search_result      = RegistEventsHlp.getListRegists(params[:search])
                if(search_result['status'])
                    lang           = Helper.getLang
                    @status        = Helper.getLibraries(4, lang)
                    @regists       = search_result['data']
                    result['data'] = render_to_string(partial: "admin/regist_events/list_regist")
                else
                    result         = search_result
                end
            rescue # catch
                result['status']   = false
                result['error']    = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # update status of register_advisories follow id
         # -----------------------------------------------
         # @author      :   havv     - 2017/09/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateStatus
            result     = Hash.new
            begin # try
                result = RegistEventsHlp.updateStatus(params)
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # delete a register_advisories by id
         # -----------------------------------------------
         # @author      :   havv     - 2017/09/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result = Hash.new
            begin # try
                result = RegistEventsHlp.delete(params[:id])
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end