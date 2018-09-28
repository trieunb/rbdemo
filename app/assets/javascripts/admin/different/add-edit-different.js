/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Add/Edit Different
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
var _obj = {
        'title'                 : {'type': 'input',     'attr': {'maxlength': 50,   'class': 'required', 'noname': true}}
    ,   'content'               : {'type': 'CKEditor',  'attr': {'maxlength': 1000, 'class': 'required', 'noname': true}}
    ,   'icon_different_upload' : {'type': 'input',     'attr': {'maxlength': 255,  'noname': true}}
}
var _obj1 = {
        'title'                 : {'type': 'input',     'attr': {'maxlength': 50,   'class': 'required', 'noname': true}}
    ,   'content'               : {'type': 'CKEditor',  'attr': {'maxlength': 1000, 'class': 'required', 'noname': true}}
}
var _objTrans = {
        'trans_title'           : {'type': 'input',     'attr': {'maxlength': 50,   'class': 'required', 'noname': true}}
    ,   'trans_content'         : {'type': 'CKEditor',  'attr': {'maxlength': 1000, 'class': 'required', 'noname': true}}
}

if (mode == 'I') {
    var msg_err_file = 22;
} else if(mode == 'U') {
    var msg_err_file = 0;
}


$(document).ready(function() {
    try{
        initializeDifferent();
        initEventDifferent();
    }
    catch(e){
        console.log('ready: ' + e.message);
    }
});
/**
 * initializeDifferent
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initializeDifferent(){
    try{
        CKEDITOR.replace( 'content', {
            height: 150
        });

        if (mode == 'I') {
            initItem(_obj);
        } else if(mode == 'U') {
            CKEDITOR.replace('trans_content', {
                height: 150
            });

            initItem(_obj1);
            initItem(_objTrans);
        }

        autoTabindexForm();

        setTabIndexMenu();

        $('[tabindex=1]').focus();
    } catch(e) {
        console.log('initializeDifferent: ' + e.message);
    }
}
/**
 * initEventDifferent
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventDifferent(){
    try {

        ///////////////////////--MAIN--///////////////////////
        // icon change
        $('#icon_different_upload').on('change', function(e){
            var type;
            if (e.target.files.length) {
                type = e.target.files[0].type || e.dataTransfer.files[0].type;
            }
            // check size
            checkFile(e);
            // preview image before upload
            previewImage(isImage(type), e, 'icon_preview', '');

        });

        // clear name file icon
        $('#icon_different_upload').on('click', function(e){
            $(this).val('');
            $('#icon_different').val('');
            validateModule.clearErrorItem('#icon_different', _text[msg_err_file]);
        });

        // refer data for language
        $('#language-trans').on('change', function(){
            referDifferentLang();
        });

        // save different(vi)
        $('#btn-save-different').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if(validateModule.validate(_obj) && msg_err_file === 0){
                        saveDifferent();
                    } else {
                        $('#icon_different').errorStyle(_text[msg_err_file]);
                        validateModule.focusFirstError();
                    }
                }
            });
        });


        ///////////////////////--TRANS--///////////////////////
        // save different(trans)
        $('#trans-btn-save-different').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if(validateModule.validate(_objTrans)){
                        saveTransDifferent();
                    } else {
                        validateModule.focusFirstError();
                    }
                }
            });
        });


        // Delete different
        $('#btn-delete-different').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteDifferent();
                }
            });
        });

        // catch event enter for button
        $('button').on('keypress',function(e){
            if (e.keyCode == 13) {
                var id = $(this).data('target');
                $("#" + id).trigger('click');
            }
        });
    } catch(e) {
        console.log('initEventDifferent: ' + e.message);
    }
}

/**
 * autoTabindexForm
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function autoTabindexForm(){
    try {
        var index = 0;
        $('.form_auto_tabindex:not(:disabled):not([readonly])').each(function(index,element){
            $(this).attr('tabindex',++index);
        });
    } catch (e) {
        console.log("autoTabindexForm: " + e.message);
    }
}
/**
 * check file choosen
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   e - event change file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFile(e){
    try{
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            $('#icon_different').val('');
            msg_err_file = 22
        } else {
            if(files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE){
                msg_err_file = 23;
            } else {
                msg_err_file = 0;
            }
            $('#icon_different').val(files[0].name);
        }
    } catch (e) {
        console.log('checkFile: ' + e.message);
    }
}
/**
 * saveDifferent
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveDifferent(){
    try{
        $('#content').val(CKEDITOR.instances.content.getData());
        $('#form-different-main').ajaxSubmit({
            beforeSubmit: function(a,f,o) {
                o.dataType = 'json';
            },
            success: function(responseText , textStatus) {
                var res = responseText;
                if(res.status){
                    jMessage(6, function(){
                        if (res.id == '') {
                           window.location = '/admin/differents'; 
                        } else {
                            window.location = '/admin/differents/edit?id=' + res.id;
                        }
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
    } catch(e) {
        console.log('saveDifferent: ' + e.message);
    }
}

/**
 * save data translate of different
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveTransDifferent(){
    try{
        $('#trans_content').val(CKEDITOR.instances.trans_content.getData());
        $('#form-different-trans').ajaxSubmit({
            beforeSubmit: function(a,f,o) {
                o.dataType = 'json';
            },
            success: function(responseText , textStatus) {
                var res = responseText;
                if(res.status){
                    jMessage(6, function(){
                        window.location = window.location;
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
    catch(e){
        console.log('saveTransDifferent: ' + e.message);
    }
}

/**
 * delete adifferent
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteDifferent(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/differents/delete',
            dataType    :   'json',
            data        :   {
                id : $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/differents';
                    });
                } else {
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    }
    catch(e){
        console.log('deleteDifferent: ' + e.message);
    }
}

/**
 * isImage
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function isImage(type){
    try {
        if (typeof type == 'undefined') return false;

        if (/(jpeg|jpg|png)/.test(type)) {
            return true;
        }
        return false;
    } catch(e) {
        console.log('isImage: ' + e.message);
    }
}

/**
 * preview image
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function previewImage(isImage, e, position, width_height){
    try {
        if (isImage) {
            $('#' + position).css('height','auto');
            readImage(e.target.files[0],width_height,position);
        } else {
            $('#' + position).css('height','0').attr('src','');
        }
    } catch(e) {
        console.log('previewImage: ' + e.message);
    }
}

/**
 * get data of different follow language
 *
 * @author      :   daonx - 2017/09/11 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referDifferentLang(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/differents/refer-different',
            dataType    :   'json',
            data        :   {
                id      :   $('#id').val()
            ,   lang    :   $('#language-trans').val()
            }, 
            success: function(res) {
                if(res.status){
                    setPreview('#trans_icon_preview','#trans_icon',res.data.icon);
                    setDataTrans(_objTrans, res.data);
                }
            }
        });
    }
    catch (e) {
        console.log('referDifferentLang: ' + e.message);
    }
}