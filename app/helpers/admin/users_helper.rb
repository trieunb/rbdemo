=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - UsersHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/16
    * 作成者        :   quypn – quypn@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   HELPER
    * @copyright   :   Copyright (c) ANS-ASIA
    * @version     :   1.0.0
    * ****************************************************************************
=end
module Admin
    module UsersHelper
        class UsersHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get list user
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/16 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getUsers
                return User.where(deleted_at: nil).where.not(id: $user_id)
                           .select(
                                :id,
                                :name,
                                :username,
                                :email,
                                :phone,
                                :address
                            )
            end
            ###
             # save info of new user
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/16 - create
             # @param       :   user - Hash - data of new user
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.saveUser(user)
                result           = Hash.new
                result['status'] = false
                result['msgNo']  = 7
                password         = nil
                begin
                    ActiveRecord::Base.transaction do
                        selectUser = User.find_by(username: user[:username], deleted_at: nil)
                        if selectUser != nil
                            result['msgNo'] = 16
                        else
                            selectUser = User.find_by(email: user[:email], deleted_at: nil)
                            if selectUser != nil
                                result['msgNo'] = 21
                            else
                                idUser = Helper.getID('users')
                                password = user[:password] != nil && user[:password] != '' ? user[:password] : UsersHlp.generatePassword()
                                newUser = User.create(
                                    id:         idUser,
                                    username:   user[:username],
                                    password:   Helper.getMD5(password),
                                    token:      '',
                                    name:       user[:name],
                                    address:    user[:address],
                                    email:      user[:email],
                                    phone:      user[:phone],
                                    created_by: $user_id
                                )
                                if newUser.present?
                                    result['status'] = true
                                    result['idUser'] = idUser
                                end
                            end
                        end
                    end
                rescue
                    # byebug
                    result['status'] = false
                    result['msgNo']  = 7
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure # finally
                    if result['status']
                        SubscribeMailer.mail_new_regist_user(user[:name], user[:username], password, user[:email]).deliver_later
                    end
                    return result
                end
            end
            ###
             # update info of user
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/16 - create
             # @param       :   data - Hash - data of user need update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateUser(data)
                result = Hash.new
                result['status'] = false
                result['msgNo'] = 7
                begin
                    ActiveRecord::Base.transaction do
                        find_user = User.where(email: data[:email]).where.not(id: data[:id]).first
                        if find_user != nil
                            result['msgNo'] = 21
                        else
                            user = User.find_by(id: data[:id])
                            if user != nil
                                user.name       = data[:name]
                                user.address    = data[:address]
                                user.email      = data[:email]
                                user.phone      = data[:phone]
                                user.updated_at = Time.now
                                user.updated_by = $user_id
                                user.save
                                result['status'] = true
                            end
                        end
                    end
                rescue
                    # Rollback data
                    raise ActiveRecord::Rollback
                end
                return result
            end
            ###
             # delete a user
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/16 - create
             # @param       :   idUser - int - id of user need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteUser(idUser)
                begin
                    ActiveRecord::Base.transaction do
                        user = User.find_by(id: idUser, deleted_at: nil)
                        if user != nil
                            user.deleted_at = Time.now
                            user.deleted_by = $user_id
                            return user.save
                        else
                            return false
                        end
                    end
                rescue
                    # Rollback data
                    raise ActiveRecord::Rollback
                    return false
                end
            end
            ###
             # changepass
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/16 - create
             # @param       :   data - Hash - data of password
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.changepass(data)
                result = Hash.new
                result['status'] = false
                result['msgNo'] = 7
                begin
                    ActiveRecord::Base.transaction do
                        if data[:confirmpass] != data[:newpass]
                            result['msgNo'] = 17
                            return result
                        else
                            user = User.find_by(id: data[:id], deleted_at: nil)
                            if user != nil
                                if user.password != Helper.getMD5(data[:oldpass])
                                    result['msgNo'] = 20
                                    return result
                                else
                                    user.password = Helper.getMD5(data[:newpass])
                                    user.updated_at = Time.now
                                    user.updated_by = $user_id
                                    result['status'] = user.save
                                end
                            end
                        end
                    end
                rescue
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure # finally
                    return result
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
            def self.resetPass(id)
                result = false
                password = ''
                begin
                    ActiveRecord::Base.transaction do
                        user = User.find_by(id: id, deleted_at: nil)
                        if user != nil
                            password        = UsersHlp.generatePassword()
                            user.password   = Helper.getMD5(password)
                            user.updated_at = Time.now
                            user.updated_by = $user_id
                            
                            result          = user.save
                        else
                            result = false;
                        end
                    end
                rescue
                    result = false;
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure # finally
                    if result
                        user = User.find_by(id: id, deleted_at: nil)
                        userChange = User.find_by(id: $user_id)
                        SubscribeMailer.mail_reset_pass(user.name, user.username, password, user.email, userChange.username, user.updated_at.to_formatted_s(:db).gsub('-', '/')).deliver_later
                    end

                    return result
                end
            end
            ###
             # generate the password for user
             # -----------------------------------------------
             # @author      :   quypn     - 2017/09/15 - create
             # @param       :   null
             # @return      :   string - password had generated
             # @access      :   public
             # @see         :   remark
            ###
            def self.generatePassword()
                o = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten << '_-@)(*%'
                return (0...8).map { o[rand(o.length)] }.join
            end
        end
    end
end