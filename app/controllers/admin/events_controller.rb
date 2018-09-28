=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - EventsController
    *
    * 処理概要      :   
    * 作成日        :   2017/09/13
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
    class EventsController < AdminController
        include ApplicationHelper
        include EventsHelper
        ###
         # index
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def index
            @lang = Helper.getLang
            @events = EventsHlp.getEvents
            render 'admin/event/index'
        end
        ###
         # return view page create a event
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def create
            @mode = 'I'
            render 'admin/event/event'
        end
        ###
         # return view page edit a event
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def edit
            @data = EventsHlp.getEvent(params[:id])
            if @data['event_vi'] == nil
                @mode = 'I'
            else
                @event        = @data['event_vi']
                @event_ja     = @data['event_ja']
                @event_detail = @data['event_detail']
                @lang         = @data['lang']
                @mode         = 'U'
            end
            # byebug
            render 'admin/event/event'
        end
        ###
         # get data translate of event
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def referEvent
            result           = Hash.new
            result['status'] = true
            begin # try
                result['data'] = Event.find_by( id: params[:id], lang: params[:lang], deleted_at: nil)
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end
        ###
         # add or update a event
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def saveEvent
            if params[:mode] == 'I'
                update = EventsHlp.saveEvent(params[:event])
            else
                update = EventsHlp.updateEvent(params[:event])
            end
            render json: update
        end
        ###
         # update data translate of event
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateEventTrans
            result           = Hash.new
            result['status'] = true
            begin # try
                if !EventsHlp.updateEventTrans(params[:event])
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
         # delete a event
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def delete
            result           = Hash.new
            result['status'] = true
            begin # try
                if !EventsHlp.deleteEvent(params[:id])
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
         # update show status of event
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def updateShowEvent
            result           = Hash.new
            result['status'] = true
            begin # try
                result['status'] = Event.where(id: params[:id])
                                        .update_all('events.show = NOT events.show, updated_by = ' + $user_id.to_s + ', updated_at = \'' + Time.now.to_formatted_s(:db) + '\'')
            rescue # catch
                result['status'] = false
                result['error']  = "#{$!}"
            ensure # finally
                render json: result
            end
        end        
        ###
         # add photos to event detail
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def savePhotos
            render json: EventsHlp.savePhotos(params[:photos].values,params[:id])
        end
        ###
         # delete thumbnai and image in event details
         # -----------------------------------------------
         # @author      :   daonx     - 2017/09/13 - create
         # @param       :   null
         # @return      :   null
         # @access      :   public
         # @see         :   remark
        ###
        def deleteThumbImage
            render json: EventsHlp.deleteThumbImage(params[:ids])
        end
    end
end