/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Add Photos
    *
    * 処理概要      :   
    * 作成日        :   2017/09/11
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
var mainImg = [];
var thumb = [];
var count = 0;
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
 * @author      :   quypn - 2017/09/11 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
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
 * @author      :   quypn - 2017/09/11 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $(document).on('change', '.file', function(e){
            genFileUpload(e);
        });
        $(document).on('click', '.delete-img', function(e){
            deletePreview(this);
        });
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
                    uploadPhotos();
                }
            });
        })
        $(window).resize(function() {
            resizePreviewImg();
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * render file user choose to view
 *
 * @author      :   quypn - 2017/09/11 - create
 * @author      :
 * @params      :   event - event choose file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function genFileUpload(event){
    try{
        var files = event.target.files || event.dataTransfer.files;
        // if user had choose files
        if (files.length) {
            if (files.length > 12){
                jMessage(31, function(){
                });
            }
            var sumSize = 0;
            for (var i = 0, length = files.length; i < length; i++){
                sumSize += files[i].size/1024/1024;
            }
            if (sumSize > MAX_SIZE_FILE_IMAGE){
                jMessage(30, function(){
                });
                return;
            }
            // reset view
            count = 0;
            mainImg = [];
            $('.preview-img').html('');
            $('.div-crop').html('');
            // render file by file
            for (var i = 0, length = files.length; i < length; i++){
                var file = files[i];
                // ignore file have size larger 10MB
                if(file.size/1024/1024 <= MAX_SIZE_FILE_IMAGE){
                    preview(file, count++);
                }
            }
        }
    }
    catch(e){
        alert('genFileUpload: ' + e.message);
    }
}
/**
 * set height for div of preview image and crop image
 *
 * @author      :   quypn - 2017/09/11 - create
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
    }
    catch(e){
        alert('resizePreviewImg: ' + e.message);
    }
}
/**
 * set height for div of preview image and crop image
 *
 * @author      :   quypn - 2017/09/11 - create
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
                var width, height, thumbSize = 250;
                // calculation size of image resize
                if (image.height < image.width){
                    height = thumbSize;
                    width = thumbSize*image.width/image.height;
                }
                else{
                    width = thumbSize;
                    height = thumbSize*image.height/image.width;
                }
                canvas.width = width;
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
                    thumb: canvas.toDataURL(file.type, 0.2) // image after resize
                };
                appendPreview(imgInfo);
            };
            image.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
    catch(e){
        alert('preview: ' + e.message);
    }
}
/**
 * render info of file to html
 *
 * @author      :   quypn - 2017/09/11 - create
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
    }
    catch(e){
        alert('appendPreview: ' + e.message);
    }
}
/**
 * delete a file image and preview of it
 *
 * @author      :   quypn - 2017/09/11 - create
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
            $('.file').val('');
            $('#title-thumb').addClass('hidden');
        }
        //delete info of file
        for(var i = 0, length = mainImg.length; i < length; i++){
            if(mainImg[i].id + '' == id){
                mainImg.splice(i, 1);
                break;
            }
        }
    }
    catch(e){
        alert('deletePreview: ' + e.message);
    }
}
/**
 * upload file user choosen to server
 *
 * @author      :   quypn - 2017/09/12 - create
 * @author      :
 * @params      :   btn - button delete of file
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function uploadPhotos(){
    try{
        // copy array info of file to another array
        var photos = [];
        for(var i = 0, length = mainImg.length; i < length; i++){
            photos.push(mainImg[i]);
            photos[i].thumb = photos[i].cropper.cropper('getCroppedCanvas').toDataURL(); // get data crop
            photos[i].cropper = null;
        }
        // upload
        $.ajax({
            type        :   'POST',
            url         :   '/admin/albums/save-photos',
            dataType    :   'json',
            data        :   {
                photos  :   photos
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(6, function(){
                        window.location = '/admin/albums';
                    });
                }
                else{
                    jMessage(7, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    }
    catch(e){
        alert('uploadPhotos: ' + e.message);
    }
}