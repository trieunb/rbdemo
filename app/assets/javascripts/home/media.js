/*
 * ****************************************************************************
 *  BrsE School
 *  Media
 *
 *  Creator     :   ANS804 - Daonx – daonx@ans-asia.com
 *  Date        :   2017/08/04
 *
 *  Editor      :
 *  Date        :
 *
 *  @package     :   
 *  @copyright   :   Copyright (c) ANS-ASIA
 *  @version     :   1.0.0
 * ****************************************************************************
 */
$(document).ready(function(){
    initalizeMedia();
    initEventsMedia();

});

/**
 * initialize
 *
 * @author      :   Daonx  - 2017/08/04 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initalizeMedia(){
    cssDirectionOpenLid();
}

/**
 * initEvents
 *
 * @author      :   Daonx  - 2017/08/04 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initEventsMedia(){
    $(window).resize(function(){
        cssDirectionOpenLid();
    });

    // trigger click media when click description
    if ($(window).outerWidth(true) <= 768) {
        $('.description').on('click',function(){
            $(this).find('.media-link').trigger('click');
        });
    }

    // show media
    $('.media-link').on('click',function(e) {
        var link   = $(this).data('href');
        var format = $(this).data('format');
        var title  = $(this).data('title');
        if (format === 1) {
            if (/ios/i.test(navigator.userAgent)) {
                window.location.href = link;
            } else {
                showWeb(link);
            }
            
        } else if (format === 2) {
            showVideo(link,title);
        } else {
            showImg(link);
        }
        e.stopPropagation();
        e.preventDefault();
    });

    // empty modal after hidden
    $('#mediaModal').on('hidden.bs.modal', function () {
        $('#mediaModal .modal-body').empty();
    });
}

/**
 * cssDirectionOpenLid
 *
 * @author      :   Daonx  - 2017/08/04 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function cssDirectionOpenLid() {
    var transfromOriginCenterTop    = transformOrigin('center','top');
    var transfromOriginCenterBottom = transformOrigin('center','bottom');

    if ($(window).outerWidth(true) > 768) {
        if ($('.wrap-button').length > 6) {
            $('.wrap-button').find('.des-lid').css(transfromOriginCenterTop);
        } else {
            $('.wrap-button:lt(3)').find('.des-lid').css(transfromOriginCenterTop);
            $('.wrap-button:gt(2)').find('.des-lid').css(transfromOriginCenterBottom);
        }
    } //else {
        //$('.wrap-button').find('.des-lid').css(transfromOriginCenterTop);
    //}
}

/**
 * transformOrigin
 *
 * @author      :   Daonx  - 2017/08/04 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function transformOrigin(x,y) {
    var text = {
        'transform-origin'          : x + ' ' + y,
        '-webkit-transform-origin'  : x + ' ' + y,
        '-moz-transform-origin'     : x + ' ' + y,
        '-o-transform-origin'       : x + ' ' + y,
        '-ms-transform-origin'      : x + ' ' + y,
    };
    return text;
}

/**
 * showWeb
 *
 * @author      :   Daonx  - 2017/08/04 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function showWeb(link) {
    try {
        // image loader
        callWaiting();

        $('#mediaModal .modal-body').empty();
        // declare direction
        var src          = '<input width="100%" class="form-control" type="text" value="'+link+'">' ;

        // get height and height window
        var heightWindow = $(window).outerHeight(true);
        var widthWindow  = $(window).outerWidth(true);
        // console.log(widthWindow);
        // console.log(0.9*widthWindow);
        // set width and height for modal

        // if($(window).outerWidth(true) > 320) {
            widthMediaModal  = 0.9*widthWindow;
            heightMediaModal = 0.9*heightWindow;
        // } else {
        //     widthMediaModal  = widthWindow;
        //     heightMediaModal = heightWindow;
        // }

        $('#mediaModal .modal-dialog').css({
            'width'  : widthMediaModal,
            'height' : heightMediaModal
        });

        // set width and height for Iframe
        var heightIframe = 0.9*$('#mediaModal .modal-dialog').outerHeight() - 15;

        // add iframe
        src += '<iframe width="100%" height="'+heightIframe+'" src="'+link+'" frameborder="0" allowfullscreen></iframe>';
        // show html
        $('#mediaModal .modal-body').html(src);

        // show modal (bootstrap)
        $('#mediaModal').modal('show');        

        // close loader
        closeWaiting();
    } catch (e) {
        console.log('showWeb: ' + e.message);
    }
}

/**
 * showVideo
 *
 * @author      :   Daonx  - 2017/08/04 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 * vtv8: http://vtv.vn/video/ban-tin-16h-24-02-2017-205462.htm
 */
function showVideo(link,title) {
    try {
        // image loader
        callWaiting();

        var widthModal;
        var widthWindow = $(window).outerWidth(true);

        if(widthWindow <= 1024 && widthWindow > 480) {
            widthModal = '90%';
        } else if (widthWindow <= 480) {
            widthModal = '100%';
        } else {
            widthModal = '50%';
        }
        $('#mediaModal .modal-dialog').css('width',widthModal);
        var src = '<h3 class="text-center">' + title + '</h3>' ;
            src += '<video autoplay="" width="100%" name="media" controls loop><source src="'+link+'" type="video/mp4"></video>';

        // show html
        $('#mediaModal .modal-body').html(src);
        
        // show modal (bootstrap)
        $('#mediaModal').modal('show');

        // close loader
        closeWaiting();
    } catch (e) {
        console.log('showImg: ' + e.message);
    }
}

/**
 * showImg
 *
 * @author      :   Daonx  - 2017/08/04 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function showImg(link) {
    try {
        // image loader
        callWaiting();

        // Window: width, height
        var widthWindow  = $(window).outerWidth(true);
        var heightWindow = $(window).outerHeight(true);

        if($(window).outerWidth(true) >= 1366) {
            var widthModal   = 0.7*widthWindow;
            var heightModal  = 0.7*heightWindow;
        } else {
            var widthModal   = 0.9*widthWindow;
            var heightModal  = 0.9*heightWindow;
        }
        
        // Image: width
        var widthImg     = widthModal - 60;

        // set width and height for Modal
        $('#mediaModal .modal-dialog').css({
            'width'  : widthModal,
            'height' : heightModal
        });

        src = '<image class="modal-img" src="'+link+'" style="width:'+widthImg+'px">';

        // show html
        $('#mediaModal .modal-body').html(src);

        // show modal (bootstrap)
        $('#mediaModal').modal('show');

        $('#mediaModal').animate({
            scrollTop : $( '#mediaModal' ).height()
        },1500);

        // close loader
        closeWaiting();
    } catch (e) {
        console.log('showImg: ' + e.message);
    }
}
