=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - LettersController
    *
    * 処理概要      :   
    * 作成日        :   2017/08/17
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
    class LettersController < AdminController
        include ApplicationHelper
        include LettersHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/17 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @letters = LettersHlp.getLetters
            render 'admin/letters/index'
        end
        ###
         # return view page create a letter
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/17 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            @mode = 'I'
            lang = Helper.getLang
            @typeEmbed = Helper.getLibraries(10, lang)
            render 'admin/letters/letter'
        end
        ###
         # return view page edit a letter
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/17 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def edit
            @data = LettersHlp.getLetter(params[:id])
            lang = Helper.getLang
            @typeEmbed = Helper.getLibraries(10, lang)
            if @data['letter_vi'] == nil
                @mode = 'I'
            else
                @letter = @data['letter_vi']
                @letter_ja = @data['letter_ja']
                @lang = @data['lang']
                @mode = 'U'
            end
            render 'admin/letters/letter'
        end
        ###
         # get data translate of letter
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referLetter
            result = Hash.new
            result['status'] = true
            begin # try
                result['data'] = Letter.find_by( id: params[:id], lang: params[:lang], deleted_at: nil)
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # add or update a letter
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveLetter
            if params[:mode] == 'I'
                update = LettersHlp.saveLetter(params[:letter])
            else
                update = LettersHlp.updateLetter(params[:letter])
            end
            render json: update
        end
        ###
         # update data translate of letter
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateTrans
            result = Hash.new
            result['status'] = true
            begin # try
                if !LettersHlp.updateTransLetter(params[:letter])
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
         # delete a letter
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result = Hash.new
            result['status'] = true
            begin # try
                if !LettersHlp.deleteLetter(params[:id])
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
         # update show status of letter
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateShow
            result = Hash.new
            result['status'] = true
            begin # try
                result['status'] = Letter.where(id: params[:id])
                                         .update_all('letters.show = NOT letters.show, updated_by = ' + $user_id.to_s + ', updated_at = \'' + Time.now.to_formatted_s(:db) + '\'')
            rescue # catch
                result['status'] = false
                result['error'] = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end