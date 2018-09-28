=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - SettingController
    *
    * 処理概要      :   
    * 作成日        :   2017/08/14
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
    class SettingController < AdminController
        include ApplicationHelper
        include SettingHelper
        ###
        # index
        # -----------------------------------------------
        # @author      :   quypn     - 2017/08/14 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def index
            @setting = SettingHlp.getSetting
            render 'admin/setting/index'
        end
        ###
        # referSetting
        # -----------------------------------------------
        # @author      :   quypn     - 2017/08/15 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def referSetting
            result = Hash.new
            result['status'] = true
            begin # try
                result['data'] = Setting.find_by( id: 1, lang: params[:lang])
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
        # update setting
        # -----------------------------------------------
        # @author      :   quypn     - 2017/08/15 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def update
            result = Hash.new
            result['status'] = true
            begin # try
                if !SettingHlp.updateSetting(params[:setting])
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
        # update translate setting
        # -----------------------------------------------
        # @author      :   quypn     - 2017/08/15 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def updateTrans
            result = Hash.new
            result['status'] = true
            begin # try
                if !SettingHlp.updateSettingTrans(params[:setting])
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