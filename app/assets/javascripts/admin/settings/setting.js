/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Setting
    *
    * 処理概要      :   
    * 作成日        :   2017/08/15
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
    'description'       : {'type': 'textarea',     'attr': {'maxlength': 500, 'tabindex': 1, 'class': 'required', 'noname': true}}
,   'keyword'           : {'type': 'text',         'attr': {'maxlength': 100, 'tabindex': 2, 'class': 'required', 'noname': true}}
,   'address'           : {'type': 'text',         'attr': {'maxlength': 100, 'tabindex': 3, 'class': 'required', 'noname': true}}
,   'intro_video'       : {'type': 'text',         'attr': {'maxlength': 255, 'tabindex': 4, 'class': 'required url', 'noname': true}}
,   'welcome'           : {'type': 'CKEditor',     'attr': {'maxlength': 500, 'tabindex': 5, 'class': 'required', 'noname': true}}
,   'different'         : {'type': 'CKEditor',     'attr': {'maxlength': 500, 'tabindex': 6, 'class': 'required', 'noname': true}}
,   'greeting'          : {'type': 'CKEditor',     'attr': {'maxlength': 2500,'tabindex': 7, 'class': 'required', 'noname': true}}
,   'facebook'          : {'type': 'text',         'attr': {'maxlength': 255, 'tabindex': 9, 'class': 'required url', 'noname': true}}
,   'google_plus'       : {'type': 'text',         'attr': {'maxlength': 255, 'tabindex': 10,'class': 'required url', 'noname': true}}
,   'skype'             : {'type': 'text',         'attr': {'maxlength': 255, 'tabindex': 11,'class': 'required', 'noname': true}}
,   'ameblo'            : {'type': 'text',         'attr': {'maxlength': 255, 'tabindex': 12,'class': 'required url', 'noname': true}}
,   'phone_dn'          : {'type': 'tel',          'attr': {'maxlength': 20,  'tabindex': 13,'class': 'required', 'noname': true}}
,   'phone_hn'          : {'type': 'tel',          'attr': {'maxlength': 20,  'tabindex': 14,'class': 'required', 'noname': true}}
,   'phone_tokyo'       : {'type': 'tel',          'attr': {'maxlength': 20,  'tabindex': 15,'class': 'required', 'noname': true}}
,   'email'             : {'type': 'text',         'attr': {'maxlength': 255, 'tabindex': 16,'class': 'required email', 'noname': true}}
,   'position_lat'      : {'type': 'tel',          'attr': {'maxlength': 12,  'tabindex': 17,'class': 'required decimal', 'decimal': 8, 'noname': true}}
,   'position_lng'      : {'type': 'tel',          'attr': {'maxlength': 12,  'tabindex': 18,'class': 'required decimal', 'decimal': 8, 'noname': true}}
}
var _objTrans = {
    'trans_description'       : {'type': 'textarea',     'attr': {'maxlength': 500, 'tabindex': 21, 'class': 'required', 'noname': true}}
,   'trans_keyword'           : {'type': 'text',         'attr': {'maxlength': 100, 'tabindex': 22, 'class': 'required', 'noname': true}}
,   'trans_address'           : {'type': 'text',         'attr': {'maxlength': 100, 'tabindex': 23, 'class': 'required', 'noname': true}}
,   'trans_intro_video'       : {'type': 'text',         'attr': {'maxlength': 255, 'tabindex': 24, 'class': 'required url', 'noname': true}}
,   'trans_welcome'           : {'type': 'CKEditor',     'attr': {'maxlength': 500, 'tabindex': 25, 'class': 'required', 'noname': true}}
,   'trans_different'         : {'type': 'CKEditor',     'attr': {'maxlength': 500, 'tabindex': 26, 'class': 'required', 'noname': true}}
,   'trans_greeting'          : {'type': 'CKEditor',     'attr': {'maxlength': 2500,'tabindex': 27, 'class': 'required', 'noname': true}}
}
var msg_err_file = [0, 0, 0];
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
 * @author      :   quypn - 2017/08/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
        CKEDITOR.replace( 'greeting', {
            height: 400
        });
        CKEDITOR.replace( 'trans_greeting', {
            height: 400
        });
        initItem(_obj);
        initItem(_objTrans);
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * initEvent
 *
 * @author      :   quypn - 2017/08/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('#language-trans').on('change', function(){
            referSettingLang();
        });
        $('#update-setting').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    saveSetting();
                }
            });
        });
        $('#update-setting-trans').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    saveSettingTrans();
                }
            });
        });
        // QuyPN add at 2017/10/02
        // upload imge in setting
        $('#selection_process, #img_of_direction, #trans_selection_process').on('click', function(e){
            $(this).val('');
            $('#' + $(this).attr('id-view')).val('');
            validateModule.clearErrorItem('#' + $(this).attr('id-view'), _text[msg_err_file[$(this).attr('err-idx')]]);
        });
        $('#selection_process, #img_of_direction, #trans_selection_process').on('change', function(e){
            checkFile(this, e);
        });
        // End QuyPN add at 2017/10/02
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * get data to translate follow language
 *
 * @author      :   quypn - 2017/08/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referSettingLang(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/setting/refer-setting',
            dataType    :   'json',
            data        :   {
                lang      :    $('#language-trans').val()
            }, 
            success: function(res) {
                if(res.status){
                    setDataTrans(_objTrans, res.data); //javascript/common/custom.js
                    $('#img_preview2').attr('src', res.data.selection_process);
                    $('#img_preview2').attr('alt', res.data.selection_process);
                    $('#trans_selection_process_name').val(res.data.selection_process);
                }
            }
        });
    }
    catch(e){
        alert('referSettingLang: ' + e.message);
    }
}
/**
 * save data with main language
 *
 * @author      :   quypn - 2017/08/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveSetting(){
    try{
        var err1 = validateModule.validate(_obj);
        var err2 = validateFile(0);
        if(err1&&err2){
            $('#welcome').val(CKEDITOR.instances.welcome.getData());
            $('#different').val(CKEDITOR.instances.different.getData());
            $('#greeting').val(CKEDITOR.instances.greeting.getData());
            $('#form-setting-main').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            $('[tabindex=19]').focus();
                        });
                    }
                    else{
                        jMessage(7, function(){
                            $('[tabindex=19]').focus();
                        });
                    }
                },
            });
        }
        else{
            validateModule.focusFirstError();
        }
    }
    catch(e){
        alert('saveSetting: ' + e.message);
    }
}
/**
 * save data with translate language
 *
 * @author      :   quypn - 2017/08/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveSettingTrans(){
    try{
        var err1 = validateModule.validate(_objTrans);
        var err2 = validateFile(0);
        if(err1&&err2){
            $('#trans_welcome').val(CKEDITOR.instances.trans_welcome.getData());
            $('#trans_different').val(CKEDITOR.instances.trans_different.getData());
            $('#trans_greeting').val(CKEDITOR.instances.trans_greeting.getData());
            $('#form-setting-trans').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            $('[tabindex=1]').focus();
                        });
                    }
                    else{
                        jMessage(7, function(){
                            $('[tabindex=1]').focus();
                        });
                    }
                },
            });
        }
        else{
            validateModule.focusFirstError();
        }
    }
    catch(e){
        alert('saveSettingTrans: ' + e.message);
    }
}
/**
 * check file image upload
 *
 * @author      :   quypn - 2017/10/02 - create
 * @author      :
 * @param       :   btn - button choose file
 * @param       :   e - e vent change file selected
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFile(btn, e){
    try{
        var files = e.target.files || e.dataTransfer.files;
        if(files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE){
            msg_err_file[$(btn).attr('err-idx')] = 23;
            $('#' + $(btn).attr('id-view')).errorStyle(_text[23]);
        }
        else{
            msg_err_file[$(btn).attr('err-idx')] = 0;
            readImage(files[0],'size' + $(btn).attr('err-idx'),'img_preview' + $(btn).attr('err-idx'));
        }
        $('#' + $(btn).attr('id-view')).val(files[0].name);
    } catch (e) {
        alert('checkFile: ' + e.message);
    }
}
/**
 * validate file before upload
 *
 * @author      :   quypn - 2017/10/02 - create
 * @author      :
 * @param       :   mode - 0: main data, 1: translate data
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function validateFile(mode){
    try{
        var notError = true;
        var rate = 1;
        if(mode == 0){
            checkRateImg(0, 510, 0.8, 0.9);
            checkRateImg(1, 250, 0.6, 0.7);
            if(msg_err_file[0] != 0 || msg_err_file[1] != 0){
                notError = false;
            }
            return notError;
        }
        else{
            checkRateImg(2, 510, 0.8, 0.9);
            if(msg_err_file[2] != 0){
                notError = false;
            }
            return notError;
        }
    }
    catch (e) {
        alert('validateFile: ' + e.message);
    }
}
/**
 * check rate of image
 *
 * @author      :   quypn - 2017/10/02 - create
 * @author      :
 * @param       :   idx - int - index of image
 * @param       :   min_width - int - min width can accept
 * @param       :   min_rate - float - min rate can accept
 * @param       :   max_rate - float - max rate can accept
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkRateImg(idx, min_width, min_rate, max_rate){
    try{
        if(msg_err_file[idx] == 27) {
            msg_err_file[idx] = 0;
        }
        if($('#size' + idx).data('height') != undefined && $('#size'  + idx).data('width') != undefined){
            var width = parseInt($('#size' + idx).attr('data-width'));
            var height = parseInt($('#size' + idx).attr('data-height'));
            var rate = parseFloat(width/height);
            if(!(width >= min_width && rate >= min_rate && rate <= max_rate)){
                $('#' + $('#size' + idx).attr('id-view')).errorStyle(_text[27]);
                msg_err_file[idx] = 27;
            }
        }
    }
    catch (e) {
        alert('checkRateImg: ' + e.message);
    }
}