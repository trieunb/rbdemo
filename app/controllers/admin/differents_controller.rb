=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - DifferentsController
    *
    * 処理概要      :   
    * 作成日        :   2017/09/11
    * 作成者        :   daonx – daonx@ans-asia.com
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
    class DifferentsController < AdminController
        include ApplicationHelper
        include DifferentsHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @differents = DifferentsHlp.getDifferents()
            render 'admin/different/index'
        end
        ###
         # return view page create a different
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            @mode      = 'I'
            @lang      = Helper.getLang()
            @libraries = Helper.getLibraries(9,@lang);
            # byebug
            render 'admin/different/different'
        end
        ###
         # return view page edit a different
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def edit
            @data      = DifferentsHlp.getDifferent(params[:id])
            if @data['different_vi'] == nil
                @mode = 'I'
            else
                @different    = @data['different_vi']
                @different_ja = @data['different_ja']
                @lang         = @data['lang']
                @mode         = 'U'
            end

            render 'admin/different/different'
        end
        ###
         # add or update a different
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveDifferent
            if params[:mode] == 'I'
                update = DifferentsHlp.saveDifferent(params[:different])
            else
                update = DifferentsHlp.updateDifferent(params[:different])
            end
            render json: update
        end
        ###
         # update show status of different
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateShowDifferent
            result           = Hash.new
            result['status'] = true
            begin # try
                result['status'] = Different.where(id: params[:id])
                                            .update_all('differents.show = NOT differents.show,
                                                         updated_by      = ' + $user_id.to_s + ',
                                                         updated_at      = \'' + Time.now.to_formatted_s(:db) + '\'')
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # update data translate of different
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateDifferentTrans
            result           = Hash.new
            result['status'] = true

            begin # try
                if !DifferentsHlp.updateDifferentTrans(params[:different])
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
         # get data translate of different
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referDifferent
            result           = Hash.new
            result['status'] = true

            begin # try
                result['data'] = Different.find_by( id: params[:id], 
                                                    lang: params[:lang], 
                                                    deleted_at: nil)
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # delete a different
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result           = Hash.new
            result['status'] = true
            
            begin # try
                if !DifferentsHlp.deleteDifferent(params[:id])
                    result['status'] = false
                end
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end