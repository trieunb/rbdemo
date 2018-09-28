=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - SubscribesHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/09/20
    * 作成者        :   havv – havv@ans-asia.com
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
    module SubscribesHelper
        class SubscribesHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
            # get data of table register_advisories with search condition
            # -----------------------------------------------
            # @author      :   havv     - 2017/09/18 - create
            # @param       :   search - Hash - search condition
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.getListRegists(search)
                result           = Hash.new
                result['status'] = true
                lang             = Helper.getLang
                sql_select       = 'subscribes.id, '+ 
                                   'subscribes.email, '+ 
                                   'subscribes.status, '+ 
                                   'subscribes.created_at'
                begin
                    search_result  = Subscribe.where(deleted_at: nil)
                    # search follow status
                    if search[:status].present? && search[:status].to_i > -1
                        search_result = search_result.where(status: search[:status])
                    end
                    
                    result['data']   = search_result.select(sql_select).order(:id)

                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"
                ensure # finally
                    return result
                end
            end
            ###
            # update a field of register_advisories follow id
            # -----------------------------------------------
            # @author      :   havv     - 2017/09/18 - create
            # @param       :   params - Hash
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.updateStatus(params)
                result           = Hash.new
                result['status'] = true
                begin # try
                    result['status'] = Subscribe.where(id: params[:id], deleted_at: nil)
                                                        .update_all(
                                                            status: params[:status],
                                                            updated_by: $user_id,
                                                            updated_at: Time.now
                                                        )
                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"
                ensure # finally
                    return result
                end
            end
            ###
            # delete a regist by id
            # -----------------------------------------------
            # @author      :   havv     - 2017/09/18 - create
            # @param       :   id - int - id of regist need to del
            # @param       :   remove - boolean - if it is true then remove regist - default: false
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.delete(id, remove = false)
                result           = Hash.new
                result['status'] = true
                begin
                    if !remove
                        # delete logic
                        result['status'] = Subscribe.where(id: id, deleted_at: nil)
                                .update_all(
                                        deleted_at: Time.now,
                                        deleted_by: $user_id
                                    )
                    else
                        # delete physical
                        result['status'] = Subscribe.where(id: id, deleted_at: nil).delete_all
                    end
                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"
                ensure # finally
                    return result
                end
            end
        end
    end
end