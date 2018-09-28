=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - AlbumsController
    *
    * 処理概要      :   
    * 作成日        :   2017/09/11
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
    class AlbumsController < AdminController
        include ApplicationHelper
        include AlbumsHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @albums = AlbumsHlp.getAlbums()
            render 'admin/album/index'
        end
        ###
         # return view page upload photos for album
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            render 'admin/album/addPhotos'
        end
        ###
         # add photó to album
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def savePhotos
            render json: AlbumsHlp.savePhotos(params[:photos].values)
        end
        ###
         # delete photos of album
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/11 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            render json: AlbumsHlp.deleteAlbum(params[:ids])
        end
    end
end