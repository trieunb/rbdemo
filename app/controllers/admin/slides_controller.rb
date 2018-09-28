=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - SlidesController
    *
    * 処理概要      :   
    * 作成日        :   2017/08/24
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
    class SlidesController < AdminController
        include ApplicationHelper
        include SlidesHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/24 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @slides = SlidesHlp.getSlides
            render 'admin/slides/index'
        end
        ###
         # return view page create a slide
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/24 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            @mode = 'I'
            render 'admin/slides/slide'
        end
        ###
         # return view page edit a slide
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/24 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def edit
            @data = SlidesHlp.getSlide(params[:id])
            if @data['slide_vi'] == nil
                @mode = 'I'
            else
                @slide    = @data['slide_vi']
                @slide_ja = @data['slide_ja']
                @lang     = @data['lang']
                @mode     = 'U'
            end
            render 'admin/slides/slide'
        end
        ###
         # get data translate of slide
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referSlide
            result           = Hash.new
            result['status'] = true
            begin # try
                result['data'] = Slide.find_by( id: params[:id], lang: params[:lang], deleted_at: nil)
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # add or update a slide
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveSlide
            if params[:mode] == 'I'
                update = SlidesHlp.saveSlide(params[:slide])
            else
                update = SlidesHlp.updateSlide(params[:slide])
            end
            render json: update
        end
        ###
         # update data translate of slide
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateSlideTrans
            result           = Hash.new
            result['status'] = true
            begin # try
                if !SlidesHlp.updateSlideTrans(params[:slide])
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
         # delete a slide
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result           = Hash.new
            result['status'] = true
            begin # try
                if !SlidesHlp.deleteSlide(params[:id])
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
         # update show status of slide
         # -----------------------------------------------
         # @author      :   daonx     - 2017/08/18 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateShowSlide
            result           = Hash.new
            result['status'] = true
            begin # try
                result['status'] = Slide.where(id: params[:id])
                                        .update_all('slides.show = NOT slides.show, updated_by = ' + $user_id.to_s + ', updated_at = \'' + Time.now.to_formatted_s(:db) + '\'')
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
    end
end