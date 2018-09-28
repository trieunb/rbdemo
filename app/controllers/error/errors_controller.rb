=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - ErrorController
    *
    * 処理概要      :   
    * 作成日        :   2017/07/28
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
module Error
    class ErrorsController < ActionController::Base
        protect_from_forgery with: :exception
        layout false
        ###
        # index
        # -----------------------------------------------
        # @author      :   quypn     - 2017/07/28 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def index
            render 'error/error'
        end
        ###
        # return page for not found error
        # -----------------------------------------------
        # @author      :   quypn     - 2017/07/28 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def error_404
            render 'error/error404'
        end
        ###
        # return page for assect denied error
        # -----------------------------------------------
        # @author      :   quypn     - 2017/07/28 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def error_403
            render 'error/error403'
        end
        ###
        # return page for server error
        # -----------------------------------------------
        # @author      :   quypn     - 2017/07/28 - create
        # @param       :   null
        # @return      :   null
        # @access      :   public
        # @see         :   remark
        ###
        def error_500
            render 'error/error500'
        end
    end
end