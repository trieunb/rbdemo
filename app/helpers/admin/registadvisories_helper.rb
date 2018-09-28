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
    module RegistadvisoriesHelper
        class RegistAdvisoriesHlp
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
                sql_joins        = 'LEFT JOIN libraries AS lib_edu_level ' +
                                   'ON (lib_edu_level.library_id = 6 AND lib_edu_level.number = register_advisories.education_level AND lib_edu_level.lang = \'' + lang + '\')' +
                                   'LEFT JOIN libraries AS lib_course_type ' +
                                   'ON (lib_course_type.library_id = 2 AND lib_course_type.number = register_advisories.course_type AND lib_course_type.lang = \'' + lang + '\')'
                sql_select       = 'register_advisories.id, '+ 
                                   'register_advisories.name, '+ 
                                   'register_advisories.address, '+ 
                                   'register_advisories.email, '+ 
                                   'register_advisories.phone, '+ 
                                   'register_advisories.message, '+ 
                                   'register_advisories.status, '+ 
                                   'register_advisories.education_level, '+ 
                                   'lib_edu_level.name AS education_level_nm, '+ 
                                   'register_advisories.course_type, '+ 
                                   'lib_course_type.name AS course_type_nm, '+ 
                                   'register_advisories.created_at'
                begin
                    search_result  = RegisterAdvisory.joins(sql_joins).where(deleted_at: nil)
                    # search follow name
                    if search[:name].present?
                        search[:name] = Helper.sqlEscapeString(search[:name])
                        list_name     = search[:name].split(' ')
                        sql           = 'register_advisories.name LIKE \'%' + list_name[0] + '%\''
                        list_name.drop(1).each do |item|
                            sql   += ' OR register_advisories.name LIKE \'%' + item +'%\''
                        end
                        search_result = search_result.where(sql)
                    end
                    # search follow education_level
                    if search[:education_level].present? && search[:education_level].to_i > -1
                        search_result = search_result.where(education_level: search[:education_level])
                    end
                    # search follow course_type
                    if search[:course_type].present? && search[:course_type].to_i > -1
                        search_result = search_result.where(course_type: search[:course_type])
                    end
                    # search follow status
                    if search[:status].present? && search[:status].to_i > -1
                        search_result = search_result.where(status: search[:status])
                    end

                    result['data']   = search_result.select(sql_select)
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
                        result['status'] = RegisterAdvisory.where(id: params[:id], deleted_at: nil)
                                                            .update_all(
                                                                status: params[:status],
                                                                updated_by: $user_id,
                                                                updated_at: Time.now
                                                            )
                    end
                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"

                    # Roll back
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
                        if remove
                            # delete physical
                            result['status'] = RegisterAdvisory.where(id: id, deleted_at: nil).delete_all
                        else
                            # delete logic
                            result['status'] = RegisterAdvisory.where(id: id, deleted_at: nil)
                                    .update_all(
                                            deleted_at: Time.now,
                                            deleted_by: $user_id
                                        )
                        end
                    end
                rescue # catch
                    result['status'] = false
                    result['error']  = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure # finally
                    return result
                end
            end
        end
    end
end