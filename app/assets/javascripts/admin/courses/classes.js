/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Classes
    *
    * 処理概要      :   
    * 作成日        :   2017/08/28
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
var tableClasses;
$(document).ready(function() {
    try{
        init();
        initEvent();
        $('[tabindex=1]').focus();
    }
    catch(e){
        alert('ready: ' + e.message);
    }
});
/**
 * init
 *
 * @author      :   quypn - 2017/08/28 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init() {
    try{
        tableClasses = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang(),
                            "aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0, 7, 8 ] }],
                            "order": [[ 1, "asc" ]]
                        });
        setTabIndexTable('#div-classes-of-course');
        setTabIndexMenu();
    }
    catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * initEvent
 *
 * @author      :   quypn - 2017/08/28 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('#course').on('change', function(){
            referClasses();
        });
        $(document).on('change', '.show-class', function(){
            if($(this).attr('update') + '' == '1'){
                updateShow(this);
            }
            else{
                $(this).attr('update', '1');
            }
        });
        $(document).on('click', '.btn-del-class', function(){
            var btn = this;
            jMessage(8, function(r){
                if(r){
                    deleteClass(btn);
                }
            });
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * update set class show or not show in home page
 *
 * @author      :   quypn - 2017/08/28 - create
 * @author      :
 * @param       :   check - checkbox of row have class need to update
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateShow(check){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/courses/update-show-class',
            dataType    :   'json',
            data        :   {
                id        :   $(check).attr('id-class'),
                course_id :   $(check).attr('course-id')
            }, 
            success: function(res) {
                var isTrueSet = ($(check).attr('old-val') == 'true');
                if (!res.status){
                    jMessage(res.msgNo, function(){
                        $(check).attr('update', '0');
                        $(check).trigger('click');
                    });
                }
                else{
                    $(check).attr('old-val', !isTrueSet);
                }
            }
        });
    }
    catch(e){
        alert('updateShow: ' + e.message);
    }
}
/**
 * get list class by course
 *
 * @author      :   quypn - 2017/08/28 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referClasses(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/courses/refer-classes',
            dataType    :   'json',
            data        :   {
                course_id    :   $('#course').val()
            }, 
            success: function(res) {
                if(res.status){
                    $('#div-classes-of-course').html(res.data);
                    tableClasses = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang(),
                            "aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0, 7, 8 ] }],
                            "order": [[ 1, "asc" ]]
                        });
                    // reset switchery style for checkbox
                    if ($(".js-switch")[0]) {
                        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
                        elems.forEach(function (html) {
                            var switchery = new Switchery(html, {
                                color: '#26B99A'
                            });
                        });
                    }
                    setTabIndexTable('#div-classes-of-course');
                    setTabIndexMenu();
                    $('[tabindex=3]').focus();
                }
                else{
                    $('#div-classes-of-course').html('');
                    setTabIndexMenu();
                    $('[tabindex=1]').focus();
                }
            }
        });
    }
    catch(e){
        alert('referClasses: ' + e.message);
    }
}
/**
 * delete a class in couser
 *
 * @author      :   quypn - 2017/08/30 - create
 * @author      :
 * @param       :   btn - button had clicked of row have class need to delete
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteClass(btn){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/courses/delete-class',
            dataType    :   'json',
            data        :   {
                id      :   $(btn).attr('id-class')
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        tableClasses.rows($(btn).parents('tr')).remove().draw();
                    });
                }
                else{
                    jMessage(res.msgNo, function(){
                    });
                }
            }
        });
    }
    catch (e) {
        alert('deleteClass: ' + e.message);
    }
}