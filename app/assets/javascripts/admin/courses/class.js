/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Class
    *
    * 処理概要      :   
    * 作成日        :   2017/08/29
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
,   'name'        : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 2, 'class': 'required', 'noname': true}}
,   'content'     : {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 3, 'class': 'required', 'noname': true}}
,   'target'      : {'type': 'input',     'attr': {'maxlength': 200, 'tabindex': 4, 'class': 'required', 'noname': true}}
,   'time'        : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 5, 'class': 'required', 'noname': true}}
,   'admission'   : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 6,                      'noname': true}}
,   'quantity'    : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 7,                      'noname': true}}
,   'opening'     : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 8,                      'noname': true}}
,   'study_time'  : {'type': 'input',     'attr': {'maxlength': 200, 'tabindex': 9,                      'noname': true}}
,   'price'       : {'type': 'input',     'attr': {'maxlength': 200, 'tabindex': 10,'class': 'required', 'noname': true}}
,   'curriculum'  : {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 11,'class': 'required', 'noname': true}}
,   'requirements': {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 12,'class': 'required', 'noname': true}}
,   'benefits'    : {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 12,                     'noname': true}}
// ,   'icon-name'   : {'type': 'input',     'attr': {'maxlength': 255,                'class': 'required', 'noname': true}}
}
var _objTrans = {
    'trans_title'       : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 21, 'class': 'required', 'noname': true}}
,   'trans_name'        : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 22, 'class': 'required', 'noname': true}}
,   'trans_content'     : {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 23, 'class': 'required', 'noname': true}}
,   'trans_target'      : {'type': 'input',     'attr': {'maxlength': 200, 'tabindex': 24, 'class': 'required', 'noname': true}}
,   'trans_time'        : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 25, 'class': 'required', 'noname': true}}
,   'trans_admission'   : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 26, 'noname': true}}
,   'trans_quantity'    : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 27, 'noname': true}}
,   'trans_opening'     : {'type': 'input',     'attr': {'maxlength': 100, 'tabindex': 28, 'noname': true}}
,   'trans_study_time'  : {'type': 'input',     'attr': {'maxlength': 200, 'tabindex': 29, 'noname': true}}
,   'trans_price'       : {'type': 'input',     'attr': {'maxlength': 200, 'tabindex': 30, 'class': 'required', 'noname': true}}
,   'trans_curriculum'  : {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 31, 'class': 'required', 'noname': true}}
,   'trans_requirements': {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 32, 'class': 'required', 'noname': true}}
,   'trans_benefits'    : {'type': 'CKEditor',  'attr': {'maxlength': 2000,'tabindex': 12, 'noname': true}}
}
var msg_err_file = 22;
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
 * @author      :   quypn - 2017/08/29 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
        CKEDITOR.replace( 'content', {
            height: 300
        });
        CKEDITOR.replace( 'curriculum', {
            height: 250
        });
        CKEDITOR.replace( 'requirements', {
            height: 250
        });
        CKEDITOR.replace( 'benefits', {
            height: 200
        });
        initItem(_obj);
        if(mode == 'U'){
            CKEDITOR.replace( 'trans_content', {
                height: 300
            });
            CKEDITOR.replace( 'trans_curriculum', {
                height: 250
            });
            CKEDITOR.replace( 'trans_requirements', {
                height: 250
            });
            CKEDITOR.replace( 'trans_benefits', {
                height: 200
            });
            initItem(_objTrans);
        }
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
 * @author      :   quypn - 2017/08/29 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('#language-trans').on('change', function(){
            referClassLang();
        });

        $('#title').on('change', function(){
            if (mode == 'I'){
                getBeautyID();
            }
        });

        $('#icon').on('click', function(e){
            $(this).val('');
            $('#icon-name').val('');
            console.log(_text);
            console.log(msg_err_file);
            console.log(_text[msg_err_file]);
            validateModule.clearErrorItem('#icon-name', _text[msg_err_file]);
            $('#img_preview').attr('src', '');
        });

        $('#icon').on('change', function(e){
            checkFile(e,'icon-name');

            isImage = checkTypeFile(e);

            if (isImage) {
                // $('#img_preview').css('width','400px');
                readImage(e.target.files[0],'width_height','img_preview');
            } else {
                $('#img_preview').css('width','0').attr('src','');
            }
        });

        $('#btn-save-class-trans').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    saveTransClass();
                }
            });
        });

        $('#btn-save-class').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    saveClass('width_height','icon-name');
                }
            });
        });

        $('#btn-delete-class').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteClass();
                }
            });
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * refer data translate of class
 *
 * @author      :   quypn - 2017/08/29 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referClassLang(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/courses/refer-class-trans',
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
 * check file choosen
 *
 * @author      :   quypn - 2017/08/29 - create
 * @author      :
 * @param       :   e - event change file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFile(e,inputNameImage){
    try{
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            $('#' + inputNameImage).val('');
            msg_err_file = 22
        } else {
            if(files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE){
                msg_err_file = 23;
            } else {
                msg_err_file = 0;
                // readImage(files[0],'','img_preview');
            }
            $('#' + inputNameImage).val(files[0].name);
        }
    } catch (e) {
        alert('checkFile: ' + e.message);
    }
}
/**
 * validate file before save
 *
 * @author      :   quypn - 2017/08/29 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function validateFile(){
    try{
        if(msg_err_file == 0){
            return true;
        }
        else{
            if(mode == 'I' || (mode == 'U' && msg_err_file == 23)){
                $('#icon-name').errorStyle(_text[msg_err_file]);
                return false;
            }
            else{
                return true;
            }
        }
    }
    catch (e) {
        alert('validateFile: ' + e.message);
    }
}
/**
 * save data translate of class
 *
 * @author      :   quypn - 2017/08/30 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveTransClass(){
    try{
        if(validateModule.validate(_objTrans)){
            $('#trans_content').val(CKEDITOR.instances.trans_content.getData());
            $('#trans_curriculum').val(CKEDITOR.instances.trans_curriculum.getData());
            $('#trans_requirements').val(CKEDITOR.instances.trans_requirements.getData());
            $('#trans_benefits').val(CKEDITOR.instances.trans_benefits.getData());
            $('#form-class-trans').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            $('#trans_title').focus();
                        });
                    }
                    else{
                        jMessage(7, function(){
                            $('#trans_title').focus();
                        });
                    }
                },
            });
        }
        else{
            validateModule.focusFirstError();
        }
    }
    catch (e) {
        alert('saveTransClass: ' + e.message);
    }
}
/**
 * crea or update data of class
 *
 * @author      :   quypn - 2017/08/30 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveClass(width_height,idImage){
    try{
        var widthImage    = $('#' + width_height).attr('data-width');
        var heightImage   = $('#' + width_height).attr('data-height');

        var checkRequired = validateModule.validate(_obj);
        var ratio         = checkRatio(widthImage,heightImage,idImage);

        if(ratio && checkRequired){
            $('#content').val(CKEDITOR.instances.content.getData());
            $('#curriculum').val(CKEDITOR.instances.curriculum.getData());
            $('#requirements').val(CKEDITOR.instances.requirements.getData());
            $('#benefits').val(CKEDITOR.instances.benefits.getData());
            $('#form-class-main').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            window.location = '/admin/courses/edit-class?id=' + res.id;
                        });
                    } else {
                        jMessage(res.msgNo, function(){
                            if(res.msgNo == 26){
                                $('#course_id').focus();
                            }
                            else{
                                $('#title').focus();
                            }
                        });
                    }
                },
            });
        } else {
            validateModule.focusFirstError();
        }
    } catch (e) {
        alert('saveClass: ' + e.message);
    }
}
/**
 * delete a class
 *
 * @author      :   quypn - 2017/08/30 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteClass(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/courses/delete-class',
            dataType    :   'json',
            data        :   {
                id      :   $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/courses/classes';
                    });
                }
                else{
                    jMessage(res.msgNo, function(){
                        $('#title').focus();
                    });
                }
            }
        });
    }
    catch (e) {
        alert('deleteClass: ' + e.message);
    }
}
/**
 * get beauty id to use in link from name of class
 *
 * @author      :   quypn - 2017/08/30 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function getBeautyID(){
    try{
        if($('#title').val() == ''){
            $('#beauty_id').val('');
        }
        var str = $('#title').val().toLowerCase().trim().replace(/ /g, "-");
        str     = getStringWithoutDiacritics(str);
        $('#beauty_id').val(str);
    }
    catch(e){
        alert('getBeautyID: ' + e.message);
    }
}
/**
 * checkRatio
 *
 * @author      :   daonx - 2017/11/02 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkRatio(width,height,id) {
    try {
        if (!width || !height) {
            if (mode == "I") {
                msg_err_file = 22;
                $('#' + id).errorStyle(_text[msg_err_file]);
                return false
            } else if (mode == "U") {
                return true
            }
        }

        var ratio     = parseFloat(width/height);

        var testHeight = (height = 126) ? true : false;
        var testRatio = (ratio >= 1.0237 && ratio <= 1.0239) ? true : false;

        if (testHeight && testRatio) {        
            return true;
        }

        msg_err_file = 27;
        $('#' + id).errorStyle(_text[msg_err_file]);

        return false;
    } catch (e) {
        console.log('checkRatio: ' + e.message);
    }
}
/**
 * checkTypeFile
 *
 * @author      :   daonx - 2017/08/29 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkTypeFile(e){
    try {
        if (!e == '') {
            var patternImage  = /(image\/png|image\/jpeg|image\/jpg)/g;
            var typeFile      = e.target.files[0].type;
            var isImage       = patternImage.test(typeFile);

            return isImage;
        }
    } catch(e) {
        console.log('checkTypeFile: ' + e);
    }
}