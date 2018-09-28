=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - AdminController
    *
    * 処理概要      :   father of all controller in package admin
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
class AdminController < ActionController::Base
    include ApplicationHelper
    protect_from_forgery with: :exception
    layout "admin"
    before_action :check_login
    ###
    # if not login then redirect to page login
    # -----------------------------------------------
    # @author      :   quypn     - 2017/07/27 - create
    # @param       :   null
    # @return      :   null
    # @access      :   public
    # @see         :   remark
    ###
    def check_login
        I18n.locale = cookies[:lang] || I18n.default_locale
        begin
            if !request.xhr?
                $domain = request.protocol +
                        (request.domain == nil ? request.host : request.domain) +
                        (request.port == 80 ? '' : (':' + request.port.to_s))
            end
        rescue
            $domain = 'http://brse-school.vn'
        end

        begin
            if !($domain.include?('http://brse-school.vn') || $domain.include?('45.252.249.221') || $domain.include?('localhost:8100'))
                redirect_to '/error'
            end
        rescue

        end

        if session[:user_id] == nil
            if !request.xhr?
                redirect_to admin_login_index_path
            else
                result = Hash.new
                result['status'] = false
                render json: result
            end
        else
            @language = Helper.getLang
            $user_id = session[:user_id]
            if !request.xhr?
                @msg                   = Helper.genMsg
                @countRegistCouse      = RegisterCourse.where(deleted_at: nil, status: 1).count(:id)
                @countRegistAdvisories = RegisterAdvisory.where(deleted_at: nil, status: 1).count(:id)
                @countRegistEvents     = RegisterEvent.where(deleted_at: nil, status: 1).count(:id)
                @countSubscribes       = Subscribe.where(deleted_at: nil, status: 1).count(:id)
            end
        end
    end
    ###
    # if file exist return link download
    # -----------------------------------------------
    # @author      :   quypn     - 2017/08/21 - create
    # @param       :   null
    # @return      :   null
    # @access      :   public
    # @see         :   remark
    ###
    def checkFile
        result = Hash.new
        result['status'] = true
        begin # try
            if File.file?('public' + params[:file])
                result['file'] = params[:file]
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
