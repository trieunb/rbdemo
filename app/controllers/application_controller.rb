=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - ApplicationController
    *
    * 処理概要      :   father of all controller in package home
    * 作成日        :   2017/07/27
    * 作成者        :   quypn – quypn@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   HOME
    * @copyright   :   Copyright (c) ANS-ASIA
    * @version     :   1.0.0
    * ****************************************************************************
=end
class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    layout "application"
    before_action :set_locale
    ###
    # set locale to get language
    # -----------------------------------------------
    # @author      :   quypn     - 2017/07/27 - create
    # @param       :   null
    # @return      :   null
    # @access      :   public
    # @see         :   remark
    ###
    def set_locale
        $maintenance = nil
        begin
            if !request.xhr?
                $domain = request.protocol +
                        (request.domain == nil ? request.host : request.domain) +
                        (request.port == 80 ? '' : (':' + request.port.to_s))
            end
        rescue
            $domain = 'http://brse-school.vn'
        end
        
        begin
            if !($domain.include?('http://brse-school.vn') || $domain.include?('45.252.249.221') || $domain.include?('localhost:8100'))
                redirect_to '/error'
            end
        rescue

        end

        begin
            I18n.locale = params[:lang] || I18n.default_locale
        rescue
            I18n.locale = I18n.default_locale
        end
    end
end
