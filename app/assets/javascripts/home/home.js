/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - homepage
    *
    * 処理概要      :   
    * 作成日        :   2017/08/02
    * 作成者        :   quypn – quypn@ans-asia.com
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
var lang = 'vi'
var isDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//tab index for home page
var tabindexHomePage = {
    header              : 1,
    slide               : 2,
    different           : 3,
    media               : 4,
    courses             : 5,
    subscribe           : 6,
    album               : 7,
    event               : 8,
    question            : 9,
    footer              : 10,
    course_details      : 11,
    regist_advisory     : 12,
    event_detail        : 13,
    regist_courses      : 14,
    regist_event        : 15,
};

$( document ).ready(function() {
    var myLazyLoad = new LazyLoad({
            elements_selector: ".lazy-load",
            effect : "fadeIn"
        });
    // input keydown only-number
    $(document).on('keydown','input.only-number',function(event) {
        try {
            onlyNumberKeydown(event);
        } catch (e) {
            alert(e.message);
        }
    });
    //input blur only-number
    $(document).on('blur', 'input.only-number', function() {
        try {
            if (!validateNumber($(this).val())) {
                $(this).val('');
            }
        } catch (e) {
            alert(e.message);
        }
    });
    //blur .required
    $(document).on('blur', '.required', function(event) {
        try {
            if(($(this).is('select') && parseInt($(this).val()) < 1)
                || (!$(this).is('select') && $(this).val() == '')){
                // $(this).parents('.had-err').find('.err-required').addClass('show');
                // flag = false;
            } else {
                $(this).parents('.had-err').find('.err-required').removeClass('show');
            }
        } catch (e) {
            alert(e.message);
        }
    });
    //blur .email
    $(document).on('blur', '.email', function(event) {
        try {
            if($(this).val() && !checkEmail($(this).val())){
                // $(this).parents('.had-err').find('.msg.success').removeClass('show');
                // $(this).parents('.had-err').find('.err-email').addClass('show');
                // flag = false;
            } else {
                $(this).parents('.had-err').find('.err-email').removeClass('show');
            }
        } catch (e) {
            alert(e.message);
        }
    });
});
/**
 * get language in view by url
 *
 * @author      :   quypn - 2017/08/03 - create
 * @author      :
 * @return      :   string - code of language
 * @access      :   public
 * @see         :
 */
function getLang(){
    try{
        var url_string = window.location.href;
        if (url_string.indexOf('/ja') >= 0) {
            lang = 'ja';
            return;
        } else if (url_string.indexOf('/en') >= 0) {
            lang  = 'en';
            return;
        } else if (url_string.indexOf('/vi') >= 0){
            lang  = 'vi';
            return;
        }
        var regex = new RegExp("[?&]lang(=([^&#]*)|&|#|$)"),
        results = regex.exec(url_string);
        if (!results){
            lang = 'vi';
        } else if (!results[2]){
            lang = 'vi';
        }
        else{
            lang = decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        if(lang == null || lang == undefined || lang == '' || (lang != 'ja' && lang != 'en')){
            lang = 'vi';
        }
    }
    catch(e){
        alert('getLang: ' + e.message)
        lang = 'vi';
    }
    return lang;
}
getLang();
function validate(id) {
    try {
        flag = true;

        //validate Required
        var flag1 = validateRequired(id);
        
        //validate Maxlength
        var flag2 = validateMaxlength(id);
        
        //validate Email
        var flag3 = validateEmail(id);

        flag = flag1 && flag2 && flag3;

        return flag;
    } catch (e) {
        console.log('validate : ' + e.message);
    }
}
function validateRequired(id) {
    try {
        var flag = true;
        $('#' + id + ' .required:not(:disabled)').each(function(){
            if(($(this).is('select') && parseInt($(this).val()) < 1)
                || (!$(this).is('select') && $(this).val() == '')){
                $(this).parents('.had-err').find('.err-required').addClass('show');
                flag = false;
            } else {
                $(this).parents('.had-err').find('.err-required').removeClass('show');
            }
        });

        return flag;
    } catch (e) {
        console.log('validateRequired : ' + e.message);
    }
}
function validateMaxlength(id) {
    try {
        var flag = true;

        $('#' + id + ' .maxlength:not(:disabled)').each(function(){
            if($(this).val().length > $(this).attr('maxlength')){
                $(this).parents('.had-err').find('.err-maxlength').addClass('show');
                flag = false;
            } else {
                $(this).parents('.had-err').find('.err-maxlength').removeClass('show');
            }
        });

        return flag;
    } catch (e) {
        console.log('validateRequired : ' + e.message);
    }
}
function validateEmail(id) {
    try {
        var flag = true;

        $('#' + id + ' .email').val($('#' + id + ' .email').val().trim());

        $('#' + id + ' .email:not(:disabled)').each(function(){
            if($(this).val() && !checkEmail($(this).val())){
                $(this).parents('.had-err').find('.err-email').addClass('show');
                flag = false;
            } else {
                $(this).parents('.had-err').find('.err-email').removeClass('show');
            }
        });

        return flag;
    } catch (e) {
        console.log('validateRequired : ' + e.message);
    }
}
function checkEmail(string) {
    if(string === '') {
        return false;
    }
    var patt = /^[\w-.+]+@[a-zA-Z0-9_-]+?\.[a-zA-Z0-9._-]*$/;
    return patt.test(string);
}
function onlyNumberKeydown(event) {
    var negativeEnabled = false;
    if ($(this).attr('negative')) {
        negativeEnabled = $(this).attr('negative');
    }
    // if (event.shiftKey) {
    // event.preventDefault();
    // }
    if (event.keyCode == 229) {
         $(this).val('');
    }
    if (event.keyCode == 53){
        return true;
    }
    if (!((event.keyCode > 47 && event.keyCode < 58)
            || (event.keyCode > 95 && event.keyCode < 106)
            || event.keyCode == 116
            || event.keyCode == 46
            || event.keyCode == 37
            || event.keyCode == 39
            || event.keyCode == 8 
            || event.keyCode == 9
            || event.ctrlKey // 20160404 - sangtk - allow all ctrl combination // 
            || event.keyCode == 229 // ten-key processing
            )
            // || event.shiftKey
            || (negativeEnabled == false
                    && event.keyCode == 189 || event.keyCode == 109)) {
        event.preventDefault();
    }
    if (negativeEnabled && (event.keyCode == 189 || event.keyCode == 109)) {
        var val         = $(this).val();
        var negative    = '-' + val.replace(/-/g, '');
        $(this).val(negative);
    }
}
function validateNumber(string) {
    try {
        var regexp = /^-*[0-9]+$/;
        if (regexp.test(string) || string == '') {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e.message);
    }
}
function clearError(id) {
    try {
        $('#' + id + ' .msg').each(function(){
            $(this).removeClass('show');
        });
    } catch (e) {
        console.log('clearError: ' + e.message);
    }
}
function focusFirstItemErr(id){
    try {
        $('#' + id + ' .msg.show').first().parents('.had-err').find('input,select,textarea').first().focus()
    } catch (e) {
        console.log('clearError: ' + e.message);
    }
}