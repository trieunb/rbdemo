/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Add/Edit Letter
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
var _obj = {
    'title'       : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 1, 'class': 'required', 'noname': true}}
,   'content'     : {'type': 'CKEditor',  'attr': {'maxlength': 3000,'tabindex': 2, 'class': 'required', 'noname': true}}
,   'author'      : {'type': 'input',     'attr': {'maxlength': 50,  'tabindex': 3, 'noname': true}}
,   'background'  : {'type': 'input',     'attr': {'maxlength': 30,  'tabindex': 5, 'class': 'required', 'noname': true}}
}
var _objTrans = {
    'trans_title'       : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 12, 'class': 'required', 'noname': true}}
,   'trans_content'     : {'type': 'CKEditor',  'attr': {'maxlength': 3000,'tabindex': 13, 'class': 'required', 'noname': true}}
,   'trans_author'      : {'type': 'input',     'attr': {'maxlength': 50,  'tabindex': 14, 'noname': true}}
}
var msg_err_file = [22, 22, 22];
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
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
        CKEDITOR.replace( 'content', {
            height: 350
        });
        initItem(_obj);
        if(mode == 'U'){
            CKEDITOR.replace( 'trans_content', {
                height: 350
            });
            initItem(_objTrans);
        }
        $('.background').colorpicker();
        setTabIndexMenu();
        $('[tabindex=1]').focus();
        if($('#image-name').val() != ''){
            msg_err_file[0] = 0;
        }
        if($('#icon-name').val() != ''){
            msg_err_file[1] = 0;
        }
        if($('#trans_image-name').val() != ''){
            msg_err_file[2] = 0;
        }
        console.log(msg_err_file);
    }
    catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * initEvent
 *
 * @author      :   quypn - 2017/08/17 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('.file').on('change', function(e){
            checkFile(this, e);
        })
        $('.file').on('click', function(e){
            validateModule.clearErrorItem('#' + $(this).attr('id-view'), _text[msg_err_file[$(this).attr('err-idx')]]);
        });
        $('.typ-embed').on('change', function(){
            setEmbed(this);
        });
        $('.colorpicker').on('click', function(){
            validateModule.clearErrorItem('#background', CONSTANTS.msgRequired);
        });
        $('#language-trans').on('change', function(){
            referLetterLang();
        });
        $('#btn-save-letter').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    saveLetter();
                }
            });
        });
        $('#btn-trans-letter').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    saveTransLetter();
                }
            });
        });
        $('#btn-delete-letter').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteLetter();
                }
            });
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * check file choosen
 *
 * @author      :   quypn - 2017/08/17 - create
 * @author      :
 * @param       :   e - event change file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFile(btn, e){
    try{
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            $('#' + $(btn).attr('id-view')).val('');
            msg_err_file[$(btn).attr('err-idx')] = 22;
            $('#' + $(btn).attr('id-view')).errorStyle(_text[22]);
            $('#img_preview' + $(btn).attr('err-idx')).attr('src', '');
            return;
        }
        if(files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE){
            msg_err_file[$(btn).attr('err-idx')] = 23;
            $('#' + $(btn).attr('id-view')).errorStyle(_text[23]);
        }
        else{
            msg_err_file[$(btn).attr('err-idx')] = 0;
            readImage(files[0],'size' + $(btn).attr('err-idx'),'img_preview' + $(btn).attr('err-idx'));
        }
        $('#' + $(btn).attr('id-view')).val(files[0].name);
        console.log(msg_err_file);
    } catch (e) {
        alert('checkFile: ' + e.message);
    }
}
/**
 * validate file before save
 *
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function validateFile(type){
    try{
        var notError = true;
        var rate = 1;
        if(type == 1){
            checkRateImg(0, 888, 1.7, 1.8);
            checkRateImg(1, 335, 1.1, 1.2);
            if(($('#typ').val() == '2' && msg_err_file[0] != 0) || msg_err_file[1] != 0){
                notError = false;
            }
            return notError;
        }
        else{
            checkRateImg(2, 888, 1.7, 1.8);
            if($('#trans_typ').val() == '2' && msg_err_file[2] != 0){
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
 * set view to add embed
 *
 * @author      :   quypn - 2017/10/13 - create
 * @author      :
 * @param       :   select - combobox select format of embed
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setEmbed(select){
    try{
        console.log($(select).val());
        if($(select).val() == '1'){
            $('#' + $(select).attr('first') + 'embed_video').removeClass('hidden');
            $('#' + $(select).attr('first') + 'embed_img').addClass('hidden');
        } else if ($(select).val() == '2'){
            $('#' + $(select).attr('first') + 'embed_img').removeClass('hidden');
            $('#' + $(select).attr('first') + 'embed_video').addClass('hidden');
        } else{
            $('#' + $(select).attr('first') + 'embed_video').addClass('hidden');
            $('#' + $(select).attr('first') + 'embed_img').addClass('hidden');
        }
    }
    catch (e) {
        alert('setEmbed: ' + e.message);
    }
}
/**
 * get data of letter follow language
 *
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referLetterLang(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/letter/refer-letter',
            dataType    :   'json',
            data        :   {
                id      :   $('#id').val()
            ,   lang    :   $('#language-trans').val()
            }, 
            success: function(res) {
                if(res.status){
                    setDataTrans(_objTrans, res.data); //javascript/common/custom.js
                }
            }
        });
    }
    catch (e) {
        alert('referLetterLang: ' + e.message);
    }
}
/**
 * saveLetter
 *
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveLetter(){
    try{
        var err1 = validateModule.validate(_obj);
        var err2 = validateFile(1);
        if(err1 && err2){
            $('#content').val(CKEDITOR.instances.content.getData());
            $('#form-letter-main').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            window.location = '/admin/letter/edit?id=' + res.id;
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
        alert('saveLetter: ' + e.message);
    }
}
/**
 * save data translate of letter
 *
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveTransLetter(){
    try{
        var err1 = validateModule.validate(_objTrans);
        var err2 = validateFile(2);
        if(err1 && err2){
            $('#trans_content').val(CKEDITOR.instances.trans_content.getData());
            $('#form-letter-trans').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            $('[tabindex=10]').focus();
                        });
                    }
                    else{
                        jMessage(7, function(){
                            $('[tabindex=10]').focus();
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
        alert('saveTransLetter: ' + e.message);
    }
}
/**
 * delete aletter
 *
 * @author      :   quypn - 2017/08/18 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteLetter(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/letter/delete',
            dataType    :   'json',
            data        :   {
                id      :   $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/letters';
                    });
                }
                else{
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    }
    catch(e){
        alert('deleteLetter: ' + e.message);
    }
}
/**
 * check rate of image
 *
 * @author      :   quypn - 2017/09/21 - create
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