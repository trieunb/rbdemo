=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - QuestionsController
    *
    * 処理概要      :   
    * 作成日        :   2017/09/12
    * 作成者        :   daonx – daonx@ans-asia.com
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
    class QuestionsController < AdminController
        include ApplicationHelper
        include QuestionsHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/12 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @questions = QuestionsHlp.getQuestions()
            render 'admin/question/index'
        end
        ###
         # return view page create a question
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/12 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            @mode = 'I'
            render 'admin/question/question'
        end
        ###
         # return view page edit a question
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/12 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def edit
            @data      = QuestionsHlp.getQuestion(params[:id])
            if @data['question_vi'] == nil
                @mode = 'I'
            else
                @question    = @data['question_vi']
                @question_ja = @data['question_ja']
                @lang         = @data['lang']
                @mode         = 'U'
            end

            render 'admin/question/question'
        end
        ###
         # add or update a question
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/12 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveQuestion
            if params[:mode] == 'I'
                update = QuestionsHlp.saveQuestion(params[:question])
            else
                update = QuestionsHlp.updateQuestion(params[:question])
            end
            render json: update
        end
        ###
         # update data translate of question
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/12 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateQuestionTrans
            result           = Hash.new
            result['status'] = true

            begin # try
                if !QuestionsHlp.updateQuestionTrans(params[:question])
                    result['status'] = false
                end
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # get data translate of question
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/12 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referQuestion
            result           = Hash.new
            result['status'] = true

            begin # try
                result['data'] = Question.find_by( id: params[:id], 
                                                   lang: params[:lang], 
                                                   deleted_at: nil)
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # delete a question
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/12 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result           = Hash.new
            result['status'] = true
            
            begin # try
                if !QuestionsHlp.deleteQuestion(params[:id])
                    result['status'] = false
                end
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end