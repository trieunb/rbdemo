=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - RegisstAdvisoriesHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/09/15
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
    module RegisteventsHelper
        class RegistEventsHlp
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
                delimiter        = '|#|@'
                sql_joins        = 'LEFT JOIN events ' +
                                   'ON (register_events.event_id = events.id AND events.lang = \'' + lang + '\')'
                sql_select       = 'register_events.id, '+ 
                                   'register_events.event_id, '+ 
                                   'events.title AS event_nm, '+ 
                                   'register_events.name, '+ 
                                   'register_events.email, '+ 
                                   'register_events.phone, '+ 
                                   'register_events.status, '+ 
                                   'register_events.test_type, '+ 
                                   '\'\' AS test_type_nm, '+ 
                                   'register_events.created_at'
                begin
                    search_result  = RegisterEvent.joins(sql_joins).where(deleted_at: nil)
                    # search follow event
                    if search[:event].present? && search[:event].to_i > -1
                        search_result = search_result.where(event_id: search[:event])
                    end
                    # search follow name
                    if search[:name].present?
                        search[:name] = Helper.sqlEscapeString(search[:name])
                        list_name     = search[:name].split(' ')
                        sql           = 'register_events.name LIKE \'%' + list_name[0] + '%\''
                        list_name.drop(1).each do |item|
                            sql   += ' OR register_events.name LIKE \'%' + item +'%\''
                        end
                        search_result = search_result.where(sql)
                    end
                    # search follow test_type
                    if search[:test_type].present? && search[:test_type].to_i > -1
                        sql           = 'register_events.test_type LIKE \'%' + search[:test_type] + '%\''
                        search_result = search_result.where(sql)
                    end
                    # search follow status
                    if search[:status].present? && search[:status].to_i > -1
                        search_result = search_result.where(status: search[:status])
                    end
                    
                    result['data']   = search_result.select(sql_select).order(:event_id)

                    # get list name of test type from libraries
                    result['data'].each do |row|
                        test_type_nm   = ''
                        list_test_type = row[:test_type].to_s.split(delimiter)

                        list_test_type.each do |item|
                            # get name of test type from libraries
                            lib = Helper.getLibraries(7, lang).where(number: item).first
                            
                            test_type_nm += '|' + lib[:name]
                        end

                        length = test_type_nm.length

                        # split character | first
                        row['test_type_nm'] = test_type_nm[1..length]
                    end

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
                    ActiveRecord::Base.transaction do
                        result['status'] = RegisterEvent.where(id: params[:id], deleted_at: nil)
                                                            .update_all(
                                                                status: params[:status],
                                                                updated_by: $user_id,
                                                                updated_at: Time.now
                                                            )
                    end
                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"
                    # Rollback data
                    raise ActiveRecord::Rollback
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
                    ActiveRecord::Base.transaction do
                        if !remove
                            # delete logic
                            result['status'] = RegisterEvent.where(id: id, deleted_at: nil)
                                    .update_all(
                                            deleted_at: Time.now,
                                            deleted_by: $user_id
                                        )
                        else
                            # delete physical
                            result['status'] = RegisterEvent.where(id: id, deleted_at: nil).delete_all
                        end
                    end
                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"
                    # Rollback data
                    raise ActiveRecord::Rollback
                ensure # finally
                    return result
                end
            end
        end
    end
end