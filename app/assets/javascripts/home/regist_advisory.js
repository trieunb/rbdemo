/**
 * ****************************************************************************
 * BRSE-SCHOOL
 * HOME - regist advisory
 *
 * 処理概要      :   
 * 作成日        :   2017/08/09
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

var _objRegistAdvisory = {
    'regist_advisory_nm'                :   {'nameColDb':'name'},
    'regist_advisory_phone'             :   {'nameColDb':'phone'},
    'regist_advisory_email'             :   {'nameColDb':'email'},
    'regist_advisory_add'               :   {'nameColDb':'address'},
    'regist_advisory_education_level'   :   {'nameColDb':'education_level'},
    'regist_advisory_course_type'       :   {'nameColDb':'course_type'},
    'regist_advisory_content'           :   {'nameColDb':'message'},
};

$( document ).ready(function() {
    try{
        initRegistAdvisory();
        initEventRegistAdvisory();
    } catch (e) {
        alert('readyRegistAdvisory: ' + e.message);
    }
});

/**
 * initRegistAdvisory
 *
 * @author      :   havv - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initRegistAdvisory(){
        setTabindexRegistAdvisory(tabindexHomePage.regist_advisory);
    try{
    } catch (e) {
        alert('initRegistAdvisory: ' + e.message);
    }
}

/**
 * initEventRegistAdvisory
 *
 * @author      :   havv - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventRegistAdvisory(){
    try{
        //click button regist advisory
        $(document).on('click', '.btn-regist-advisory', function(){
            var _validate = validate('regist-advisory-controls');

            if (_validate) {
                //regist advisory
                postRegistAdvisory();
            } else {
                focusFirstItemErr('regist-advisory-controls');
            }
        });

        //click button close
        $(document).on('click', '.btn-regist-advisory-close', function(){
            //hide popup Regist Advisory
            showRegistAdvisory(false);
        });

        //change combobox
        $(document).on('change', 'select', function(){
            var value = $(this).val();

            if (value > -1) {
                $(this).addClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    } catch (e) {
        alert('initEventRegistAdvisory: ' + e.message);
    }
}

/**
 * show popup Regist Advisory
 *
 * @author      :   havv - 2017/08/09 - create
 * @param       :   isShow - bool
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showRegistAdvisory(isShow){
    try{
        if (isShow) {
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/regist-advisory');
            //clear all item
            clearAllItemRegistAdvisory();
            //hide scroll of body
            $('body').css('overflow-y', 'hidden');
            //show popup
            $('#regist-advisory').addClass('show');
            //focus first item
            $('#regist_advisory_nm').focus();
        } else {
            history.pushState(null, null, (locale == 'vi' ? '/' : ('/' + locale)));
            //hide popup
            $('#regist-advisory').removeClass('show');
            //show scroll of body
            $('body').css('overflow-y', 'auto');
        }
    } catch (e) {
        alert('showRegistAdvisory: ' + e.message);
    }
}

/**
 * regist Advisory
 *
 * @author      :   havv - 2017/08/10 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function postRegistAdvisory() {
    try {
        var data = getDataRegistAdvisory();

        $.ajax({
            type        :   'POST',
            url         :   '/home/regist-advisory',
            dataType    :   'json',
            data        :   data, 
            success: function(res) {
                if(res.status){
                    //clear all item
                    clearAllItemRegistAdvisory();

                    //show message success
                    showPopupMessage(true);

                    //focus first item
                    $('#regist_advisory_nm').focus();
                } else {
                    //show message fail
                    showPopupMessage(false);
                }
            }
        });
    } catch (e) {
        alert('postRegistAdvisory: ' + e.message);
    }     
}

/**
 * get data from screen
 *
 * @author      :   havv - 2017/08/10 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function getDataRegistAdvisory() {
    try {
        var education_level     =   $('#regist_advisory_education_level').val().trim();
        education_level         =   education_level == '-1' ? '' : education_level;

        var course_type         =   $('#regist_advisory_course_type').val().trim();
        course_type             =   course_type == '-1' ? '' : course_type;

        var obj = {
            'name'              :   $('#regist_advisory_nm').val().trim(),
            'address'           :   $('#regist_advisory_add').val().trim(),
            'email'             :   $('#regist_advisory_email').val().trim(),
            'phone'             :   $('#regist_advisory_phone').val().trim(),
            'status'            :   1, //New registration
            'message'           :   $('#regist_advisory_content').val().trim(),
            'education_level'   :   education_level,
            'course_type'       :   course_type,
        };

        return obj;
    } catch (e) {
        alert('getDataRegistAdvisory: ' + e.message);
    }  
}

/**
 * clear all item
 *
 * @author      :   havv - 2017/08/10 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function clearAllItemRegistAdvisory() {
    try {
        //clear all item
        for (var key in _objRegistAdvisory) {
            var isCombobox = $('#'+key).is('select');

            if (isCombobox) {
                //this is combobox
                $('#'+key).val('-1');
                $('#'+key).removeClass('selected');
            } else {
                //not combobox (input, textarea)
                $('#'+key).val('');
            }
        }

        //clear all error
        $('#regist-advisory p.msg').removeClass('show');
    } catch (e) {
        alert('clearAllItemRegistAdvisory: ' + e.message);
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
function setTabindexRegistAdvisory(start) {
    try {
        //set tabindex for input text
        for (var key in _objRegistAdvisory) {
            $('#'+key).attr('tabindex', start);
        }

        //set tabindex for button
        $('.btn-regist-advisory').attr('tabindex',start);
        $('.btn-regist-advisory-close').attr('tabindex',start);
    } catch (e) {
        alert('setTabindexRegistAdvisory: ' + e.message);
    }
}