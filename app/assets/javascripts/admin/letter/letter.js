/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Letter (Index)
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
*/
var tableLetter;
$(document).ready(function() {
    try{
        init();
        initEvent();
    }
    catch(e){
        alert('ready: ' + e.message);
    }
});
/**
 * init
 *
 * @author      :   quypn - 2017/08/17 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init() {
    try{
        tableLetter = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang(),
                            "ordering": false
                        });
        setTabIndexTable('#div-table-letter');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * init
 *
 * @author      :   quypn - 2017/08/17 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('#datatable-responsive').on('change', '.show-letter', function(){
            updateShow(this);
        });
        $('.btn-del-letter').on('click', function(){
            var btn = this
            jMessage(8, function(r){
                if(r){
                    deleteLetter(btn);
                }
            });
        });
        $(window).resize(function() {
            tableLetter.columns.adjust().draw();
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * updateShow
 *
 * @author      :   quypn - 2017/08/17 - create
 * @author      :
 * @param       :   check - checkbox had changed status
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateShow(check){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/letter/update-show',
            dataType    :   'json',
            data        :   {
                id      :   $(check).attr('id-letter')
            }, 
            success: function(res) {
            }
        });
    }
    catch(e){
        alert('updateShow: ' + e.message);
    }
}
/**
 * delete aletter
 *
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @param       :   btn - button - button delete had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteLetter(btn){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/letter/delete',
            dataType    :   'json',
            data        :   {
                id      :   $(btn).attr('id-letter')
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        tableLetter.rows($(btn).parents('tr')).remove().draw();
                    });
                }
                else{
                    jMessage(10, function(){
                    });
                }
            }
        });
    }
    catch(e){
        alert('deleteLetter: ' + e.message);
    }
}