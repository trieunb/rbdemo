=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - MediaController
    *
    * 処理概要      :   
    * 作成日        :   2017/09/01
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
    class MediasController < AdminController
        include ApplicationHelper
        include MediasHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/01 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @medias = MediasHlp.getMedias()
            render 'admin/media/index'
        end
        ###
         # return view page create a media
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/01 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            @mode      = 'I'
            @lang      = Helper.getLang()
            @libraries = Helper.getLibraries(9,@lang);
            # byebug
            render 'admin/media/media'
        end
        ###
         # return view page edit a media
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/01 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def edit
            @data      = MediasHlp.getMedia(params[:id])
            @media     = @data['media']
            @mode      = 'U'

            @lang      = Helper.getLang()
            @libraries = Helper.getLibraries(9,@lang);

            render 'admin/media/media'
        end
        ###
         # add or update a media
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/01 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveMedia
            if params[:mode] == 'I'
                update = MediasHlp.saveMedia(params[:media])
            else
                update = MediasHlp.updateMedia(params[:media])
            end
            render json: update
        end
        ###
         # delete a media
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/01 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result           = Hash.new
            result['status'] = true
            
            begin # try
                if !MediasHlp.deleteMedia(params[:id])
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