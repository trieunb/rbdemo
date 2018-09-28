/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - List Regist Adivisories
    *
    * 処理概要      :   
    * 作成日        :   2017/09/15
    * 作成者        :   havv – havv@ans-asia.com
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
    'name'              : {'type': 'input',     'attr': {'tabindex': 1, 'noname': true, 'maxlength': 50, 'class': 'ime-active'}}
,   'education_level'   : {'type': 'select',    'attr': {'tabindex': 2, 'noname': true}}
,   'course_type'       : {'type': 'select',    'attr': {'tabindex': 3, 'noname': true}}
,   'status'            : {'type': 'select',    'attr': {'tabindex': 4, 'noname': true}}
}
var table = null;

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
 * @author      :   havv - 2017/09/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
        //init item
        initItem(_obj);

        //set tabindex for buttuon search
        $('#btn-search').attr('tabindex', 5);
        //set tabindex for menu
        setTabIndexMenu();

        //focus first item
        $('[tabindex=1]').focus();

        search();
    } catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * initEvent
 *
 * @author      :   havv - 2017/09/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $(document).on('click', '#btn-search', function(){
            validateModule.clearAllError(_obj);

            var validate = validateModule.validate(_obj);

            if (validate) {
                search();
            } else {
                validateModule.focusFirstError();
            }
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
    } catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * search list Regist Adivisories
 *
 * @author      :   havv - 2017/09/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function search() {
    try {
        $('#form-search').ajaxSubmit({
            beforeSubmit: function(a,f,o) {

                //trim string in value
                for (var i = 0; i < a.length; i++) {
                    if  (a[i].name == 'search[name]') {
                        a[i].value = $.trim(a[i].value);
                    }
                }

                o.dataType = 'json';
            },
            complete: function(XMLHttpRequest, textStatus) {
                var res = XMLHttpRequest.responseJSON;
                if(res.status){
                    $('#div-table-regist-advisories').html(res.data);
                    table = $('.dt-responsive').DataTable({
                        bFilter: false,
                        'language': getDataTableLang()
                    });
                    setTabIndexTable('#div-table-regist-advisories');
                    setTabIndexMenu();
                    $('[tabindex=10]').focus();
                } else{
                    $('#div-table-regist-advisories').html('');
                    setTabIndexMenu();
                    $('[tabindex=1]').focus();
                }
            },
        });
    } catch(e){
        alert('search: ' + e.message);
    }
}
/**
 * event change status of regist
 *
 * @author      :   havv - 2017/09/18 - create
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
            url         :   '/admin/regist-advisories/update-status',
            dataType    :   'json',
            data        :   {
                id      :   $(select).attr('id-regist'),
                status  :   $(select).val()
            }, 
            success: function(res) {
                if(res.status) {
                    var number = $('#number-regist-advisories span').text();

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

                    $('#number-regist-advisories span').remove();

                    if(number > 0){
                        $('#number-regist-advisories').append('<span class="badge bg-red">' + number + '</span>');
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
 * @author      :   havv - 2017/09/18 - create
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
            url         :   '/admin/regist-advisories/delete',
            dataType    :   'json',
            data        :   {
                id      :   $(btn).attr('id-regist')
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        var number = $('#number-regist-advisories span').text();
                        if(number == undefined || number == null || number == ''){
                            number = '0';
                        }
                        number = parseInt(number);
                        if($(btn).parents('tr').find('td .status-regist').val() + '' == '1'){
                            number -= 1;
                        }
                        $('#number-regist-advisories span').remove();
                        if(number > 0){
                            $('#number-regist-advisories').append('<span class="badge bg-red">' + number + '</span>');
                        }
                        table.rows($(btn).parents('tr')).remove().draw();
                    });
                }
                else{
                    jMessage(10, function(){});
                }
            }
        });
    }
    catch(e){
        alert('deleteRegist: ' + e.message);
    }
}