/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Add/Edit Media
    *
    * 処理概要      :   
    * 作成日        :   2017/09/05
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
    'icon_media'        : {'type': 'input', 'attr': {'maxlength': 255, 'noname': true}}
,   'logo_media'        : {'type': 'input', 'attr': {'maxlength': 255, 'noname': true}}
,   'url_media'         : {'type': 'input', 'attr': {'maxlength': 255, 'class': 'required', 'noname': true}}
,   'background'        : {'type': 'input', 'attr': {'maxlength': 7,   'class': 'required', 'noname': true}}
,   'note'              : {'type': 'input', 'attr': {'maxlength': 200, 'noname': true}}
};
if (mode == 'I') {
    var msg_err_file_icon      = 22;
    var msg_err_file_logo      = 22;
    var msg_err_file_url       = 22;
} else if (mode == 'U') {
    var msg_err_file_icon      = 0;
    var msg_err_file_logo      = 0;
    var msg_err_file_url       = 0;
}
var msg_err_file_url_img   = 0;
var msg_err_file_url_video = 0;
var file_video_url,
    file_img_url;

$(document).ready(function() {
    try {
        initializeAddEditMedia();
        initEventAddEditMedia();
    } catch(e) {
        console.log('ready: ' + e.message);
    }
});
/**
 * initializeAddEditMedia
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initializeAddEditMedia(){
    try {
        // set IME
        japanese.checkIME();

        // set color picker
        $('.background').colorpicker();

        // check format
        changeFormat();

        initItem(_obj);

        autoTabindexForm();

        setTabIndexMenu();

        // focus item first
        $('[tabindex=1]').focus();
    } catch(e) {
        console.log('initializeAddEditMedia: ' + e.message);
    }
}

/**
 * initEventAddEditMedia
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventAddEditMedia(){
    try {
        // Icon
        $('#icon_media_upload').on('change', function(e){
            var type;
            if (e.target.files.length) {
                type = e.target.files[0].type || e.dataTransfer.files[0].type;
            }
            // check size
            checkFileUpload(e,'icon_media','icon');
            // preview image before upload
            previewImage(isImage(type), e, 'icon_preview', 'width_height_icon');
        });

        // Logo
        $('#logo_media_upload').on('change', function(e){
            var type;
            if (e.target.files.length) {
                type = e.target.files[0].type || e.dataTransfer.files[0].type;
            }
            // check size
            checkFileUpload(e,'logo_media','logo');
            // preview image before upload
            previewImage(isImage(type), e, 'logo_preview', 'width_height_logo');
        });

        // Url
        $('#url_media').on('change',function(){
            var format    = $('#format');
            var url_media = $('#url_media');
            if (format.val() == 1) {
                url_media.attr('data-name-file-web',url_media.val());
            }
        });

        $('#url_media_upload').on('change', function(e){
            var type;
            if (e.target.files.length) {
                type = e.target.files[0].type || e.dataTransfer.files[0].type;
            }
            // check size
            checkFileUploadForUrl(e,'url_media');
            // preview image before upload
            previewImage(isImage(type), e, 'url_preview', 'width_height_url');//(isImage(type) || isVideo(type))
        });

        $('#btn-save-media').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if (!validateModule.validate(_obj) || !!msg_err_file_icon || !!msg_err_file_logo || !!msg_err_file_url) {
                        if (!!msg_err_file_icon) { // Icon
                            $('#icon_media').errorStyle(_text[msg_err_file_icon]).focus();
                        }
                        if (!!msg_err_file_logo) { // Logo
                            $('#logo_media').errorStyle(_text[msg_err_file_logo]);
                        }
                        if (!!msg_err_file_url) { // Url
                            $('#url_media').errorStyle(_text[msg_err_file_url]);
                        }
                        
                        validateModule.focusFirstError();
                    } else {
                        saveMedia();
                    }
                }
            });
        });

        $('#btn-delete-media').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteMedia();
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

        $('#url_media').on('blur', function(){
            if ($('#url_media').val() != '') {
                validateModule.clearErrorItem('#url_media', msg_err_file_url);
                msg_err_file_url = 0;
            }
        });

        // background
        $('.colorpicker').on('click', function(){
            validateModule.clearErrorItem('#background', CONSTANTS.msgRequired);
        });

        // catch change of select box
        $('#format').on('change',changeFormat);
    } catch(e) {
        console.log('initEventAddEditMedia: ' + e.message);
    }
}

/**
 * changeFormat
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function changeFormat(){
    try {
        var format           = $('#format').val();
        var toggle_show      = $('.toggle_show');
        var url_preview      = $('#url_preview');
        var url_media        = $('#url_media');
        var url_media_upload = $('#url_media_upload');

        // clear error input
        clearErrorInput('#url_media');

        // url_media.attr('value',url_media.attr('data-name-file-video'));

        if (!!file_img_url) {
            url_media_upload[0].files = file_img_url;
        } else {
            msg_err_file_url_img = 22;
        }

        if (!!file_video_url) {
            url_media_upload[0].files = file_video_url;
        } else {
            msg_err_file_url_video = 22;
        }

        // format =>
        //          1: web
        //          2: video
        //          3: image
        if (format == 1) { // hide
            $('#url_media').parent().removeClass('input-group').addClass('form-group'); 

            toggle_show.hide();

            url_media.attr("readonly",false);

            url_media.val(url_media.attr('data-name-file-web'));
            url_media.attr('value',url_media.attr('data-name-file-web'));

            if(url_media.val()) {
                // set message
                msg_err_file_url = 0;
            } else {
                // set message error for url
                msg_err_file_url = 1;
            }
        } else { // show img preview
            toggle_show.show();

            $('#url_media').parent().removeClass('form-group').addClass('input-group');

            url_media.attr("readonly","readonly");

            if (mode == 'I') {
                url_media.val('');
            }

            if (format == 2) {
                url_preview.attr('src','')
                // set file accept video type
                url_media_upload.attr('accept','.mp4');

                if (!!file_video_url) {
                    // set name
                    url_media.val(file_video_url[0].name);
                    url_media.attr('value',file_video_url[0].name);
                } else {
                    // set name file
                    url_media.val(url_media.attr('data-name-file-video'));
                    url_media.attr('value',url_media.attr('data-name-file-video'));
                }
                // set message error for video
                msg_err_file_url = msg_err_file_url_video;
            } else if (format == 3) {
                // set file accept video type
                url_media_upload.attr('accept','.jpg,.png,.jpeg');

                if (!!file_img_url) {
                    // set name
                    url_media.val(file_img_url[0].name);
                    url_media.attr('value',file_img_url[0].name);
                    // preview img
                    readImage(file_img_url[0],'','url_preview');
                    // show img
                    url_preview.show().css('height','auto');
                } else {
                    // set name file
                    url_media.val(url_media.attr('data-name-file-img'));
                    url_media.attr('value',url_media.attr('data-name-file-img'));
                }
                // set message error for img
                msg_err_file_url = msg_err_file_url_img;
            }
        }
    } catch(e) {
        console.log('changeFormat: ' + e.message);
    }
}

/**
 * check size file choosen
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   e - event change file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFileUpload(e,inputNameImage,item){
    try {
        var files = e.target.files || e.dataTransfer.files || '';

        if (files == '' || !files.length) {
            $('#' + inputNameImage).val('');

            if (item === 'icon') {
                msg_err_file_icon = 22; // You must choose file.
            } else if (item === 'logo') {
                msg_err_file_logo = 22; // You must choose file.
            }
        } else {
            var size  = files[0].size;
            var type  = files[0].type;
            // clear erorr
            if (item === 'icon') {
                validateModule.clearErrorItem('#' + inputNameImage, _text[msg_err_file_icon]);
            } else if (item === 'logo') {
                validateModule.clearErrorItem('#' + inputNameImage, _text[msg_err_file_logo]);
            }

            if (!isImage(type)){// check img
                if (item === 'icon') {
                    msg_err_file_icon = 28;// Only allow file .jpg or .jpeg or png.
                } else if (item === 'logo') {
                    msg_err_file_logo = 28;// Only allow file .jpg or .jpeg or png.
                }
            } else if (size/1024/1024 > MAX_SIZE_FILE_IMAGE) {// check size
                if (item === 'icon') {
                    msg_err_file_icon = 23;// Size of file can not exceed 10MB.
                } else if (item === 'logo') {
                    msg_err_file_logo = 23;// Size of file can not exceed 10MB.
                }
            } else {
                if (item === 'icon') {
                    msg_err_file_icon = 0;
                } else if (item === 'logo') {
                    msg_err_file_logo = 0;
                }
            }

            $('#' + inputNameImage).val(files[0].name);
        }
    } catch(e) {
        console.log('checkFileUpload: ' + e.message);
    }
}

/**
 * check size file choosen
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   e - event change file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFileUploadForUrl(e,inputNameImage){
    try {
        // format =>
        //          1: web
        //          2: video
        //          3: image
        var format = $('#format').val();
        var files  = e.target.files || e.dataTransfer.files;
        var type   = files.length ? files[0].type : undefined;

        // check isset file
        if (!files.length) {
            $('#' + inputNameImage).val('');
            msg_err_file_url = 22
            if (format == 2) {
                // set cache file video
                file_video_url   = '';
                // set data video backup
                $('#' + inputNameImage).attr('data-name-file-video','');
            } else if (format == 3) {
                // set cache file img
                file_img_url     = '';
                // set data img backup
                $('#' + inputNameImage).attr('data-name-file-img','');
            }
        } else {
            // set data-name-file and value file
            if (format == 2) {
                // clear erorr
                validateModule.clearErrorItem('#' + inputNameImage, _text[msg_err_file_url_video]);

                if (isVideo(type)) {//check video
                    $('#' + inputNameImage).attr('data-name-file-video',files[0].name);
                    // $('#' + inputNameImage).attr('value',files[0].name);
                    // set cache file video
                    file_video_url   = files;
                    // set message for video
                    msg_err_file_url_video = 0;
                    // check size
                    if (files[0].size/1024/1024 > MAX_SIZE_FILE_VIDEO) {
                        msg_err_file_url_video = 32;
                    }
                } else  {
                    $('#' + inputNameImage).attr('data-name-file-video','');
                    // set message for video
                    msg_err_file_url_video = 29;// Only allow file .mp4.
                }

                msg_err_file_url = msg_err_file_url_video
            } else if (format == 3) {
                // clear erorr
                validateModule.clearErrorItem('#' + inputNameImage, _text[msg_err_file_url_img]);

                if (isImage(type)) {//check img
                    $('#' + inputNameImage).attr('data-name-file-img',files[0].name);
                    // $('#' + inputNameImage).attr('value',files[0].name);
                    // set cache file img
                    file_img_url = files;
                    // set message for img
                    msg_err_file_url_img = 0;
                    // check size
                    if (files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE) {
                        msg_err_file_url_img = 23;
                    }
                } else {
                    $('#' + inputNameImage).attr('data-name-file-img','');
                    // set message for img
                    msg_err_file_url_img = 28;// Only allow file .jpg or .jpeg or .png.
                }

                msg_err_file_url = msg_err_file_url_img
            }
            
            $('#' + inputNameImage).val(files[0].name);
        }
    } catch(e) {
        console.log('checkFileUploadForUrl: ' + e.message);
    }
}

/**
 * preview image
 *
 * @author      :   daonx - 2017/09/05 - create
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
            $(document).find('#' + position).css('height','0');
        }
    } catch(e) {
        console.log('previewImage: ' + e.message);
    }
}

/**
 * isImage
 *
 * @author      :   daonx - 2017/09/05 - create
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
 * isVideo
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function isVideo(type){
    try {
        if (typeof type == 'undefined') return false;

        if (/mp4/.test(type)) {
            return true;
        }
        return false;
    } catch(e) {
        console.log('isVideo: ' + e.message);
    }
}

/**
 * autoTabindexForm
 *
 * @author      :   daonx - 2017/08/28 - create
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
 * saveMedia
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveMedia(){
    try {
        $('#form-media-main').ajaxSubmit({
            beforeSubmit: function(a,f,o) {
                o.dataType = 'json';
                o.async    = true;
                // o.cache    = false;
            },
            xhr: function() {
                if($('#percent-upload').hasClass('hidden')){
                    $('#percent-upload').removeClass('hidden');
                }
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress',progress , false); //custom.js
                }
                return myXhr;
            },
            success: function(responseText , textStatus) {
                var res = responseText;
                if(res.status){
                    jMessage(6, function(){
                        if (mode == 'I') {
                            if (res.id != null && res.id != '') {
                                window.location = '/admin/medias/edit?id=' + res.id;
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
    } catch(e) {
        console.log('saveMedia: ' + e.message);
    }
}

/**
 * delete amedia
 *
 * @author      :   daonx - 2017/09/05 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteMedia(){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/admin/medias/delete',
            dataType    :   'json',
            data        :   {
                    id      :   $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/media';
                    });
                } else {
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    } catch(e) {
        console.log('deleteMedia: ' + e.message);
    }
}

/**
 * clearErrorInput
 *
 * @author      :   daonx - 2017/08/28 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function clearErrorInput(item) {
    try {
        $(item).removeAttr("has-balloontip-message");
        $("#has-balloontip-class").remove();
        //remove class item-error
        $(item).removeClass('item-error');
    } catch(e) {
        console.log('clearErrorInput: ' + e.message);
    }
}