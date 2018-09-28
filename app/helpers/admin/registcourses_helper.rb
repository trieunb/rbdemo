=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - RegisstCoursesHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/18
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
require 'fileutils'
module Admin
    module RegistcoursesHelper
        class RegistCoursesHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of table regist-courses
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/18 - create
             # @param       :   search - Hash - search condition
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getRegists(search)
                result = Hash.new
                result['status'] = true
                begin
                    lang = Helper.getLang
                    search_result = RegisterCourse.joins('LEFT JOIN course_classes ON register_courses.class_id = course_classes.id')
                        .where(deleted_at: nil).where.not(status: 0)
                        .where('course_classes.lang = \'' + lang + '\'')
                    # search follow course if user choose course
                    if search[:class_id] != nil && search[:class_id].to_i > -1
                        search_result = search_result.where(class_id: search[:class_id])
                    end
                    # search follow name if user enter name
                    if search[:name] != nil && search[:name] != ''
                        search[:name].strip!
                        if search[:name] != ''
                            search[:name] = Helper.sqlEscapeString(search[:name])
                            list_name = search[:name].split(' ')
                            sql = 'register_courses.name LIKE \'%' + list_name[0] + '%\''
                            list_name.drop(1).each do |item|
                                sql += ' OR register_courses.name LIKE \'%' + item +'%\''
                            end
                            search_result = search_result.where(sql)
                        end
                    end
                    # search follow date from if user input date from
                    if search[:date_from] != nil && search[:date_from] != ''
                        search_result = search_result.where('register_courses.created_at >= \'' + search[:date_from].gsub('/', '-') + ' 00:00:00\'' )
                    end
                    # search follow date to if user input date to
                    if search[:date_to] != nil && search[:date_to] != ''
                        search_result = search_result.where('register_courses.created_at <= \'' + search[:date_to].gsub('/', '-') + ' 23:59:59\'' )
                    end
                    # search follow status if user choose status
                    if search[:status] != nil && search[:status].to_i > -1
                        search_result = search_result.where(status: search[:status])
                    end
                    result['data'] = search_result.select('register_courses.id, course_classes.title AS name_class, register_courses.name, address, email, phone, profile, message, status, register_courses.created_at')
                rescue # catch
                    result['status'] = false
                    result['error'] = "#{$!}"
                ensure # finally
                    return result
                end
            end
            ###
             # delete a regist by id
             # -----------------------------------------------
             # @author      :   quypn     - 2017/08/21 - create
             # @param       :   id - int - id of regist need to del
             # @param       :   remove - boolean - if it is true then remove regist - default: false
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.delete(id, remove = false)
                result           = Hash.new
                result['status'] = true
                
                removeProfile    = false
                oldProfile       = nil
                begin
                    ActiveRecord::Base.transaction do
                        regist     = RegisterCourse.find_by(id: id, deleted_at: nil)
                        oldProfile = regist.profile.file.filename
                        if regist != nil
                            removeProfile = true
                            if remove
                                result['status'] = RegisterCourse.where(id: id, deleted_at: nil).delete_all
                            else
                                result['status'] = RegisterCourse.where(id: id, deleted_at: nil)
                                                                 .update_all(
                                                                        deleted_at: Time.now,
                                                                        deleted_by: $user_id
                                                                    )
                            end
                        end
                    end
                rescue # catch
                    result['status'] = false
                    result['error'] = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure # finally
                    result['status'] = Helper.to_b(result['status'])
                    if (result['status'] && removeProfile)
                        begin
                            FileUtils.rm('public/uploads/profiles/' + oldProfile)
                        rescue
                        end
                    end

                    return result
                end
            end
            ###
             # updateStatus
             # -----------------------------------------------
             # @author      :   daonx     - 2017/10/03 - create
             # @param       :   
             # @param       :   
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateStatus(id, status)
                result           = Hash.new
                result['status'] = true
                begin # try
                    ActiveRecord::Base.transaction do
                        result['status'] = RegisterCourse.where(id: id, deleted_at: nil)
                                                         .update_all(
                                                                status: status,
                                                                updated_by: $user_id,
                                                                updated_at: Time.now
                                                         )
                    end
                rescue # catch
                    result['status'] = false
                    result['error'] = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure # finally
                    # byebug
                    return result['status']
                end
            end
        end
    end
end