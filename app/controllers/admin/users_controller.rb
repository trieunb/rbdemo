=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - UsersController
    *
    * 処理概要      :   
    * 作成日        :   2017/08/16
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
    class UsersController < AdminController
        include ApplicationHelper
        include UsersHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @users = UsersHlp.getUsers
            render 'admin/users/index'
        end
        ###
         # return view add user
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            render 'admin/users/create'
        end
        ###
         # create a user
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveUser
            result = Hash.new
            result['status'] = true
            begin # try
                saved = UsersHlp.saveUser(params[:user])
                if !saved['status']
                    result['status'] = false
                    result['msgNo'] = saved['msgNo']
                else
                    result['idUser'] = saved['idUser']
                end
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
                result['msgNo'] = 7
            ensure # finally
                render json: result
            end
        end
        ###
         # return view edit user
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def edit
            if params[:id] == $user_id
                redirect_to admin_profile_path
            end
            @user = User.find_by(id: params[:id], deleted_at: nil)
            if @user == nil
                render 'admin/users/create'
            else
                render 'admin/users/edit'
            end
        end
        ###
         # update info of user
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateUser
            result = Hash.new
            result['status'] = true
            begin # try
                result = UsersHlp.updateUser(params[:user])
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # delete a user
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result = Hash.new
            result['status'] = true
            begin # try
                if !UsersHlp.deleteUser(params[:id])
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
         # return view of profile user login
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def profile
            @user = User.find_by(id: $user_id)
            if @user == nil
                render 'admin/users/create'
            else
                render 'admin/users/profile'
            end
        end
        ###
         # user login change pass
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/16 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def changepass
            result = Hash.new
            result['status'] = true
            begin # try
                saved = UsersHlp.changepass(params[:pass])
                if !saved['status']
                    result['status'] = false
                    result['msgNo'] = saved['msgNo']
                else
                    result['idUser'] = saved['idUser']
                end
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
                result['msgNo'] = 7
            ensure # finally
                render json: result
            end
        end
        ###
         # reset password for other user
         # -----------------------------------------------
         # @author      :   quypn     - 2017/09/15 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def resetPass
            result = Hash.new
            result['status'] = true
            begin # try
                if !UsersHlp.resetPass(params[:id])
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