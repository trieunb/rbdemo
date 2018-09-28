/*
 * ****************************************************************************
 *  BrsE School
 *  Event
 *
 *  Creator     :   ANS804 - Daonx – daonx@ans-asia.com
 *  Date        :   2017/08/08
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
    // COMMON : init
    initializeEvents();
    initEvents();

    // ALBUM : init
    initializeAlbum();
    initEventsAblum();

    // QUESTION : init
    initializeQuestion();
    initEventsQuestion();

    // EventTime : init
    initializeEventTime();
    initEventTime();
});

/**
 * initializeEvents
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initializeEvents() {
    showPopupEventNearest();
}

/**
 * initEvents
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initEvents(){
    try {
        $(document).on('click', '.event-time-slide .content', function(){
            $('.event-time-slide .content').removeClass('slick-current');
            $(this).addClass('slick-current');
        });

        // event
        $(document).on('click', '.event-time-slide .content .refer-date',function(){
            // count down
            var date = $(this).data('date');

            $("#count-down-detail .box .days").countdown(date, function(event) {
                $(this).text(
                    event.strftime('%D')// %D days %H:%M:%S
                );
            });

            $("#count-down-detail .box .hours").countdown(date, function(event) {
                $(this).text(
                    event.strftime('%H')// %D days %H:%M:%S
                );
            });

            $("#count-down-detail .box .minutes").countdown(date, function(event) {
                $(this).text(
                    event.strftime('%M')// %D days %H:%M:%S
                );
            });

            $("#count-down-detail .box .seconds").countdown(date, function(event) {
                $(this).text(
                    event.strftime('%S')// %D days %H:%M:%S
                );
            });

            // set title
            var title = $(this).data('title');
            $('#e-op-b-wrap .title').text(title);

            // set event id for button regist
            var eventId = $(this).data('id');
            var eventLink = $(this).data('link');
            $('#regist-attend .button-regist').attr('data-event-id',eventId);
            $('#regist-attend .button-regist').attr('data-event-link',eventLink);

            // set event id for button regist
            $('#regist-attend .button-event-detail').attr('data-event-id',eventId);
            $('#regist-attend .button-event-detail').attr('data-event-link',eventLink);

            // compare with time now
            var dateChoosed = $(this).data('date');
            if (new Date(dateChoosed).getTime() > new Date().getTime()) {
                $('#regist-attend button.button-regist').show();
            } else {
                $('#regist-attend button.button-regist').hide();
            }

            // date choose
            $(document).find('.event-time-slide .content .refer-date').attr("data-date-choose", '0');
            $(this).attr("data-date-choose", '1');
        });

        // close popup
        $(document).on('click','.wrap-show-event-nearest .close',function(){
            closePopupEvent();
        });

        // click img banner => show form regist attend
        $(document).on('click', '.banner-event-nearest',function() {
            var event_id        = parseInt($(this).attr('data-event-id'));
            var fromEventDetail = false;

            closePopupEvent();
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/regist-event/' + $(this).attr('data-event-link'));
            showRegistEvent(event_id, fromEventDetail);
        });
    } catch (e) {
        console.log('initEvents: ' + e.message);
    }
}

/**
 * initializeAlbum
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initializeAlbum(){
    initSlickForAlbum();
}

/**
 * initEventsAblum
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initEventsAblum(){
    $('.alb-slide').on('breakpoint', function(event, slick, breakpoint){
        $('.alb-slide').slick('unslick');
        // reset margin left, right
        $('.alb-slide .alb-slide-img').css({
            'margin-left' : 0,
            'margin-right': 0
        });

        initSlickForAlbum();
    });

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            alwaysShowClose     : false,
            showArrows          : true,
            onShow              : function(){
                //hide scroll of body
                $('body').css('overflow-y', 'hidden');
            },
            onHide              : function(){
                //show scroll of body
                $('body').css('overflow-y', 'auto');
            }
        });
    });
}

/**
 * initializeQuestion
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initializeQuestion(){
    var widthWindow    = $(window).outerWidth(true);

    if(widthWindow <= 1024) {
        initSlickForQuestion(1);
    } else {
        initSlickForQuestion();
    }
}

/**
 * initEventsQuestion
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initEventsQuestion(){
    // $('.qst-sld-ct-wrap').hover(function(){
    //     var $this = $(this);

    //     // QUESTION - TAG
    //     // $this.find('.qst-sld-ct-question').css({
    //     //     'overflow-y' : 'hidden'
    //     // });

    //     // ASKED - TAG
    //     setTimeout(function(){
    //         $this.find('.qst-sld-ct-ask').css({
    //             'overflow-y' : 'auto'
    //         });
    //     },700);
    //                         }, function() {
    //     var $this = $(this);

    //     // ASKED - TAG
    //     $this.find('.qst-sld-ct-ask').css({
    //         'overflow-y' : 'hidden'
    //     });

    //     // QUESTION - TAG
    //     // setTimeout(function(){
    //     //     $this.find('.qst-sld-ct-question').css({
    //     //         'overflow-y' : 'auto'
    //     //     });
    //     // },700);
    // });
    $('.qst-slide').on('breakpoint', function(event, slick, breakpoint){
        $('.qst-slide').slick('unslick');
        // get width window
        var widthWindow    = $(window).outerWidth(true);

        if(widthWindow <= 1024) {
            initSlickForQuestion(1);
        } else {
            initSlickForQuestion();
        }
    });

    // check device
    // if phone ==> add event click
    // unless   ==> add event hover
    if( isDevices ) {
        $('.qst-sld-ct-wrap').on('click', function(){
            transformTagQuestions($(this));
        });
    } else {
        $('.qst-sld-ct-wrap').on('mouseenter', function(){
            transformTagQuestions($(this));
        });

        $('.qst-sld-ct-wrap').on('mouseleave', function(){
            transformTagQuestions($(this));
        });
    }
}

/**
 * initializeEventTime
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initializeEventTime(){
    initSlickForEventTime();
}

/**
 * initEventTime
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initEventTime(){
    try {
        $('.event-time-slide').on('click','.content .refer-date', function(){
            $('.event-time-slide .content').removeClass('slick-current')
            $(this).parent('.content').addClass('slick-current')
        });

        // click button .button-regist
        $(document).on('click', '.button-regist', function(event) {
            var event_id        = parseInt($(this).attr('data-event-id'));
            var fromEventDetail = false;
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/regist-event/' + $(this).attr('data-event-link'));
            showRegistEvent(event_id, fromEventDetail);
        });

        // click button .button-event-detail
        $(document).on('click', '.button-event-detail', function(event) {
            $('#event-detail').empty();
            var event_id = parseInt($(this).attr('data-event-id'));
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/event-detail/' + $(this).attr('data-event-link'));
            showEventDetail(event_id);
        });
    } catch (e) {
        console.log('initEventTime: ' + e.message);
    }
}

/**
 * initSlickForAlbum
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initSlickForAlbum(){
    try {
        $('.alb-slide').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            prevArrow: $('#e-btn-left'),    
            nextArrow: $('#e-btn-right'),
            rows: 2,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 7,
                        slidesToScroll: 7,
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 415,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 321,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    } catch (e) {
        console.log('initSlickForAlbum: ' + e.message);
    }
}

/**
 * initSlickForQuestion
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initSlickForQuestion(rows){
    try {
        rows = (!!rows) ? rows : 2;

        $('.qst-slide').slick({
            dots: true,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows:false,
            // appendDots:$(".Slick-Navigation"),
            rows: rows,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3   
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 415,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 321,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    } catch (e) {
        console.log('initSlickForQuestion: ' + e.message);
    }
}

/**
 * initSlickForEventTime
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function initSlickForEventTime(){
    try {
        var eleFocus = $('.event-time-slide .content .refer-date[data-select="1"]').last();
        if(eleFocus.length == 0) {
            eleFocus = $('.event-time-slide .content .refer-date').first();
        }

        $('.event-time-slide').slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows:true,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        initialSlide:eleFocus.parent('.content').index()
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        initialSlide:eleFocus.parent('.content').index()
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide:eleFocus.parent('.content').index()
                    }
                },
                {
                    breakpoint: 321,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide:eleFocus.parent('.content').index()
                    }
                }
            ]
        });

        // refer countdown
        eleFocus.trigger('click');
    } catch (e) {
        console.log('initSlickForEventTime: ' + e.message);
    }
}

/**
 * transformTagQuestions
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function transformTagQuestions(e) {
    try {
        if(parseInt(e.find('.qst-sld-ct-question').attr('data-show'))) {
            e.find('.qst-sld-ct-question').css({
                                                'transform':'rotateY(180deg)',
                                                '-webkit-transform':'rotateY(180deg)',
                                                '-moz-transform':'rotateY(180deg)',
                                                '-ms-transform':'rotateY(180deg)',
                                            });
            e.find('.qst-sld-ct-answer').css({
                                                'transform':'rotateY(0deg)',
                                                '-webkit-transform':'rotateY(0deg)',
                                                '-moz-transform':'rotateY(0deg)',
                                                '-ms-transform':'rotateY(0deg)',
                                            });
            e.find('.qst-sld-ct-question').attr('data-show',0);

        } else {
            e.find('.qst-sld-ct-question').css({
                                                'transform':'rotateY(0deg)',
                                                '-webkit-transform':'rotateY(0deg)',
                                                '-moz-transform':'rotateY(0deg)',
                                                '-ms-transform':'rotateY(0deg)',
                                            });
            e.find('.qst-sld-ct-answer').css({
                                                'transform':'rotateY(180deg)',
                                                '-webkit-transform':'rotateY(180deg)',
                                                '-moz-transform':'rotateY(180deg)',
                                                '-ms-transform':'rotateY(180deg)',
                                            });
            e.find('.qst-sld-ct-question').attr('data-show',1);
        }
    } catch (e) {
        console.log('transformTagQuestions: ' + e.message);
    }
}

/**
 * showPopupEventNearest
 *
 * @author      :   Daonx  - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function showPopupEventNearest() {
    try {
        if (!!parseInt($('#view-popup-event').val())) {
            //Edit by Quypn 2017/08/31
            $('#popup-event').addClass('show');
            // $.ajax({
            //     type        : 'POST',
            //     url         : '/home/show-popup-event-nearest',
            //     dataType    : 'json',
            //     success     : function(res) {
            //         if(res.status){
            //             //create html
            //             $('#popup-event').html(res.html);
            //             //hide scroll of body
            //             $('body').css('overflow-y', 'hidden');
            //             //show popup
            //             $('#popup-event').addClass('show');
            //         } else {
            //             console.log('showPopupEventNearest: ' + res.error);
            //         }
            //     }
            // });
            //End edit by Quypn 2017/08/31
        }
    } catch (e) {
        console.log('showPopupEventNearest: ' + e.message);
    }
}

/**
 * closePopupEvent
 *
 * @author      :   Daonx - 2017/08/22 - create
 * @param       :   event_id
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function closePopupEvent(){
    try {
        //hide popup
        $('#popup-event').removeClass('show');
        //show scroll of body
        $('body').css('overflow-y', 'auto');
    } catch (e) {
        console.log('closePopupEvent: ' + e.message);
    }
}


