/**
 * ****************************************************************************
 * BRSE-SCHOOL
 * HOME - regist event
 *
 * 処理概要      :   
 * 作成日        :   2017/08/14
 * 作成者        :   havv – havv@ans-asia.com
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

var _objRegistEvent = {
    'regist_event_nm'                   :   {'nameColDb':'name'},
    'regist_event_phone'                :   {'nameColDb':'phone'},
    'regist_event_email'                :   {'nameColDb':'email'},
};

var _event_id = -1;
var _fromEventDetail = false;

$( document ).ready(function() {
    try{
        initRegistEvent();
        initEventRegistEvent();
    } catch (e) {
        alert('readyRegistEvent: ' + e.message);
    }
});

/**
 * initRegistEvent
 *
 * @author      :   havv - 2017/08/14 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initRegistEvent(){
    try{
        showRegistEventFromLink();
    } catch (e) {
        alert('initRegistEvent: ' + e.message);
    }
}

/**
 * initEventRegistEvent
 *
 * @author      :   havv - 2017/08/14 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventRegistEvent(){
    try{
        //click button .btn-regist-event-close
        $(document).on('click', '.btn-regist-event-close', function(event) {
            hideRegistEvent();
        });

        //click button #btn-regist-event
        $(document).on('click', '#btn-regist-event', function(event) {
            var _validate = validate('regist-event-form');

            if (_validate) {
                //regist advisory
                postRegistEvent();
            } else {
                focusFirstItemErr('regist-event-form');
            }
        });
    } catch (e) {
        alert('initEventRegistEvent: ' + e.message);
    }
}

/**
 * show popup Regist Event from link
 *
 * @author      :   havv - 2017/08/15 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showRegistEventFromLink(){
    try{
        var id = parseInt($('#view-regist-event-from-link').val());

        if(id > 0){
            gotoSection($('#menu-courses')); // header.js
            showRegistEvent(id);
        }
    } catch (e) {
        alert('showRegistEventFromLink: ' + e.message);
    }
}

/**
 * show popup Regist Event
 *
 * @author      :   havv - 2017/08/14 - create
 * @param       :   id - int - id of event
 * @param       :   fromEventDetail - bool
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showRegistEvent(id, fromEventDetail){
    try{
        _event_id = id;
        _fromEventDetail = fromEventDetail

        $.ajax({
            type        :   'POST',
            url         :   '/home/refer-event',
            dataType    :   'json',
            data        :   {
                id      :    _event_id
            }, 
            success: function(res) {
                if(res.status){
                    //create html
                    $('#regist-event').html(res.html);
                    //clear all item
                    clearAllItemRegistEvent();
                    //set tabindex
                    setTabindexRegistEvent(tabindexHomePage.regist_event);
                    //hide scroll of body
                    $('body').css('overflow-y', 'hidden');
                    //show popup
                    $('#regist-event').addClass('show');
                    //focus first item
                    $('#regist_event_nm').focus();
                }
            }
        });
    } catch (e) {
        alert('showRegistEvent: ' + e.message);
    }
}

/**
 * hide popup Regist Event
 *
 * @author      :   havv - 2017/08/14 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function hideRegistEvent() {
    try {
        //hide popup
        $('#regist-event').removeClass('show');

        if (!_fromEventDetail) {
            history.pushState(null, null, (locale == 'vi' ? '/' : ('/' + locale)));
            //show scroll of body
            $('body').css('overflow-y', 'auto');
        }else{
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/event-detail/' + $('.button-regist-attend').attr('data-event-link'));
        }
    } catch (e) {
        alert('showRegistEvent: ' + e.message);
    }
}

/**
 * clear all item and all msg
 *
 * @author      :   havv - 2017/08/14 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function clearAllItemRegistEvent() {
    try {
        //clear all item
        for (var key in _objRegistEvent) {
            $('#'+key).val('');
        }

        //clear checkbox
        $('div.div-checkbox input[type=checkbox]').prop('checked', false);

        //clear all error
        $('#regist-event p.msg').removeClass('show');
    } catch (e) {
        alert('clearAllItemRegistEvent: ' + e.message);
    }
}

/**
 * regist event
 *
 * @author      :   havv - 2017/08/15 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function postRegistEvent() {
    try {
        var data = getDataRegistEvent();

        $.ajax({
            type        :   'POST',
            url         :   '/home/regist-event',
            dataType    :   'json',
            data        :   data, 
            success: function(res) {
                if(res.status){
                    //clear all item
                    clearAllItemRegistEvent();

                    //show message success
                    showPopupMessage(true);

                    //focus first item
                    $('#regist_event_nm').focus();
                } else {
                    //show message fail
                    showPopupMessage(false);
                }
            }
        });
    } catch (e) {
        alert('postRegistEvent: ' + e.message);
    }     
}

/**
 * get data from screen
 *
 * @author      :   havv - 2017/08/15 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function getDataRegistEvent() {
    try {
        var arrCheckboxChecked = $("div.div-checkbox input[type=checkbox]:checked");

        var test_type = '';
        for (var i = 0; i < arrCheckboxChecked.length; i++) {
            test_type += $(arrCheckboxChecked[i]).val() + '|#|@';
        }

        var obj = {
            'event_id'          :   _event_id,
            'name'              :   $('#regist_event_nm').val().trim(),
            'email'             :   $('#regist_event_email').val().trim(),
            'phone'             :   $('#regist_event_phone').val().trim(),
            'test_type'         :   test_type,
            'status'            :   1, //New registration
        };

        return obj;
    } catch (e) {
        alert('getDataRegistEvent: ' + e.message);
    }  
}

/**
 * set tab index
 *
 * @author      :   havv - 2017/08/15 - create
 * @param       :   start - int - start index
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setTabindexRegistEvent(start) {
    try {
        //set tabindex for input text
        for (var key in _objRegistEvent) {
            $('#'+key).attr('tabindex', start);
        }

        //set tabindex for checkbox
        $('div.div-checkbox label').attr('tabindex', start);

        //set tabindex for button
        $('#btn-regist-event').attr('tabindex', start);
        $('.btn-regist-event-close').attr('tabindex', start);
    } catch (e) {
        alert('setTabindexRegistEvent: ' + e.message);
    }
}