/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - ListRegistCourses
    *
    * 処理概要      :   
    * 作成日        :   2017/08/18
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
var _obj = {
    'class_id'    : {'type': 'select',    'attr': {'tabindex': 1, 'noname': true}}
,   'name'        : {'type': 'input',     'attr': {'maxlength': 50,  'tabindex': 2, 'noname': true}}
,   'date_from'   : {'type': 'input',     'attr': {'maxlength': 10,  'tabindex': 3, 'noname': true}}
,   'date_to'     : {'type': 'input',     'attr': {'maxlength': 10,  'tabindex': 5, 'noname': true}}
,   'status'      : {'type': 'select',    'attr': {'tabindex': 7, 'noname': true}}
}
var notErrDay = true;
var table;
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
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
        if($('.datepicker').length > 0){
            $('.datepicker').datetimepicker({
                format: 'YYYY/MM/DD',
                locale: locale
            });
        }
        initItem(_obj);
        setTabIndexMenu();
        $('[tabindex=1]').focus();
        searchListRegistCourses();
    }
    catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * initEvent
 *
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('#btn-search').on('click', function(){
            searchListRegistCourses();
        });
        $('#date_from, #date_to').on('blur', function(){
            checkErrDay();
        });
        $(document).on('click', '.download-file', function(){
            checkDownloadFile($(this).attr('link-file'));
        });
        $(document).on('change', '.status-regist', function(){
            changeStatus(this);
        });
        $(document).on('click', '.btn-del-regist', function(){
            var btn = this;
            jMessage(8, function(r){
                if(r){
                    deleteRegist(btn);
                }
            });
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * check date from and date to
 *
 * @author      :   quypn - 2017/08/21 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkErrDay(){
    try{
        if($('#date_from').val() > $('#date_to').val() && $('#date_from').val() != '' && $('#date_to').val() != ''){
            $('#date_from').errorStyle(_text[3]);
            $('#date_to').errorStyle(_text[3]);
            notErrDay = false;
        }
        else{
            validateModule.clearErrorItem($('#date_from'), _text[3]);
            validateModule.clearErrorItem($('#date_to'), _text[3]);
            notErrDay = true;
        }
    }
    catch(e){
        alert('checkErrDay: ' + e.message);
    }
}
/**
 * search list regist course follow search condition
 *
 * @author      :   quypn - 2017/08/21 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function searchListRegistCourses(){
    try{
        if(validateModule.validate(_obj) && notErrDay){
            $('#form-search').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        $('#div-table-regist-courses').html(res.data);
                        table = $('.dt-responsive').DataTable({
                            bFilter: false,
                            'language': getDataTableLang(),
                            "aoColumnDefs": [{ "bSortable": false, "aTargets": [ 4, 8, 9 ] }],
                            "order": [[ 7, "desc" ]]
                        });
                        setTabIndexTable('#div-table-regist-courses');
                        setTabIndexMenu();
                        $('[tabindex=10]').focus();
                    }
                    else{
                        $('#div-table-regist-courses').html('');
                        setTabIndexMenu();
                        $('[tabindex=1]').focus();
                    }
                },
            });
        }
        else{
            validateModule.focusFirstError();
        }
    }
    catch(e){
        alert('searchListRegistCourses: ' + e.message);
    }
}
/**
 * check file exist before download
 *
 * @author      :   quypn - 2017/08/21 - create
 * @author      :
 * @param       :   file - string - link file need to download
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkDownloadFile(file){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/check-file',
            dataType    :   'json',
            data        :   {
                file    :   file
            }, 
            success: function(res) {
                if(res.status){
                    window.location = res.file;
                }
                else{
                    jMessage(24, function(){
                    });
                }
            }
        });
    }
    catch(e){
        alert('checkDownloadFile: ' + e.message);
    }
}
/**
 * event change status of regist
 *
 * @author      :   quypn - 2017/08/21 - create
 * @author      :
 * @param       :   select - element - select had status changed
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function changeStatus(select){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/regist-courses/update-status',
            dataType    :   'json',
            data        :   {
                id      :   $(select).attr('id-regist'),
                status  :   $(select).val()
            }, 
            success: function(res) {
                if(res.status){
                    var number = $('#number-regist-course span').text();
                    if(number == undefined || number == null || number == ''){
                        number = '0';
                    }
                    number = parseInt(number);
                    if($(select).val() + '' != '1' && $(select).attr('old-val') + '' == '1'){
                        number -= 1;
                    }
                    if($(select).val() + '' == '1' && $(select).attr('old-val') + '' != '1'){
                        number += 1;
                    }
                    $('#number-regist-course span').remove();
                    if(number > 0){
                        $('#number-regist-course').append('<span class="badge bg-red">' + number + '</span>');
                    }
                    $(select).attr('old-val', $(select).val());
                } else {
                    jMessage(10, function(){
                        $(select).val($(select).attr('old-val'));
                    });
                }
            }
        });
    }
    catch(e){
        alert('changeStatus: ' + e.message);
    }
}
/**
 * delete a regist by id
 *
 * @author      :   quypn - 2017/08/21 - create
 * @author      :
 * @param       :   btn - element - button had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteRegist(btn){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/regist-courses/delete',
            dataType    :   'json',
            data        :   {
                id      :   $(btn).attr('id-regist')
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        var number = $('#number-regist-course span').text();
                        if(number == undefined || number == null || number == ''){
                            number = '0';
                        }
                        number = parseInt(number);
                        if($(btn).parents('tr').find('td .status-regist').val() + '' == '1'){
                            number -= 1;
                        }
                        $('#number-regist-course span').remove();
                        if(number > 0){
                            $('#number-regist-course').append('<span class="badge bg-red">' + number + '</span>');
                        }
                        table.rows($(btn).parents('tr')).remove().draw();
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
        alert('deleteRegist: ' + e.message);
    }
}