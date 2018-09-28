/**
 * ****************************************************************************
 * BRSE-SCHOOL
 * HOME - Event detail
 *
 * 処理概要      :   
 * 作成日        :   2017/08/16
 * 作成者        :   Daonx – daonx@ans-asia.com
 *
 * 更新日        :
 * 更新者        :
 * 更新内容      :
 *
 * @package     :   HOME
 * @copyright   :   Copyright (c) ANS-ASIA
 * @version     :   1.0.0
 * ****************************************************************************
 */

$(document).ready(function() {
    initilizeEventDetail();
    initEventsOfEventDetail();
});

function initilizeEventDetail(){
    showEventDetailFromLink();
}

function initEventsOfEventDetail(){
    $(document).on('click','.button-close-event-detail',function(){
        closeEventDetail();
    });

    $(document).on('click','.button-regist-attend',function(){
        var event_id = parseInt($(this).attr('data-event-id'));
        var fromEventDetail = true;
        history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/regist-event/' + $(this).attr('data-event-link'));
        showRegistEvent(event_id, fromEventDetail);
    });
}

/**
 * showEventDetailFromLink
 *
 * @author      :   Daonx - 2017/08/16 - create
 * @param       :   
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showEventDetailFromLink(){
    try {
        var event_id = parseInt($('#view-event-detail-from-link').val());

        if(!!event_id){
            gotoSection($('#menu-courses')); // in file header.js
            showEventDetail(event_id);
        }
    } catch (e) {
        console.log('showEventDetailFromLink: ' + e.message);
    }
}

/**
 * show popup Event detail
 *
 * @author      :   Daonx - 2017/08/16 - create
 * @param       :   event_id
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showEventDetail(event_id){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/home/refer-event-detail',
            dataType    :   'json',
            data        :   {
                event_id    :   event_id
            }, 
            success     : function(res) {
                if(res.status){
                    // console.log(res.html);return;
                    //create html
                    $('#event-detail').html(res.html);
                    //hide scroll of body
                    $('body').css('overflow-y', 'hidden');
                    //show popup
                    $('#event-detail').addClass('show');
                    initSlickForEventDetail();
                } else {
                    console.log('showEventDetail: ' + res.error);
                }
            }
        });
    } catch (e) {
        console.log('showEventDetail: ' + e.message);
    }
}

/**
 * closeEventDetail
 *
 * @author      :   Daonx - 2017/08/16 - create
 * @param       :   event_id
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function closeEventDetail(){
    try {
        history.pushState(null, null, (locale == 'vi' ? '/' : ('/' + locale)));
        //hide popup
        $('#event-detail').removeClass('show');
        //show scroll of body
        $('body').css('overflow-y', 'auto');
    } catch (e) {
        console.log('closeEventDetail: ' + e.message);
    }
}

/**
 * initSlickForEventDetail
 *
 * @author      :   Daonx  - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initSlickForEventDetail(){
    try {
        $('.event-detail-slide-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.event-detail-slide-nav'
        });
        $('.event-detail-slide-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: $('#e-dt-btn-left'),    
            nextArrow: $('#e-dt-btn-right'),
            asNavFor: '.event-detail-slide-for',
            // centerMode: true,
            focusOnSelect: true,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 321,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    } catch (e) {
        console.log('initSlickForEventDetail: ' + e.message);
    }
}