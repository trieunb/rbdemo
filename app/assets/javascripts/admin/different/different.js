/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Different (Index)
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
*/
var tableDifferent;
$(document).ready(function() {
    try {
        initalizeDifferents();
        initEventDifferents();
    } catch(e){
        console.log('ready: ' + e.message);
    }
});

/**
 * initalizeDifferents
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initalizeDifferents() {
    try{
        tableDifferent = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang()
                        });
        setTabIndexTable('#div-table-different');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    } catch(e){
        console.log('initalizeDifferents: ' + e.message);
    }
}

/**
 * initEventDifferents
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventDifferents(){
    try{
        // update show different
        $(document).on('change', '.show-different', function(){
            updateShowDifferent(this);
        });
        // delete
        $(document).on('click', '.btn-del-different', function(e){
            var ele = this;
            jMessage(8, function(r){
                if(r){
                    result = deleteDifferent(ele);
                    if (result) {
                        // remove row chosen
                        tableDifferent.row($(ele).parents('tr')[0]).remove().draw();
                    }
                }
            });
        });

        // draw table when resize
        $(window).resize(function(){
            tableDifferent.columns.adjust().draw();
        });
    } catch(e){
        console.log('initEventDifferents: ' + e.message);
    }
}

/**
 * delete different
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   btn - button - button delete had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteDifferent(e){
    try{
        var result = false;

        $.ajax({
            type        :   'POST',
            url         :   '/admin/differents/delete',
            dataType    :   'json',
            async       :   false,
            data        :   {
                id      :   $(e).attr('id-different')
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
        console.log('deleteDifferent: ' + e.message);
    }
}

/**
 * updateShowDifferent
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   check - checkbox had changed status
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateShowDifferent(element){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/differents/update-show-different',
            dataType    :   'json',
            data        :   {
                id      :   $(element).attr('id-different')
            }, 
            success: function(res) {
            }
        });
    }
    catch(e){
        console.log('updateShowDifferent: ' + e.message);
    }
}