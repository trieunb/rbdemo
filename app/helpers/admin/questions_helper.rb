=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - QuestionsHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/09/12
    * 作成者        :   daonx – daonx@ans-asia.com
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
    module QuestionsHelper
        class QuestionsHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
             # get data of table question
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/12 - create
             # @param       :   null
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getQuestions
                lang = Helper.getLang
                return Question.where(deleted_at: nil, lang: lang)
                             .select(
                                :id,
                                :question,
                                :answer
                             )
            end
            ###
             # get data of table question by id
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/12 - create
             # @param       :   id - int - id of question need to get
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.getQuestion(id)
                data                = Hash.new
                data['question_vi'] = Question.find_by(lang: 'vi', id: id, deleted_at: nil)
                data['question_ja'] = Question.find_by(lang: 'ja', id: id, deleted_at: nil)
                data['lang']        = Language.where(deleted_at: nil)
                                               .where.not(language_code: 'vi')
                                               .select('id, language_name, language_code')
                                               .order('id')
                return data
            end
            ###
             # create a question
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/12 - create
             # @param       :   question - Hash - data of question need to add
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.saveQuestion(question)
                result           = Hash.new
                result['status'] = true
                begin
                    ActiveRecord::Base.transaction do               
                        lang = Language.where(deleted_at: nil).select('id, language_name, language_code')
                        id   = Helper.getID('questions')
                        lang.each do |item|
                            Question.create(
                                    id:         id,
                                    lang:       item[:language_code],
                                    question:   question[:question],
                                    answer:     question[:answer],
                                    created_by: $user_id
                                )
                        end
                        result['id'] = id
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    return result
                end
            end
            ###
             # update a question
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/12 - create
             # @param       :   question - Hash - data of question need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateQuestion(question)
                result           = Hash.new
                result['status'] = true
                update           = true

                begin
                    ActiveRecord::Base.transaction do 
                        oldQuestion = Question.find_by(id: question[:id], lang: 'vi')
                        if oldQuestion != nil
                            update_vi = Question.where(id: question[:id], lang: 'vi')
                                                .update_all(
                                                    question:   question[:question],
                                                    answer:     question[:answer],
                                                    updated_at: Time.now,
                                                    updated_by: $user_id
                                                )
                                            
                            result['status'] = update_vi
                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    return result
                end
            end
            ###
             # update data translate of a question
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/12 - create
             # @param       :   question - Hash - data translate of question need to update
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.updateQuestionTrans(question)
                result           = Hash.new
                result['status'] = true

                begin
                    ActiveRecord::Base.transaction do 
                        oldQuestion = Question.find_by(id: question[:id], lang: question[:lang])
                        if oldQuestion != nil
                            update = Question.where(id: question[:id], lang: question[:lang])
                                              .update_all(
                                                    question:   question[:question],
                                                    answer:     question[:answer],
                                                    updated_at: Time.now,
                                                    updated_by: $user_id
                                                )
                                            
                            result['status'] = update
                        end
                    end
                rescue
                    result['status'] = false
                    result['error']  = "#{$!}"

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    return result['status']
                end
            end
            ###
             # delete a question
             # -----------------------------------------------
             # @author      :   daonx     - 2017/09/12 - create
             # @param       :   id - int - id of question need to delete
             # @return      :   null
             # @access      :   public
             # @see         :   remark
            ###
            def self.deleteQuestion(id)
                update = true
                begin
                    ActiveRecord::Base.transaction do 
                        update = Question.where(id: id)
                                          .update_all(
                                                deleted_by: $user_id,
                                                deleted_at: Time.now
                                          )

                    end
                rescue
                    update = false

                    # Roll back
                    raise ActiveRecord::Rollback
                ensure
                    return update
                end
            end
        end
    end
end