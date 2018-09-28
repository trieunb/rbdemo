=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - LoginController
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
module Admin
    class LoginController < ActionController::Base
        include ApplicationHelper
        protect_from_forgery with: :exception
        before_action :setLocal
        layout false
        def setLocal
            I18n.locale = cookies[:lang] || I18n.default_locale
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
            if session[:user_id] != nil
                redirect_to admin_dashboard_index_path
            end
            render 'admin/login/index'
        end
        ###
        # checklogin
        # -----------------------------------------------
        # @author      :   quypn     - 2017/07/27 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def checkLogin
            username = params[:username]
            password = params[:password]
            user = User.where(username: username, deleted_at: nil).first
            if user == nil
                user = User.find_by(email: username, deleted_at: nil).first
            end
            if user != nil
                if user.password == Helper.getMD5(password)
                    user.token = Helper.generateToken(user.id)
                    user.timeout = Time.now + 720*60
                    user.updated_at = Time.now
                    user.updated_by = user.id
                    user.save
                    session[:user_id] = user.id
                    session[:user_nm] = username
                    redirect_to admin_dashboard_path
                else
                    redirect_to admin_login_index_path, :flash => {:notice => t('password_not_correct'), :username => username, :password => password}
                end
            else
                redirect_to admin_login_index_path, :flash => {notice: t('username_or_not_correct'), :username => username, :password => password}
            end
        end
        ###
        # logout
        # -----------------------------------------------
        # @author      :   quypn     - 2017/07/27 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def logout
            user = User.find_by(id: session[:user_id])
            if user != nil
                user.token = ''
                user.timeout = nil
                user.updated_at = Time.now
                user.updated_by = session[:user_id]
                user.save
            end
            session.delete(:user_id)
            session.delete(:user_nm)
            redirect_to admin_login_index_path
        end
    end
end