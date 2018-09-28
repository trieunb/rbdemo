/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Add/Edit Event
    *
    * 処理概要      :   
    * 作成日        :   2017/09/15
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
    'title'     : {'type': 'input',     'attr': {'maxlength': 100, 'class': 'required', 'noname': true}},
    'detail'    : {'type': 'CKEditor',  'attr': {                  'class': 'required', 'noname': true}},
    'start'     : {'type': 'input',     'attr': {'maxlength': 16,  'class': 'required', 'noname': true}},
    'end'       : {'type': 'input',     'attr': {'maxlength': 16,  'class': 'required', 'noname': true}},
    'place'     : {'type': 'input',     'attr': {'maxlength': 200, 'class': 'required', 'noname': true}},
}
var _objTrans = {
    'trans_title'     : {'type': 'input',     'attr': {'maxlength': 100, 'class': 'required', 'noname': true}},
    'trans_detail'    : {'type': 'CKEditor',  'attr': {                  'class': 'required', 'noname': true}},
    'trans_start'     : {'type': 'input',     'attr': {'maxlength': 16,  'noname': true}},
    'trans_end'       : {'type': 'input',     'attr': {'maxlength': 16,  'noname': true}},
    'trans_place'     : {'type': 'input',     'attr': {'maxlength': 200, 'class': 'required', 'noname': true}},
}

var msg_err_file_img = 22;
var notErrDay        = true;

// declare variables for event details
var mainImg          = [];
var thumb            = [];
var count            = 0;

var ids              = [];

$(document).ready(function() {
    try {
        initializeAddEditEvent();
        initEventAddEditEvent();
    } catch(e){
        console.log('ready: ' + e.message);
    }
});
/**
 * initializeAddEditEvent
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initializeAddEditEvent(){
    try {
        // set IME
        japanese.checkIME();

        // ckeditor
        CKEDITOR.replace( 'detail', {
            height: 350
        });

        // set datetime
        if($('.datepicker').length > 0){
            $('.datepicker').datetimepicker({
                format: 'YYYY/MM/DD HH:mm',
                locale: locale
            });
        }

        if (mode == "I") {
            initItem(_obj);
        } else if (mode == 'U'){
            // ckeditor
            CKEDITOR.replace( 'trans_detail', {
                height: 350
            });
            initItem(_obj);
            initItem(_objTrans);
        }

        $(document).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox({
                alwaysShowClose     : false,
                showArrows          : true,
                // onShow              : function(){
                //     //hide scroll of body
                //     $('body').css('overflow-y', 'hidden');
                // },
                // onHide              : function(){
                //     //show scroll of body
                //     $('body').css('overflow-y', 'auto');
                // }
            });
        });

        autoTabindexForm();

        setTabIndexMenu();

        $('[tabindex=1]').focus();

    } catch(e) {
        console.log('initializeAddEditEvent: ' + e.message);
    }
}

/**
 * initEventAddEditEvent
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventAddEditEvent(){
    try {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // EVENT
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // MAIN - Upload image 
        $('#img_event_upload').on('change', function(e){
            var type;
            if (e.target.files.length) {
                type = e.target.files[0].type || e.dataTransfer.files[0].type;
            }
            // check size
            checkFileUpload(e, 'img_event', 'img_preview');
            // preview image upload
            previewImage(isImage(type), e, 'img_preview', '');
        });

        // MAIN - save event
        $('#btn-save-event').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if (mode == 'U' && $('#img_event').val() !== '') {
                        msg_err_file_img = 0;
                    }
                    if (validateModule.validate(_obj) && !msg_err_file_img && notErrDay) {
                        saveMedia();
                    } else {
                        if (!!msg_err_file_img) { // Icon
                            $('#img_event').errorStyle(_text[msg_err_file_img]).focus();
                        }
                        validateModule.focusFirstError();
                    }
                }
            });
        });

        // MAIN - check date from to
        $('#start, #end').on('blur', function(){
            checkErrDay();
        });
        
        // TRANS - Upload image 
        $('#trans_img_event_upload').on('change', function(e){
            var type;
            if (e.target.files.length) {
                type = e.target.files[0].type || e.dataTransfer.files[0].type;
            }
            // check size
            checkFileUpload(e, 'trans_img_event', 'trans_img_preview');
            // preview image upload
            previewImage(isImage(type), e, 'trans_img_preview', '');
        });

        // TRANS - update event
        $('#btn-save-trans-event').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if (validateModule.validate(_objTrans)) {
                        saveTransMedia();
                    } else {
                        validateModule.focusFirstError();
                    }
                }
            });
        });

        $('#btn-delete-event').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteEvent();
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

        // change language
        $('#language-trans').on('change', function(){
            referEventLang();
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // EVENT DETAILS
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // change image event detail
        $(document).on('change', '#upload_image_event_detail', function(e){
            genFileUpload(e);
        });

        $(document).on('ifChanged','.choose-img', function(){
            selectedItem(this);
        });

        // delete thumbail and image
        $(document).on('click', '.delete-thumb-image', function(){
            var e = this;
            jMessage(8, function(r){
                if(r){
                    deleteThumbImage(e);
                }
            });
        });

        // delete all thumbail and image
        $('#delete_all').on('click', function(){
            if(ids.length == 0){
                jMessage(13, function(){
                });
                return;
            }
            jMessage(8, function(r){
                if(r){
                    deleteAllThumbImage();
                }
            });
        });

        // delete image event detail
        $(document).on('click', '.delete-img', function(e){
            deletePreview(this);
        });

        // upload
        $('#upload').on('click', function(){
            // if not have data then return error
            if(mainImg.length == 0){
                jMessage(13, function(){
                    $('[tabindex=1]').focus();
                });
                return;
            }
            jMessage(5, function(r){
                if(r){
                    uploadImageEventDetails();
                }
            });
        });

        // resize window
        $(window).resize(function() {
            resizePreviewImg();
        });

        $('#title').on('change', function(){
            getBeautyID();
        });

        // $('img').on('error', function(){
        //     console.log('111111111');
        // });
    } catch(e) {
        console.log('initEventAddEditEvent: ' + e.message);
    }
}

/**
 * checkFileUpload
 * @author      :
 * @param       :   e - event change file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFileUpload(e,inputNameImage,preview){
    try {
        var files = e.target.files || e.dataTransfer.files;
        var size  = (files.length && files[0] && files[0].size) ? files[0].type : 0;
        var type  = (files.length && files[0] && files[0].type) ? files[0].type : undefined;

        if (!files.length) {
            $('#' + inputNameImage).val('');
            msg_err_file_img = 22; // You must choose file.
            $('#' + preview)[0].src = ''
        } else {
            // clear erorr
            validateModule.clearErrorItem('#' + inputNameImage, _text[msg_err_file_img]);

            if (!isImage(type)){// check img
                msg_err_file_logo = 28;// Only allow file .jpg or .jpeg or png.
            } else if (size/1024/1024 > MAX_SIZE_FILE_IMAGE) {// check size
                msg_err_file_img = 23;// Size of file can not exceed 10MB.
            } else {
                msg_err_file_img = 0;
            }

            $('#' + inputNameImage).val(files[0].name);
        }
    } catch(e) {
        console.log('checkFileUpload: ' + e.message);
    }
}

/**
 * previewImage
 * @author      :   daonx - 2017/09/15 - create
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
            $('#' + position).css('height','');
        }
    } catch(e) {
        console.log('previewImage: ' + e.message);
    }
}

/** 
 * isImage
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
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveMedia(){
    try {
        $('#detail').val(CKEDITOR.instances.detail.getData());
        $('#form-event-main').ajaxSubmit({
            beforeSubmit: function(a,f,o) {
                o.dataType = 'json';
                o.async    = true;
                // o.cache    = false;
            },
            success: function(responseText , textStatus) {
                var res = responseText;
                if(res.status){
                    jMessage(6, function(){
                        if (mode == 'I') {
                            if (res.id != null && res.id != '') {
                                window.location = '/admin/events/edit?id=' + res.id;
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
 * saveTransMedia
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveTransMedia(){
    try {
        $('#trans_detail').val(CKEDITOR.instances.trans_detail.getData());
        $('#form-event-trans').ajaxSubmit({
            beforeSubmit: function(a,f,o) {
                o.dataType = 'json';
                o.async    = true;
                // o.cache    = false;
            },
            success: function(responseText , textStatus) {
                var res = responseText;
                if(res.status){
                    jMessage(6, function(){
                        if (mode == 'I') {
                            if (res.id != null && res.id != '') {
                                window.location = '/admin/events/edit?id=' + res.id;
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
 * delete aevent
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteEvent(){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/admin/events/delete',
            dataType    :   'json',
            data        :   {
                    id      :   $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/events';
                    });
                } else {
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    } catch(e) {
        console.log('deleteEvent: ' + e.message);
    }
}

/**
 * check date from and date to
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkErrDay(){
    try{
        var data_from = $('#start');
        var data_to   = $('#end');
        if(data_from.val() > data_to.val() && data_from.val() != '' && data_to.val() != ''){
            data_from.errorStyle(_text[3]);
            data_to.errorStyle(_text[3]);
            notErrDay = false;
        }
        else{
            validateModule.clearErrorItem($('#start'), _text[3]);
            validateModule.clearErrorItem($('#end'), _text[3]);
            notErrDay = true;
        }
    } catch(e){
        console.log('checkErrDay: ' + e.message);
    }
}

/**
 * get data of event follow language
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referEventLang(){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/admin/events/refer-event',
            dataType    :   'json',
            data        :   {
                id   :   $('#id').val()
            ,   lang :   $('#language-trans').val()
            }, 
            success: function(res) {
                if(res.status){
                    var start      = new Date(res.data.start);
                    var dateStart  = start.toLocaleDateString('ja',{year:'numeric',month:'2-digit',day:'2-digit'}) + ' ' + start.toLocaleTimeString('ja',{hour:'2-digit',minute:'2-digit'});
                    res.data.start = dateStart;
                    
                    var end        = new Date(res.data.end);
                    var dateEnd    = end.toLocaleDateString('ja',{year:'numeric',month:'2-digit',day:'2-digit'}) + ' ' + end.toLocaleTimeString('ja',{hour:'2-digit',minute:'2-digit'});
                    res.data.end   = dateEnd;

                    // set preview image
                    setPreview('#trans_img_preview','#trans_img_event',res.data.image);

                    setDataTrans(_objTrans,res.data); //javascript/common/custom.js
                }
            }
        });
    } catch (e) {
        console.log('referSlideLang: ' + e.message);
    }
}

/**
 * render file user choose to view
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @params      :   event - event choose file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function genFileUpload(event){
    try{
        var files      = event.target.files || event.dataTransfer.files;
        var fileLength = files.length;
        // if user had choose files
        if (fileLength) {
            if (fileLength > 12){
                jMessage(31, function(){
                });
                return;
            }

            var sumSize = 0;

            for (var i = 0; i < fileLength; i++){
                sumSize += files[i].size/1024/1024;
            }

            if (sumSize > MAX_SIZE_FILE_IMAGE){
                jMessage(30, function(){
                });
                return;
            }

            // reset view
            count   = 0;
            mainImg = [];

            $('.preview-img').html('');
            $('.div-crop').html('');

            // render file by file
            for(var i = 0; i < fileLength; i++){
                var file = files[i];
                // ignore file have size larger 10MB
                if(file.size/1024/1024 <= MAX_SIZE_FILE_IMAGE){
                    preview(file, count++);
                }
            }
        }
    } catch(e){
        console.log('genFileUpload: ' + e.message);
    }
}

/**
 * set height for div of preview image and crop image
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @params      :   file - file need to render to view
 * @params      :   id - index of file in list files user had choosen
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function preview(file, id){
    try{
        var reader = new FileReader();
        // read file
        reader.onload = function (e) {
            var image = new Image();
            // read image
            image.onload = function(ev) {
                // create canvat to resize
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var width, height, thumbSize = 200;
                // calculation size of image resize
                if (image.height < image.width){
                    height = thumbSize;
                    width  = thumbSize*image.width/image.height;
                } else{
                    width  = thumbSize;
                    height = thumbSize*image.height/image.width;
                }
                canvas.width  = width;
                canvas.height = height;
                // resize with canvat
                ctx.drawImage(image, 
                    0, 0, image.width, image.height, 
                    0, 0, canvas.width, canvas.height
                );
                // set info of file
                var imgInfo = {
                    id: id,
                    name: file.name,
                    data: e.target.result, // mail file image
                    thumb: canvas.toDataURL() // image after resize
                };

                appendPreview(imgInfo);
            };
            image.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } catch(e){
        console.log('preview: ' + e.message);
    }
}

/**
 * render info of file to html
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @params      :   imgInfo - object have info of file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function appendPreview(imgInfo){
    try{
        // html of image review
        var html1 = '<div class="item-img col-sm-3" style="background-image: url(' + imgInfo.data + ')">' +
                        '<i class="fa fa-times-circle delete-img" id-img="' + imgInfo.id + '" aria-hidden="true"></i>' +
                    '</div>';
        $('.preview-img').append(html1);
        // html of image crop (thumb)
        var html2 = '<div class="crop-item col-sm-3 crop-item' + imgInfo.id + '">' +
                        '<img class="image' + imgInfo.id + '" src="' + imgInfo.thumb + '" />' +
                    '</div>';
        $('.div-crop').append(html2);
        // reset size for div container
        resizePreviewImg();
        // innit cropper
        var cropper = $('.crop-item' + imgInfo.id + ' .image' + imgInfo.id).cropper({
            aspectRatio: 1,
            zoomable: false,
            autoCropArea: 1,
            cropBoxResizable: false
        });
        // set view
        if(!$('.div-upload').hasClass('had-file')){
            $('.div-upload').addClass('had-file');
            $('#title-thumb').removeClass('hidden');
        }

        imgInfo.cropper = cropper;
        mainImg.push(imgInfo);
    } catch(e){
        console.log('appendPreview: ' + e.message);
    }
}

/**
 * set height for div of preview image and crop image
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @params      :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function resizePreviewImg(){
    try{
        $('.item-img').css('width', '');
        $('.crop-item').css('height', '');
        $('.item-img').css('width', $('.item-img').first().innerWidth() - 10);
        $('.item-img').css('height', $('.item-img').first().innerWidth()*9/16);
        $('.crop-item').css('height', $('.crop-item').first().innerWidth()*9/16);
    } catch(e){
        console.log('resizePreviewImg: ' + e.message);
    }
}

/**
 * delete a file image and preview of it
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @params      :   btn - button delete of file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deletePreview(btn){
    try{
        var id = $(btn).attr('id-img');

        //delete image preview
        $(btn).parents('.item-img').remove();

        //delete image crop
        $('.crop-item' + id).remove();

        //if not have file then reset
        if($('.item-img').length == 0){
            $('.div-upload').removeClass('had-file');
            $('.upload_file_event_detail').val('');
            $('#title-thumb').addClass('hidden');
        }

        //delete info of file
        for(var i = 0, length = mainImg.length; i < length; i++){
            if(mainImg[i].id + '' == id){
                mainImg.splice(i, 1);
                break;
            }
        }
    } catch(e){
        console.log('deletePreview: ' + e.message);
    }
}

/**
 * upload file user choosen to server
 *
 * @author      :   daonx - 2017/09/15 - create
 * @author      :
 * @params      :   btn - button delete of file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function uploadImageEventDetails(){
    try{
        // copy array info of file to another array
        var photos = [];
        for(var i = 0, length = mainImg.length; i < length; i++){
            photos.push(mainImg[i]);
            photos[i].thumb   = photos[i].cropper.cropper('getCroppedCanvas').toDataURL(); // get data crop
            photos[i].cropper = null;
        }
       // console.log(photos);
        // upload
        $.ajax({
            type        :   'POST',
            url         :   '/admin/events/save-photos',
            dataType    :   'json',
            data        :   {
                    photos  :   photos,
                    id      :   $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(6, function(){
                        window.location = '/admin/events';
                    });
                } else {
                    jMessage(7, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    } catch(e){
        console.log('uploadImageEventDetails: ' + e.message);
    }
}

/**
 * select item photo
 *
 * @author      :   daonx   - 2017/09/15 - create
 * @author      :
 * @param       :   checkbox - checkbox had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function selectedItem(checkbox){
    try{
        var idx = ids.indexOf($(checkbox).val());
        if(idx > -1){
            ids.splice(idx, 1);
        }
        else{
            ids.push($(checkbox).val());
        }
        $(checkbox).parents('.img-item').removeClass('selected');
        for(var i = 0, length = ids.length; i < length; i++){
            $('.item' + ids[i]).addClass('selected');
        }
    } catch(e){
        console.log('selectedItem: ' + e.message);
    }
}

/**
 * delete thumb and image
 *
 * @author      :   daonx   - 2017/09/15 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteThumbImage(ele){
    try{
        var id = [];
        id.push($(ele).attr('id-thumb-img'));
        
        $.ajax({
            type        :   'POST',
            url         :   '/admin/events/delete-thumb-image',
            dataType    :   'json',
            data        :   {
                ids     :   id
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        $('.item' + id[0]).parent().remove();
                    });
                } else {
                    jMessage(10, function(){
                    });
                }
            }
        });
    } catch(e){
        console.log('deletePhotos: ' + e.message);
    }
}

/**
 * delete all thumb and image
 *
 * @author      :   daonx   - 2017/09/15 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteAllThumbImage(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/events/delete-thumb-image',
            dataType    :   'json',
            data        :   {
                ids     :   ids
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        for(var i = 0, length = ids.length; i < length; i++){
                            $('.item' + ids[i]).parent().remove();
                        }
                        ids = [];
                    });
                } else {
                    jMessage(10, function(){
                    });
                }
            }
        });
    } catch(e) {
        console.log('deleteAllThumbImage: ' + e.message);
    }
}

/**
 * get beauty id to use in link from title of event
 *
 * @author      :   quypn - 2017/09/20 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function getBeautyID(){
    try{
        if($('#title').val() == ''){
            $('#beauty-id').val('');
        }
        var str = $('#title').val().toLowerCase().trim().replace(/ /g, "-");
        str     = getStringWithoutDiacritics(str);
        $('#beauty-id').val(str);
    }
    catch(e){
        alert('getBeautyID: ' + e.message);
    }
}