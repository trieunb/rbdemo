/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Add/Edit Slide
    *
    * 処理概要      :   
    * 作成日        :   2017/08/24
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
    'img_slide'          : {'type': 'input', 'attr': {'maxlength': 255, 'class': 'required', 'noname': true}}
,   'link'               : {'type': 'input', 'attr': {'maxlength': 255, 'class': 'required', 'noname': true}}
}
var _obj1 = {
    'link'               : {'type': 'input', 'attr': {'maxlength': 255, 'class': 'required', 'noname': true}}
}
var _objTrans = {
//    'trans_img_slide'    : {'type': 'input', 'attr': {'maxlength': 255, 'class': 'required', 'noname': true}}
   'trans_link'          : {'type': 'input', 'attr': {'maxlength': 255, 'noname': true}}
}
var isImage      = true;
var isImageTrans = true;
var msg_err_file = 22;

$(document).ready(function() {
    try {
        initializeAddEditSlide();
        initEventAddEditSlide();
    }
    catch(e){
        console.log('ready: ' + e.message);
    }
});
/**
 * initializeAddEditSlide
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initializeAddEditSlide(){
    try {
        japanese.checkIME();

        if (mode == "I") {
            initItem(_obj);
        } else if (mode == 'U'){
            initItem(_obj1);
            initItem(_objTrans);
        }

        setTabIndexMenu();

        $('[tabindex=1]').focus();

        // checkTypeFile('');
    } catch(e) {
        console.log('initializeAddEditSlide: ' + e.message);
    }
}

/**
 * initEventAddEditSlide
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventAddEditSlide(){
    try {
        //////////////////// MAIN //////////////////////
        // change upload image
        $('#img_slide_upload').on('change', function(e){
            checkFile(e,'img_slide');

            isImage = checkTypeFile(e);

            if (isImage) {
                // $('#img_preview').css('width','400px');
                readImage(e.target.files[0],'width_height','img_preview');
            } else {
                $('#img_preview').css('width','0').attr('src','');
            }
        });

        // clear text #img_slide
        $('#img_slide_upload').on('click', function(e){
            $(this).val('');
            $('#img_slide').val('');
            validateModule.clearErrorItem('#img_slide', _text[msg_err_file]);
        });

        // save main
        $('#btn-save-slide').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if (isImage) {
                        saveSlide('width_height','img_slide');
                    } else {
                        msg_err_file = 28;
                        $('#img_slide').errorStyle(_text[msg_err_file]).focus();
                        _balloontipMouseover('', jQuery($('#img_slide')));
                    }
                    
                }
            });
        });

        //////////////////// TRANS //////////////////////
        // change upload image trans
        $('#trans_img_slide_upload').on('change', function(e){
            checkFile(e,'trans_img_slide');

            isImageTrans = checkTypeFile(e);
            
            if (isImageTrans) {
                // $('#img_preview_trans').css('width','400px');
                readImage(e.target.files[0],'width_height_trans','img_preview_trans');
            } else {
                $('#img_preview_trans').css('width','0').attr('src','');
            }
        });

        // clear text #trans_img_slide
        $('#trans_img_slide_upload').on('click', function(e){
            $(this).val('');
            $('#trans_img_slide').val('');
            validateModule.clearErrorItem('#trans_img_slide', _text[msg_err_file]);
        });

        // change language
        $('#language-trans').on('change', function(){
            referSlideLang();
        });

        // save trans
        $('#btn-save-trans-slide').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if (isImageTrans) {
                        saveTransSlide('width_height_trans','trans_img_slide');
                    } else {
                        msg_err_file = 28;
                        $('#trans_img_slide').errorStyle(_text[msg_err_file]).focus();
                        _balloontipMouseover('', jQuery($('#trans_img_slide')));
                    }
                }
            });
        });

        // delete row
        $('#btn-delete-slide').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteSlide();
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
        console.log('initEventAddEditSlide: ' + e.message);
    }
}

/**
 * check file choosen
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   e - event change file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFile(e,inputNameImage){
    try {
        var files = e.target.files || e.dataTransfer.files;

        if (!files.length) {
            $('#' + inputNameImage).val('');
            msg_err_file = 22
        } else {
            if(files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE){
                msg_err_file = 23;
            } else {
                msg_err_file = 0;
            }
            $('#' + inputNameImage).val(files[0].name);
        }
    } catch(e) {
        console.log('checkFile: ' + e.message);
    }
}

/**
 * validate file before save
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function validateFile(){
    try {
        if (msg_err_file == 0){
            return true;
        } else {
            if(mode == 'I' || (mode == 'U' && msg_err_file == 23)){
                $('#img_slide').errorStyle(_text[msg_err_file]);
                return false;
            } else {
                return true;
            }
        }
    }
    catch (e) {
        console.log('validateFile: ' + e.message);
    }
}

/**
 * validate file trans before save
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function validateFileTrans(){
    try {
        if (msg_err_file == 0){
            return true;
        } else {
            if(mode == 'I' || (mode == 'U' && msg_err_file == 23)){
                $('#trans_img_slide').errorStyle(_text[msg_err_file]);
                return false;
            } else {
                return true;
            }
        }
    }
    catch (e) {
        console.log('validateFileTrans: ' + e.message);
    }
}

/**
 * get data of slide follow language
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referSlideLang(){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/admin/slides/refer-slide',
            dataType    :   'json',
            data        :   {
                id      :   $('#id').val()
            ,   lang    :   $('#language-trans').val()
            }, 
            success: function(res) {
                if(res.status){
                    setPreview('#img_preview_trans','#trans_img_slide',res.data.img);
                    $('#trans_link').attr('src', res.data.link);
                }
            }
        });
    }
    catch (e) {
        console.log('referSlideLang: ' + e.message);
    }
}

/**
 * saveSlide
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveSlide(width_height,idImage){
    try {
        // var link = $('#link').val();
        var widthImage  = $('#' + width_height).attr('data-width');
        var heightImage = $('#' + width_height).attr('data-height');

        var objCheck    = '';
        var err1        = false;
        var err2        = false;
        var err3        = checkRatio(widthImage,heightImage,idImage);

        if (mode == "I") { // check required and check file
            objCheck = _obj;
            err1     = validateModule.validate(objCheck);
            err2     = validateFile();
        } else if (mode == "U") { // just check required
            objCheck = _obj1;
            err1     = validateModule.validate(objCheck);
            err2     = true;
        }

        if (err1 && err2 && err3) {
            //$('#content').val(CKEDITOR.instances.content.getData());
            $('#form-slide-main').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                success: function(responseText , textStatus) {
                    var res = responseText;
                    if(res.status){
                        jMessage(6, function(){
                            if (mode == 'I') {
                                if (res.id != null && res.id != '') {
                                    window.location = '/admin/slides/edit?id=' + res.id;
                                } else {
                                    window.location = window.location;
                                }
                            } else {
                                window.location = window.location;
                            }
                        });
                    } else {
                        jMessage(7, function(){
                            $('[tabindex=1]').focus();
                        });
                    }
                },
            });
        } else {
            validateModule.focusFirstError();
        }
    } catch(e) {
        console.log('saveSlide: ' + e.message);
    }
}

/**
 * save data translate of slide
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveTransSlide(width_height,idImage){
    try {
        var widthImage  = $('#' + width_height).attr('data-width');
        var heightImage = $('#' + width_height).attr('data-height');

        var err1        = validateModule.validate(_objTrans);
        var err2        = validateFileTrans();
        var err3        = checkRatio(widthImage,heightImage,idImage);

        if(err1 && err2 && err3){
           // $('#trans_content').val(CKEDITOR.instances.trans_content.getData());
            $('#form-slide-trans').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                success: function(responseText, textStatus) {
                    var res = responseText;
                    if (res.status) {
                        jMessage(6, function(){
                            window.location = window.location;
                            $('#language-trans').focus();
                        });
                    } else {
                        jMessage(7, function(){
                            $('#language-trans').focus();
                        });
                    }
                },
            });
        } else {
            validateModule.focusFirstError();
        }
    } catch(e) {
        console.log('saveTransSlide: ' + e.message);
    }
}

/**
 * checkRatio
 *
 * @author      :   daonx - 2017/08/29 - create
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

        var testWidth = (width >= 994) ? true : false;
        var testRatio = (ratio >= 2.76 && ratio <= 2.77) ? true : false;

        if (testWidth && testRatio) {        
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

/**
 * delete aslide
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteSlide(){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/admin/slides/delete',
            dataType    :   'json',
            data        :   {
                    id      :   $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/slides';
                    });
                } else {
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    } catch(e) {
        console.log('deleteSlide: ' + e.message);
    }
}