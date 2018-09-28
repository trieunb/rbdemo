/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Event (Index)
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
*/
var tableEvent;
$(document).ready(function() {
    try{
        initalizeEvents();
        initEventEvents();
    }
    catch(e){
        console.log('ready: ' + e.message);
    }
});

/**
 * initalizeEvents
 *
 * @author      :   daonx - 2017/09/13 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initalizeEvents() {
    try{
        tableEvent = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang()
                        });
        setTabIndexTable('#div-table-event');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch(e){
        console.log('initalizeEvents: ' + e.message);
    }
}
/**
 * initEventEvents
 *
 * @author      :   daonx - 2017/09/13 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventEvents(){
    try{
        $(document).on('change', '.show-event', function(){
            updateShowEvent(this);
        });

        $(document).on('click', '.btn-del-event', function(e){
            var ele = this;
            jMessage(8, function(r){
                if(r){
                    result = deleteEvent(ele);
                    if (result) {
                        // remove row chosen
                        tableEvent.row($(ele).parents('tr')[0]).remove().draw();
                    }
                }
            });
        });

        // resize
        $(window).resize(function(){
            tableEvent.columns.adjust().draw();
        })
    }
    catch(e){
        console.log('initEventEvents: ' + e.message);
    }
}

/**
 * updateShowEvent
 *
 * @author      :   daonx - 2017/09/13 - create
 * @author      :
 * @param       :   check - checkbox had changed status
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateShowEvent(element){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/events/update-show-event',
            dataType    :   'json',
            data        :   {
                id      :   $(element).attr('id-event')
            }, 
            success: function(res) {
            }
        });
    }
    catch(e){
        console.log('updateShowEvent: ' + e.message);
    }
}

/**
 * delete event
 *
 * @author      :   daonx - 2017/09/13 - create
 * @author      :
 * @param       :   btn - button - button delete had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteEvent(e){
    try{
        var result = false;

        $.ajax({
            type        :   'POST',
            url         :   '/admin/events/delete',
            dataType    :   'json',
            async       :   false,
            data        :   {
                id      :   $(e).attr('id-event')
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        // $(e).parents('tr').remove();
                    });
                } else {
                    jMessage(10, function(){
                    });
                }
                result = res.status;
            }
        });

        return result;
    } catch(e){
        alert('deleteLetter: ' + e.message);
    }
}