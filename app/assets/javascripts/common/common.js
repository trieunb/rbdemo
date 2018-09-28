/**
 * ****************************************************************************
 * COMMON CODE
 * COMMON.JS
 * 
 * 処理概要		:	common.js
 * 作成日		:	2017/03/02
 * 作成者		:	ANS796 – tuannt@ans-asia.com
 * @package		:	MODULE NAME
 * @copyright	:	Copyright (c) ANS-ASIA
 * @version		:	1.0.0
 * ****************************************************************************
 */

/*** CONSTANTS GLOBAL ***/
/*** example get value  CONSTANTS.delimiter ***/
const CONSTANTS = {
    'delimiter'     : '|#|@',
    'dateOption'    : {locale: 'ja',format: 'YYYY/MM/DD', minDate: '1899', maxDate: '9999'},
    'ymOption'      : {locale: 'ja',format: 'YYYY/MM', minDate: '1899', maxDate: '9999'},
    'msgDuplicate'  : typeof(_text) != 'undefined' && _text[12]!=undefined?_text[12]:'',
    'msgEmail'   	: typeof(_text) != 'undefined' && _text[11]!=undefined?_text[11]:'',
    'msgRequired'   : typeof(_text) != 'undefined' && _text[1]!=undefined?_text[1]:'',
    'msgEmpty'      : typeof(_text) != 'undefined' && _text[13]!=undefined?_text[13]:'',
    'msgMaxlength'  : typeof(_text) != 'undefined' && _text[2]!=undefined?_text[2]:'',
    'msgURL'        : typeof(_text) != 'undefined' && _text[15]!=undefined?_text[15]:''
}



//
$(document).ready(function() {
	try {
        commonModule.init();
        //numeric class
        numericModule.init();
        //only-number class
        onlyNumberModule.init();
        //money Class
        moneyModule.init();
        //Decimal class
        decimalModule.init();
        //date Class
        try{
            dateModule.init();
        }catch(e){}
        //Time
        try{
            timeModule.init();
        }catch(e){}
	} catch (e) {
		console.log('ready' + e.message);
	}
});
/**
 * create numeric module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var numericModule = (function () {
    function numericInit() {
        //keydown numeric
        $(document).on('keydown','input.time48,input.time24,input.time,input.numeric',function(event) {
            commonModule.onlyTypeNumber(event);
        });
        //input blur numeric
        $(document).on('blur', 'input.numeric', function() {
            try {
                if (!numberModule.isNumber($(this).val())) {
                    $(this).val('');
                }
            } catch (e) {
                console.log(e.message);
            }
        });
    }
    return {
        init: numericInit
    };

})();
/**
 * create only-number module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var onlyNumberModule = (function () {
    function onlyNumberInit() {
        // input keydown only-number
        $(document).on('keydown','input.only-number',function(event) {
            try {
                commonModule.onlyNumberKeydown(event);
            } catch (e) {
                alert(e.message);
            }
        });
        //input blur only-number
        $(document).on('blur', 'input.only-number', function() {
            try {
                if (!numberModule.isNumber($(this).val())) {
                    $(this).val('');
                }
            } catch (e) {
                alert(e.message);
            }
        });
    }
    return {
        init: onlyNumberInit
    };

})();
/**
 * create money module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : 1.moneyModule.init()
             2.moneyModule.formatMoney('99999');
 * @access : public
 * @see :
 */
var moneyModule = (function () {
    function moneyInit() {
        // input keydown money
        $(document).on('keydown','input.money',function(event) {
            try {
                var negativeEnabled = false;
                if ($(this).attr('negative')) {
                    negativeEnabled = $(this).attr('negative');
                }
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
                        || event.ctrlKey //
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
               
            } catch (e) {
                console.log(e.message);
            }
        });
        // focus money item
        $(document).on('focus', 'input.money', function() {
            $(this).val($(this).val().replace(/,/g, ''));
            $(this).select();
        });
        // format money item
        $(document).on('blur', 'input.money', function() {
            if($(this).val() == ''){
                return;
            }
            var val = parseInt($(this).val());
            if (isNaN(val)) {
                $(this).val('');
                return;
            }
            $(this).val(formatMoney(val));
        });
    }
    function formatMoney(num) {
        var str = num.toString(), parts = false, output = [], i = 1, formatted = null;
        if (str.indexOf(".") > 0) {
            parts = str.split(".");
            str = parts[0];
        }
        str = str.split("").reverse();
        for (var j = 0, len = str.length; j < len; j++) {
            if (str[j] != ",") {
                output.push(str[j]);
                if (i % 3 == 0 && j < (len - 1)) {
                    output.push(",");
                }
                i++;
            }
        }
        formatted = output.reverse().join("");
        return (formatted.replace('-,', '-') + ((parts) ? "." + parts[1].substr(0, 2) : ""));
    }
    return {
        init: moneyInit,
        formatMoney: formatMoney
    };
})();
/**
 * create date module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return :   1. dateModule.init()
                2. dateModule.isYyyyMmDd('2017/03/13') = true
                3. dateModule.isYyyyMm('2017/01') = true
                4. dateModule.checkFromTo('2017/03/13', '2017/03/12') = false
 * @access : public
 * @see :
 */
var dateModule = (function () {
    function dateInit() {
        //formatDatepicker();
        //formatYearMonthPicker();

        //auto format date items when lose focus
        autoFormattingDate("input.datepicker");
        autoFormattingMonth("input.month");

        //input method for date class
        $(document).on('keydown','input.date, input.month',function(event) {
             //console.log(event.keyCode);
             if ((!((event.keyCode > 47 && event.keyCode < 58) // 0 ~
                     // 9
                     || (event.keyCode > 95 && event.keyCode < 106) // numpad
                     // 0 ~
                     // numpad
                     // 9
                     || event.keyCode == 116 // F5
                     || event.keyCode == 46 // del
                     || event.keyCode == 35 // end
                     || event.keyCode == 36 // home
                     || event.keyCode == 37 // ←
                     || event.keyCode == 39 // →
                     || event.keyCode == 8 // backspace
                     || event.keyCode == 9 // tab
                     || event.keyCode == 191 // forward slash
                     || event.keyCode == 92 // forward slash
                     || event.keyCode == 111 // divide
                     || (event.shiftKey && event.keyCode == 35) // shift
                     // +
                     // end
                     || (event.shiftKey && event.keyCode == 36) // shift
             // +
             // home
             || event.ctrlKey // allow all ctrl combination
             ))
                     || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude
             // Shift
             // +
             // [0~9]
             )
                 event.preventDefault();
        });

        // Add by Daonx - ANS804 - 2017/09/15
        //input method for date class
        $(document).on('keydown','input.datetime', function(event) {
            if  (
                   !(
                          (event.keyCode > 47 && event.keyCode < 58) // 0 ~
                        // 9
                        || (event.keyCode > 95 && event.keyCode < 106) // numpad
                        // 0 ~
                        // numpad
                        // 9
                        || event.keyCode == 116 // F5
                        || event.keyCode == 46 // del
                        || event.keyCode == 35 // end
                        || event.keyCode == 36 // home
                        || event.keyCode == 37 // ←
                        || event.keyCode == 39 // →
                        || event.keyCode == 8 // backspace
                        || event.keyCode == 32 // space
                        || event.keyCode == 9 // tab
                        || event.keyCode == 191 // forward slash
                        || event.keyCode == 92 // forward slash
                        || event.keyCode == 111 // divide
                        || (event.shiftKey && event.keyCode == 186) // shift + [:;] => :
                        || (event.shiftKey && event.keyCode == 35) // shift + end
                        || (event.shiftKey && event.keyCode == 36) // shift + home
                        || event.ctrlKey // allow all ctrl combination
                    )
                    
                    || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // Shift + [0~9]
                ) {
                    event.preventDefault();
                }
        });
        // End - Add by Daonx - ANS804 - 2017/09/15

        //focus date
        $(document).on('focus', 'input.date', function(){
            var string = $(this).val();
            var reg = /^[0-9]{4}[\/.][0-9]{2}[\/.][0-9]{2}$/;
            if (string.match(reg)){
                $(this).val(string.replace(/\D/g,''));
            }
        });
        $(document).on('blur','input.date ',function() {
            var string = $(this).val();
            var reg1 = /^[0-9]{8}$/;
            var reg2 = /^[0-9]{4}[\/.][0-9]{2}[\/.][0-9]{2}$/;
            if (string.match(reg1)) {
                $(this).val(
                        string.substring(0, 4) + '/'
                                + string.substring(4, 6) + '/'
                                + string.substring(6));
            } else if (string.match(reg2)) {
                $(this).val(string);
            } else {
                $(this).val('');
            }
            if (!validateYyyyMmDd($(this).val())) {
                $(this).val('');
            }
        });

        // Add by Daonx - ANS804 - 2017/09/15
        //focus date
        $(document).on('focus', 'input.datetime', function(){
            var string = $(this).val();
            var reg = /^[0-9]{4}[\/.][0-9]{2}[\/.][0-9]{2}\s{1}(20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1})$/;
            if (string.match(reg)){
                $(this).val(string.replace(/\D/g,''));
            }
        });
        $(document).on('blur','input.datetime ',function() {
            var string = $(this).val();
            var reg1 = /^[0-9]{12}$/;
            var reg2 = /^[0-9]{4}[\/.][0-9]{2}[\/.][0-9]{2}\s{1}(20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1})$/;
            if (string.match(reg1)) {
                $(this).val(
                        string.substring(0,4)  + '/'
                      + string.substring(4,6)  + '/'
                      + string.substring(6,8)  + ' '
                      + string.substring(8,10) + ':'
                      + string.substring(10));
            } else if (string.match(reg2)) {
                $(this).val(string);
            } else {
                $(this).val('');
            }
            if (!validateYyyyMmDdHHMm($(this).val())) {
                $(this).val('');
            }
        });
        // End - Add by Daonx - ANS804 - 2017/09/15
    }

    function validateYyyyMmDd(string) {
        if (string == '') {
            return true;
        }
        if (string.length == 8) {
            string = string.substring(0, 4) + '/' + string.substring(4, 6) + '/'
                    + string.substring(6);
        }
        var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[13578]|1[02])[\/.]31|((19|[2-9][0-9])[0-9]{2}[\/.](01|0[3-9]|1[0-2])[\/.](29|30))|((19|[2-9][0-9])[0-9]{2}[\/.](0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8]))|((((19|[2-9][0-9])(04|08|[2468][048]|[13579][26]))|2000)[\/.](02)[\/.]29)$/;
        if (string.match(reg)) {
            return true;
        } else {
            return false;
        }
    }

    // Add by Daonx - ANS804 - 2017/09/15
    function validateYyyyMmDdHHMm(string) {
        if (string == '') {
            return true;
        }
        if (string.length == 12) {
            string = string.substring(0,4)  + '/' 
                   + string.substring(4,6)  + '/'
                   + string.substring(6,8)  + ' '
                   + string.substring(8,10) + ':'
                   + string.substring(10);
        }
        var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[13578]|1[02])[\/.]31|((19|[2-9][0-9])[0-9]{2}[\/.](01|0[3-9]|1[0-2])[\/.](29|30))|((19|[2-9][0-9])[0-9]{2}[\/.](0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8]))|((((19|[2-9][0-9])(04|08|[2468][048]|[13579][26]))|2000)[\/.](02)[\/.]29) (20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1})$/;
        if (string.match(reg)) {
            return true;
        } else {
            return false;
        }
    }
    // End - Add by Daonx - ANS804 - 2017/09/15

    function validateFromToDate(from, to) {
        try {
            if (from != '' && to != '') {
                var fromDate = new Date(from);
                var toDate = new Date(to);
                if (fromDate.getTime() > toDate.getTime()) {
                    return false;
                }
            }
            return true;
        } catch (e) {
            alert('validateFromToDate:' + e.message);
        }
    }
    function validateYyyyMm(string) {
        if (string == '') {
            return true;
        }
        if (string.length == 6) {
            string = string.substring(0, 4) + '/' + string.substring(4, 6);
        }
        var reg = /^((19|[2-9][0-9])[0-9]{2})[- /.](0?[1-9]|1[012])$/;
        if (string.match(reg)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * format datepicker
     */
    function formatDatepicker(){

        $(".datepicker").each(function(){
            try{
                if($(this).hasClass('hasDatepicker')){
                    if($('#ui-datepicker-div').length>0)
                        $('#ui-datepicker-div').remove();
                    $(this).next('img').remove();
                    $(this).removeClass('hasDatepicker');
                    $(this).datepicker("destroy");
                }
            }catch(e){
                console.log('dapicker destroy '+e.message);
            }
        });

        // // destroy old date picker
        // $('#ui-datepicker-div').remove();
        // $('.hasDatepicker').next('img').remove();
        // $('.hasDatepicker').removeClass('hasDatepicker');
        // // end destroy

        $( ".datepicker:not(:disabled):not([readonly]):visible" ).datepicker({
            showOn: "button",
            buttonImage: "/assets/images/calendar-icon.ico",
            buttonText : '日付を選択してください',
            buttonImageOnly: true,
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            onSelect: function(d,i){
                if(d !== i.lastVal){
                    $(this).change();
                }
                $(this).focus();
            }
        });
        $( ".datepicker:disabled, .datepicker[readonly]" ).datepicker({
            showOn: "button",
            buttonImage: "/assets/images/calendar-icon.ico",
            buttonText : '日付を選択してください',
            buttonImageOnly: true,
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            disabled: true,
            onSelect: function(){
                $(this).focus();
            }
        });

    }
    /**
     * format year month picker
     */
    function formatYearMonthPicker(){

        if( $('input.month') &&  $('input.month').length > 0 ) {
            $('input.month').each(function(){
                if($(this).is('[readonly]') || $(this).is('[disabled]')){
                    $.appendYmpicker($(this),"","",true);
                } else {
                    $.appendYmpicker($(this));
                }
            });
        }

    }

    /**
     * format datepicker on lose focus
     */
    function autoFormattingDate(target){
        $(target).focusout(function(){
            var string = $(this).val();
            if(string.length == 8){
                string = string.substring(0, 4) + '/' + string.substring(4, 6) + '/' + string.substring(6);
            }
            var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[13578]|1[02])[\/.]31|((19|[2-9][0-9])[0-9]{2}[\/.](01|0[3-9]|1[0-2])[\/.](29|30))|((19|[2-9][0-9])[0-9]{2}[\/.](0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8]))|((((19|[2-9][0-9])(04|08|[2468][048]|[13579][26]))|2000)[\/.](02)[\/.]29)$/;
            if (string.match(reg)){
                $(this).val(string);
            } else {
                $(this).val('');
            }
        });
    }

    /**
     *
     * format year month on lose focus
     */
    function autoFormattingMonth(target){
        $(target).focusout(function(){
            var string = $(this).val();
            if(string.length == 6){
                string = string.substring(0, 4) + '/' + string.substring(4, 6);
            }
            var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[1-9]|1[0-2])$/;
            if (string.match(reg)){
                $(this).val(string);
            } else {
                $(this).val('');
            }
        });
    }
    return {
        init: dateInit,
        isYyyyMmDd: validateYyyyMmDd,
        isYyyyMm: validateYyyyMm,
        checkFromTo: validateFromToDate,
        formatDatepicker: formatDatepicker
    };

})();
/**
 * create time module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : 1.timeModule.init()
             2.timeModule.validateTime24('2400')
             3.timeModule.validateTime48('4800')
             4.timeModule.padZero('800',4)
             5.timeModule.changeType(1234, 's')
 * @access : public
 * @see :
 */
var timeModule = (function () {
    function timeInit() {
        //focus time
        $(document).on('focus', 'input.time48,input.time24', function() {
            $(this).val($(this).val().replace(/:/g, ''));
        });
        // input blur time24
        $(document).on('blur','input.time24',function() {
            var string = padZeroForTime($(this).val(), 4);
            var reg1 = /^((0[0-9])|([0-1][0-9])|(2[0-3])):[0-5][0-9]|[2][4]:[0][0]$/;
            var reg2 = /^((0[0-9])|([0-1][0-9])|(2[0-3]))[0-5][0-9]|[2][4][0][0]$/;
            if (string.match(reg1)) {
                $(this).val(string);
            } else if (string.match(reg2)) {
                $(this).val(string.substring(0, 2) + ':'+ string.substring(2, 4));
            } else {
                $(this).val('');
            }
            if (!validateTime24($(this).val())) {
                $(this).val('');
            }
        });
        // blur .time48
        $(document).on('blur','input.time48',function() {
            var string = padZeroForTime($(this).val(), 4);
            var reg1 = /^((0[0-9])|([1-3][0-9])|(4[0-7])):[0-5][0-9]|[4][8]:[0][0]$/;
            var reg2 = /^((0[0-9])|([1-3][0-9])|(4[0-7]))[0-5][0-9]|[4][8][0][0]$/;
            // var reg3 = /^[4][8][0][0]$/;
            if (string.match(reg1)) {
                $(this).val(string);
            } else if (string.match(reg2)) {
                $(this).val(string.substring(0, 2) + ':'+ string.substring(2, 4));
            } else {
                $(this).val('');
            }
            if (!validateTime48($(this).val())) {
                $(this).val('');
            }
        });
    }
    function validateTime24(string) {
        var reg = /^((0[0-9])|([1-3][0-9])|(2[0-3])):[0-5][0-9]|[2][4]:[0][0]$/;
        if (string.match(reg) || string == '') {
            return true;
        } else {
            return false;
        }
    }
    function validateTime48(string) {
        var reg = /^((0[0-9])|([1-3][0-9])|(4[0-7])):[0-5][0-9]|[4][8]:[0][0]$/;
        if (string.match(reg) || string == '') {
            return true;
        } else {
            return false;
        }
    }
    function padZeroForTime(string, maxLength) {
        var lengthOfString = string.length;
        if (string == '') {
            for (var i = 0; i < maxLength; i++) {
                string += '0';
            }
            return string;
        }

        if (lengthOfString == maxLength) {
            return string;
        }

        if (lengthOfString > maxLength) {
            for (var i = 0; i < maxLength; i++) {
                string = '0000';
            }
            return string;
        }

        if (lengthOfString == 1) {
            for(var i = 0; i < (maxLength - 3); i++) {
                string = "0" + string;
            }
            string = string +"00";
        } else if (lengthOfString == 2) {
            for(var i = 0; i < (maxLength - 4); i++) {
                string = "0" + string;
            }
            string = string + "00";
        } else if (lengthOfString == 3) {
            string = string + "0"
            for(var i = 0; i < (maxLength - 4); i++) {
                string = "0" + string;
            }
        } else {
            for (var i = 0; i < maxLength; i++) {
                string += '0';
            }
            return string;
        }
        return string;
    }
    function changeType(time, type) {
        try {
            time = parseInt(time, 10);
            //
            switch (type) {
            case 's':
                time = parseInt(time / 1000, 10);
                break;
            case 'm':
                time = parseInt(time / (1000 * 60), 10);
                break;
            case 'h':
                time = parseInt(time / (1000 * 60 * 60), 10);
                break;
            case 'd':
                time = parseInt(time / (1000 * 60 * 60 * 24), 10);
                break;
            default:
                break;
            }
            //
            return (time);
        } catch (e) {
            console.log('changeType : ' + e.message);
            return (0);
        }
    }
    return {
        init: timeInit,
        validateTime24: validateTime24,
        validateTime48: validateTime48,
        padZero: padZeroForTime,
        changeType: changeType
    };

})();
/**
 * create decimal module
 * 
 * @author : ANS796 - 2017/03/08 - create
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var decimalModule = (function () {
    function decimalInit() {
        $(document).on('keydown','input.decimal:enabled',function(e) {
            if (!((e.keyCode > 47 && e.keyCode < 58)
                || (e.keyCode > 95 && e.keyCode < 106)
                // ////////// PERIOD SIGN
                || ((e.keyCode == 190 || e.keyCode == 110) && $(this).val().indexOf('.') === -1)
                || e.keyCode == 173
                || e.keyCode == 109
                || e.keyCode == 189
                || e.keyCode == 116
                || e.keyCode == 46
                || e.keyCode == 37
                || e.keyCode == 39
                || e.keyCode == 8 
                || e.keyCode == 9
                || e.keyCode == 229 // ten-key processing
                || 
                ($.inArray(e.keyCode,[ 65, 67, 86, 88, 116 ]) !== -1 && e.ctrlKey === true)
                ||
                // Allow: Ctrl+A, C, X, V
                ($.inArray(e.keyCode,[9]) !== -1 && e.shiftKey === true)
                ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)
            )) {
                e.preventDefault();
                return false;
            }
            // check numeric is negative ?
            var negativeEnabled = $(this).attr('negative');
            if (e.keyCode != 116
                    && e.keyCode != 46
                    && e.keyCode != 37
                    && e.keyCode != 39
                    && e.keyCode != 8
                    && e.keyCode != 9
                    && e.keyCode != 173
                    && e.keyCode != 189
                    && e.keyCode != 109         
                    && ($(this).get(0).selectionEnd - $(this).get(0).selectionStart) < $(this).val().length 
                ) {
                // DEFAULT PARAMS (NUMERIC (10, 0))
                var ml = 10;
                var dc = 0;
                if (parseInt($(this).attr('maxlength')) * 1 > 2) {
                    //ml = 1 * $(this).attr('maxlength') - 1;
                    ml = 1 * $(this).attr('maxlength');
                }
                if (parseInt($(this).attr('decimal')) > 0) {
                    dc = 1 * $(this).attr('decimal');
                    if (dc >= ml - 1) {
                        dc = 0;
                    }
                }
                var it = (ml - (dc > 0 ? (dc + 1) : 0));
                // CURRENT STATES
                var val             = $(this).val();
                var negative        = val.indexOf('-') > -1;
                var selectionStart  = $(this).get(0).selectionStart;
                var selectionEnd    = $(this).get(0).selectionEnd;
                if (negative) {
                    val = val.substring(1);
                    selectionStart--;
                    selectionEnd--;
                }
                // OUTPUT STATES
                var destSelectionStart      = undefined;
                var destSelectionEnd        = undefined;
                var destVal                 = undefined;
                // SKIP PERIOD KEY WHEN DECIMAL = 0
                if (dc == 0 && (e.keyCode == 190 || e.keyCode == 110)) {
                    e.preventDefault();
                }
                // EXCEED THE ACCEPTED NUMBER OF INTEGERS
                if (val.match(new RegExp('[0-9]{' + it + '}')) && selectionStart <= it) {
                    // PERIOD DOES NOT EXIST
                    if (val.indexOf('.') === -1) {      
                        // PERIOD KEY NOT RECEIVED (USER FORGETS TO TYPE PERIOD) DECIMAL > 0
                        if (e.keyCode != 190 && e.keyCode != 110 && dc > 0) {
                            e.preventDefault();
                            //var output = val.substring(0,selectionStart) + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode - 48 : e.keyCode) + val.substring(selectionStart);   
                            var output = '';
                            if(e.keyCode >= 96 && e.keyCode <= 105){
                                output = val.substring(0,selectionStart) + String.fromCharCode(e.keyCode - 48) + val.substring(selectionStart); 
                                destVal = output.substring(0, ml - (dc + 1)) + '.'+ output.substring(ml - (dc + 1));
                            }else if (e.keyCode == 229){
                                if ($.inArray(e.key,[ '0','1','2','3','4','5','6','7','8','9']) !== -1){
                                    output = val.substring(0,selectionStart) + e.key +val.substring(selectionStart);
                                }
                                if(output.substring(ml - (dc + 1)) != ''){
                                    destVal = output.substring(0, ml - (dc + 1)) + '.'+ output.substring(ml - (dc + 1));    
                                }else{
                                    destVal = output.substring(0, ml - (dc + 1));
                                }
                            }else{
                                output = val.substring(0,selectionStart) + String.fromCharCode(e.keyCode) + val.substring(selectionStart);          
                                destVal = output.substring(0, ml - (dc + 1)) + '.'+ output.substring(ml - (dc + 1));
                            }
                            // INSERT PERIOD    
                        }
                        // PERIOD EXISTS
                        // CARET STARTS NEXT TO THE PERIOD
                    } else if (selectionStart == val.indexOf('.')) {
                        // EXCEED THE ACCEPTED NUMBER OF
                        // DECIMALS
                        if (val.match(new RegExp('\\.[0-9]{'+ dc + '}$'))) {
                            e.preventDefault();
                        } else {
                            // JUMP TO THE NEXT POSITION THEN
                            // INSERT THE DIGIT
                            destSelectionStart = selectionStart + 1;
                        }
                        // CARET STARTS BEFORE THE PERIOD AND
                        // NOTHING HIGHLIGHTED
                    } else if (selectionStart < val.indexOf('.') && selectionStart == selectionEnd) {
                        e.preventDefault();
                        // CARET STARTS BEFORE THE PERIOD AND
                        // ENDS AFTER THE PERIOD (HIGHLIGHTS
                        // OVER THE PERIOD)
                    } else if (selectionEnd > val.indexOf('.') && selectionStart < val.indexOf('.')) {
                        e.preventDefault();
                        var output = '';
                        if(e.keyCode >= 96 && e.keyCode <= 105){
                            output  = val.substring(0,selectionStart)+ String.fromCharCode(e.keyCode - 48) + val.substring(selectionEnd);
                            destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                        }else if(e.keyCode == 229){
                            //output = val.substring(0,selectionStart)+ val.substring(selectionEnd);
                            if ($.inArray(e.key,[ '0','1','2','3','4','5','6','7','8','9']) !== -1){
                                output = val.substring(0,selectionStart) + e.key +val.substring(selectionStart);
                            }
                            if(output.substring(ml - (dc + 1)) != ''){
                                destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                            }else{
                                destVal = output.substring(0, ml - (dc + 1));
                            }
                        }else{
                            output  = val.substring(0,selectionStart)+ String.fromCharCode(e.keyCode) + val.substring(selectionEnd);
                            destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                        }
                        //
                        destSelectionStart  = selectionStart + 1;
                        destSelectionEnd    = selectionStart + 1;
                    }                   
                    // INTEGERS CAN BE ADDED BUT...
                    // EXCEED THE ACCEPTED NUMBER OF DECIMALS
                } else if (val.match(new RegExp('\\.[0-9]{'+ dc + '}$'))) {
                    // PERIOD EXISTS
                    // CARET STARTS AFTER THE PERIOD
                    if (val.indexOf('.') != -1 && selectionStart > val.indexOf('.')) {
                        //e.preventDefault();
                    }
                }
                // CARET RESULT
                if(typeof destVal != undefined){
                    if (destVal && negative) {
                        destVal = '-' + destVal;
                    }
                    if (destVal) {
                        $(this).val(destVal);
                    }   
                }
                //
                if (negative && destSelectionStart) {
                    destSelectionStart++;
                }
                if (destSelectionStart) {
                    $(this).get(0).selectionStart = destSelectionStart;
                }
                if (negative && destSelectionEnd) {
                    destSelectionEnd++;
                }
                if (destSelectionEnd) {
                    $(this).get(0).selectionEnd = destSelectionEnd;
                }
            // when click [-]
            } else if (e.keyCode == 173 || e.keyCode == 109 || e.keyCode == 189) {
                e.preventDefault();
                if (negativeEnabled) {
                    var val = $(this).val();
                    var negative = val.indexOf('-') > -1;
                    if (negative) {
                        $(this).val(val.substring(1));
                    } else {
                        $(this).val('-' + val);
                    }
                }
            }
            // fix maxlenght
            var val = $(this).val();
            if ($(this).attr('fixed') != undefined && val.indexOf('-') > -1) {
                var f_maxlenght = (parseInt($(this).attr('maxlengthfixed')) + 1) + '';
                if (val.length <= f_maxlenght) {
                    $(this).attr('maxlength', f_maxlenght);
                } else {
                    $(this).attr('maxlength', f_maxlenght);
                }
            } else if ($(this).attr('maxlength') > $(this).attr('maxlengthfixed')) {
                $(this).attr('maxlength',$(this).attr('maxlengthfixed'));
            }
        });

        // input method for decimal
        $(document).on('blur','input.decimal:enabled',function() {
            try {
                var negativeEnabled     = $(this).attr('negative');
                var val                 = $(this).val();
                //
                if (typeof val != undefined && val != ''){
                    var negative            = val.indexOf('-') > -1;
                    var negative_1          = val.indexOf('－') > -1;
                    if (negative || negative_1) {
                        val = val.substring(1);
                    }
                    var old = val;
                    val = val.replace('.', '');
                    val = old;
                    //
                    var dc = 1 * $(this).attr('decimal');
                    var result = parseFloat(val.replace(/,/g, ""));
                    if (result || result === 0) {
                        result = result.toFixed(dc);
                        if (result.indexOf('.') > -1) {
                            var integer = result.substring(0,result.indexOf('.')).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            var decimal = result.substring(result.indexOf('.'));
                            var ml = typeof $(this).attr('maxlength') != 'undefined' ? parseInt($(this).attr('maxlength')) : 0;
                            if(ml > 0 && integer.length > (ml-2)){
                                var num = ml-dc-1;
                                var tmp = $(this).val().replace('.', "");
                                integer = parseFloat(tmp.substring(0,num));
                                decimal = parseFloat('0.'+tmp.substring(num,num+dc));
                            }
                            val = integer + decimal;
                        } else {
                            val = result.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    } else {
                        val = '';
                    }
                    if(!isNaN(val)){
                        //
                        $(this).val((val != '' && val != '0' && val != 'NaN' && negativeEnabled && negative) ? ('-' + val) : val);  
                    }else{
                        $(this).val('');
                    }
                }
            } catch (e) {
                alert('Error input.decimal blur event: ' + e.message);
            }
        });
    }
    return {
        init: decimalInit
    };

})();
/**
 * create common module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var commonModule = (function () {
    function commonInit(){
        //click left menu
        $(document).find('.sidebar-main-toggle').on('click',function() {
           $(window).resize(); 
        });
        $(window).resize(function() {
            //custom size of popup
            try{
                $(this).colorbox.resize({
                    innerWidth : '90%',
                    innerHeight : '90%'
                });
            }
            catch(e){}
        });
        // blur input item
        $(document).on('blur','input',function() {
            if ($(this).val() != '' && $(this).hasClass('required') && $(this).attr('has-balloontip-message') == CONSTANTS.msgRequired) {
                $(this).removeClass('item-error');
                $(this).removeAttr('has-balloontip-message');
            }
        });
        // blur select item
        $(document).on('blur','select',function() {
            if (numberModule.toNumber($(this).val()) > 0) {
                $(this).removeClass('item-error');
                $(this).removeAttr('has-balloontip-message');
            }
        });
        //convert type to tel
        $(document).on('focus','input.numeric,input.money,input.time24,input.time48',function(e) {
            $(this).attr('type', 'tel');
        });
        //Add by QuyPN at 2017/08/16
        $(document).on('keydown','.alphabet',function(e) {
            onlyAlphabetKeydown(e);
        });
        $(document).on('blur','.alphabet',function(e) {
            if(!/^[a-zA-Z0-9]+$/.test($(this).val())){
                $(this).val('');
            }
        });
        //End add by QuyPN at 2017/08/16
    }
    function  callWaiting(){
        $.blockUI({
            message: '<i class="icon-spinner2 spinner" style="font-size: 30px;"></i>',
            overlayCSS: {
                backgroundColor: '#1b2024',
                opacity: 0.5,
                zIndex: 1200,
                cursor: 'default'
            },
            css: {
                border: 0,
                color: '#fff',
                padding: 0,
                zIndex: 1201,
                backgroundColor: 'transparent'
            }
        });
    }
    function closeWaiting() {
        $.unblockUI({});
    }
    function onlyTypeNumber(event) {
        if ((!((event.keyCode > 47 && event.keyCode < 58) // 0 ~
                // 9
                || (event.keyCode > 95 && event.keyCode < 106) // numpad
                // 0 ~
                // numpad
                // 9
                || event.keyCode == 116 // F5
                || event.keyCode == 46 // del
                || event.keyCode == 35 // end
                || event.keyCode == 36 // home
                || event.keyCode == 37 // ←
                || event.keyCode == 39 // →
                || event.keyCode == 8 // backspace
                || event.keyCode == 9 // tab
                || event.keyCode == 188 // ,
                || event.keyCode == 190 // .
                || event.keyCode == 110 // numpad .
                || (event.shiftKey && event.keyCode == 35) // shift
                // +
                // end
                || (event.shiftKey && event.keyCode == 36) // shift
                // +
                // home
                || event.ctrlKey // allow all ctrl combination
                ))
                || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude
        ){
            event.preventDefault();
        }
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
    //Add by QuyPN at 2017/08/16
    function onlyAlphabetKeydown(event){
        if ((!((event.keyCode > 47 && event.keyCode < 58) // 0 ~
            // 9
            || (event.keyCode > 95 && event.keyCode < 106) // numpad
            // 0 ~
            // numpad
            // 9
            || (event.keyCode > 64 && event.keyCode < 91) //A-Z
            || (event.keyCode > 96 && event.keyCode < 123) //a-z
            || event.keyCode == 116 // F5
            || event.keyCode == 46 // del
            || event.keyCode == 35 // end
            || event.keyCode == 36 // home
            || event.keyCode == 37 // ←
            || event.keyCode == 39 // →
            || event.keyCode == 8 // backspace
            || event.keyCode == 9 // tab
            || event.keyCode == 188 // ,
            || event.keyCode == 190 // .
            || event.keyCode == 110 // numpad .
            || (event.shiftKey && event.keyCode == 35) // shift
            // +
            // end
            || (event.shiftKey && event.keyCode == 36) // shift
            // +
            // home
            || event.ctrlKey // allow all ctrl combination
            ))
            || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude
        ){
            event.preventDefault();
        }
    }
    //End add by QuyPN at 2017/08/16
    return {
        init: commonInit,
        onlyTypeNumber: onlyTypeNumber,
        onlyNumberKeydown: onlyNumberKeydown,
        onlyAlphabetKeydown: onlyAlphabetKeydown
    };
})();
/**
 * create string module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : 1.stringModule.padToLeft('123',5,'*') = '**123'
             2.stringModule.padToRight('123',5,'*') = '123**'
             3.stringModule.convertKana('アハレボ', 'f') = 'あはれぼ'
 * @access : public
 * @see :
 */
var stringModule = (function () {
    function padToLeft($data, $max, $valuePad) {
        try {
            var length = 0;
            var addValue = '';
            //get length of data
            if($data == null){
                length = $max;
            }else{
                length = $max - $data.length;
            }
            //if data blank => return blank
            if (length == $max) {
                return '';
            }
            //add zero to left
            for (var i = 0; i < length; i++) {
                addValue = addValue + $valuePad;
            }
            return addValue + $data;
        } catch (e) {
            console.log('padToLeft' + e.message);
        }
    }
    function padToRight($data, $max, $valuePad) {
        try {
            var length = $max - $data.length;
            var addValue = '';
            if (length == $max) {
                return '';
            }
            for (var i = 0; i < length; i++) {
                addValue = addValue + $valuePad;
            }
            return  $data + addValue;
        } catch (e) {
            console.log('padToRight' + e.message);
        }
    }
    function convertKana(target, type) {
        try {
            var _deleteStack = '';
            var katakana = new Array('ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク',
                    'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
                    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ',
                    'ム', 'メ', 'モ', 'ヤ', 'ヰ', 'ユ', 'ヱ', 'ヨ', 'ラ', 'リ', 'ル', 'レ',
                    'ロ', 'ワ', 'ヲ', 'ン', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ',
                    'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ',
                    'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ',
                    'ョ', 'ッ', 'ヮ', 'ー');
            var hiragana = new Array('あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く',
                    'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と',
                    'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み',
                    'む', 'め', 'も', 'や', 'ゐ', 'ゆ', 'ゑ', 'よ', 'ら', 'り', 'る', 'れ',
                    'ろ', 'わ', 'を', 'ん', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず',
                    'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ',
                    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ',
                    'ょ', 'っ', 'ゎ', 'ー');
            //
            if (type === 'h') {
                target = _formatConvert(target, hiragana, katakana);
                _deleteStack += katakana.join('');
            } else if (type === 'f') {
                target = _formatConvert(target, katakana, hiragana);
                _deleteStack += hiragana.join('');
            }
            return (target);
        } catch (e) {
            return ('');
        }
    }
    function _formatConvert(target, original, format, escape) {
        try {
            var object = null;
            var i = 0;
            var len = original.length;
            //
            if (escape === true) {
                for (i = 0; i < len; i++) {
                    object = new RegExp(_formatConvertEscapeCheck(original[i]),
                            'gm');
                    target = target.replace(object, format[i]);
                }
            } else {
                for (i = 0; i < len; i++) {
                    object = new RegExp(original[i], 'gm');
                    target = target.replace(object, format[i]);
                }
            }
            delete (object);
            return (target);
        } catch (e) {
            return ('');
        }
    }
    function _formatConvertEscapeCheck(character) {
        try {
            var escape = '\\/^$*+-?{|}[].()';
            var i = 0;
            var len = escape.length;
            for (i = 0; i < len; i++) {
                if (character.indexOf(escape[i], 0) !== -1) {
                    return ('\\' + character);
                }
            }
            return (character);
        } catch (e) {
            return ('');
        }
    }
    return {
        padToLeft: padToLeft,
        padToRight: padToRight,
        convertKana: convertKana
    };
})();
/**
 * create number module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : 1. numberModule.toNumber('009') = 9
             2. numberModule.isNumber('a9') = false
 * @access : public
 * @see :
 */
var numberModule = (function () {
    function convertNumber(string) {
        try {
            var num = 0;
            var convert = parseInt(string);
            if( !isNaN(convert) ){
                num = convert;
            }
            return num;
        } catch (e) {
            return 0;
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
    return {
        toNumber: convertNumber,
        isNumber: validateNumber
    };
})();
/**
 * create validate module
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : 1. validateModule.validate()
             2. validateModule.clearErrorItem()
             3. validateModule.isEmail()
             4. validateModule.focusFirstError()
             5. validateModule.clearAllError()
             6. validateModule.isURL()
 * @access : public
 * @see :
 */
var validateModule = (function () {
    function validate(obj) {
        try {
            var error = 0;
            $.each(obj, function(key, element) {
                var className       = element['attr']['class'];
                var maxlength       = element['attr']['maxlength'];
                var email           = element['attr']['email'];
                var msg_maxlength   = '';
                if( typeof(_text) != 'undefined' && _text[10] != undefined ){
                	msg_maxlength = _text[14].replace('{0}',maxlength);
                }
                var type            = element['type'];
                // Add by QuyPn 2017/08/15
                if(element['type'] == 'CKEditor' || element['attr']['isCKEditor']){
                    try{
                        var required = element['attr']['required'];
                        var editor = CKEDITOR.instances[key];
                        if(maxlength != undefined && maxlength != null && maxlength > 0){
                            if(editor.getData().length > maxlength){
                                error += 1;
                                $('.cke_editor_' + editor.name).errorStyle(CONSTANTS.msgMaxlength);
                            }
                        }
                        if(/required/.test(className) || (required != undefined && required != null && required)){
                            if(editor.getData().length == 0){
                                error += 1;
                                $('.cke_editor_' + editor.name).errorStyle(CONSTANTS.msgRequired);
                            }
                        }
                    }catch(ex){}
                }
                // End add by QuyPn 2017/08/15
                else{
                    //check class or id
                    if (element['attr']['isClass'] === true) {
                        //check class
                        $('body').find('.'+key).each(function() {
                            if( !$(this).is(':disabled') ){
                                // check required
                                if (/required/.test(className)) {
                                    if($(this).val()==='' || numberModule.toNumber($(this).val()) < 0){
                                        $(this).errorStyle(CONSTANTS.msgRequired);
                                        error++;
                                    } else {
                                        // clear error
                                        clearErrorItem(this, CONSTANTS.msgRequired);
                                    }
                                }
                                // check maxlength
                                if (maxlength != undefined) {
                                    if ($(this).val().length > maxlength) {
                                        $(this).errorStyle(msg_maxlength);
                                        error++;
                                    } else {
                                        // clear error
                                        clearErrorItem(this,msg_maxlength);
                                    }
                                }
                                // check email
                                if ($(this).val() !== '' && /email/.test(className)) {
                                    if(!checkEmail($(id).val())){
                                        $(this).errorStyle(CONSTANTS.msgEmail);
                                        error++;
                                    }else{
                                        // clear error
                                        clearErrorItem(id,CONSTANTS.msgEmail);
                                    }
                                }
                                if ($(this).val() !== '' && /url/.test(className)) {
                                    if(!checkURL($(id).val())){
                                        $(this).errorStyle(CONSTANTS.msgURL);
                                        error++;
                                    }else{
                                        // clear error
                                        clearErrorItem(id,CONSTANTS.msgURL);
                                    }
                                }
                            }
                        });
                    } else if( !$('#'+key).is(':disabled') && $('#'+key).attr('not-check') !== "true"){
                        //check id
                        var id = '#'+key;
                        // check required
                        if (/required/.test(className)) {
                            if($(id).val()==='' || numberModule.toNumber($(id).val()) < 0){                            
                                if(type=="select"){
                                    $(id).next().find('.select2-selection').errorStyle(CONSTANTS.msgRequired);   
                                }else{
                                    $(id).errorStyle(CONSTANTS.msgRequired);
                                }                           
                                error++;
                            }else{
                                // clear error
                                clearErrorItem(id, CONSTANTS.msgRequired);
                            }
                        }
                        // check maxlength
                        if (maxlength != undefined) {
                            if($(id).val().length > maxlength){
                                $(id).errorStyle(msg_maxlength);
                                error++;
                            }else{
                                // clear error
                                clearErrorItem(id,msg_maxlength);
                            }
                        }
                        // check email
                        if ($(id).val() !== '' && /email/.test(className)) {
                            if(!checkEmail($(id).val())){
                                $(id).errorStyle(CONSTANTS.msgEmail);
                                error++;
                            } else {
                                // clear error
                                clearErrorItem(id,CONSTANTS.msgEmail);
                            }
                        }
                        // check url
                        if ($(id).val() !== '' && /url/.test(className)) {
                            if(!checkURL($(id).val())){
                                $(id).errorStyle(CONSTANTS.msgURL);
                                error++;
                            } else {
                                // clear error
                                clearErrorItem(id,CONSTANTS.msgURL);
                            }
                        }
                    }
                }
            });
            //return check object
            if (error > 0) {
                return false;
            } else {
                return true;
            }
        } catch (e) {
            console.log('validate : ' + e.message);
        }
    }
    function clearErrorItem(item,msg){
        try{
            var err = $(item).attr("has-balloontip-message");
            if(msg===err){
                //remove Balloontip
                $(item).removeAttr("has-balloontip-message");
                $("#has-balloontip-class").remove();
                //remove class item-error
                $(item).removeClass('item-error');
            }
        }catch(e){
            console.log('clearErrorItem' + e.message);
        }
    }
    function checkEmail(string) {
        if(string === '') {
            return false;
        }
        var patt = /^[\w-.+]+@[a-zA-Z0-9_-]+?\.[a-zA-Z0-9._-]*$/;
        return patt.test(string);
    }
    // Add by QuyPn 2017/08/15
    function checkURL(str) {
        var pattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        return pattern.test(str)
    }
    // End add by QuyPn 2017/08/15
    function focusFirstError() {
        try {
            
            var elem = $('.item-error:first');
            elem.focus();
            _balloontipMouseover('', jQuery(elem));
        } catch (e) {
            console.log('_focusFirstError:  ' + e.message);
        }
    }
    function clearAllError(obj){
        try{

            $.each(obj, function(key, element) {
                //remove Balloontip
                $('#' + key).removeAttr("has-balloontip-message");
                $("#has-balloontip-class").remove();
                //remove class item-error
                $('#' + key).removeClass('item-error');
            });
        }catch(e){
            console.log('clearAllError' + e.message);
        }
    }
    return {
        validate: validate,
        clearErrorItem: clearErrorItem,
        focusFirstError: focusFirstError,
        clearAllError: clearAllError,
        isEmail: checkEmail,
        // Add by QuyPn 2017/08/15
        isURL: checkURL
        // End add by QuyPn 2017/08/15
    };
})();
/**
 * create popup module
 * 
 * @author : ANS796 - 2017/04/03 - create
 * @author :
 * @params : obj
 * @return : 1. popupModule.show()
 * @access : public
 * @see :
 */
var popupModule = (function () {
    function showPopup(href, callBack, options) {
        if (typeof options === 'undefined') options = {};
        var defaultProperties = {
                'href'         : href,
                'open'         : true,
                'iframe'       : true,
                'fastIframe'   : true,
                'opacity'      : 0.5,
                'escKey'       : true,
                'overlayClose' : false,
                'innerWidth'   : '90%',
                'innerHeight'  : '90%',
                'reposition'   : true,
                'speed'        : 0,
                'onClosed'     : function() {
                    $("body").css('overflow' ,'auto');
                    if (typeof callBack == 'function') callBack();                
                },
                'onOpen'     : function() {
                    parent.$('body').css('overflow','hidden');
                    $("body").css('overflow-x' ,'hidden');
                    if(parent.$('#colorbox-draggable').length == 0){
                        parent.$("#colorbox").append('<div id="colorbox-draggable"></div>');
                    }
                }
            };

        for (var property in defaultProperties) {
            if( !options.hasOwnProperty(property) ) {
                options[property] = defaultProperties[property];
            }
        }
        $.colorbox(options);
    }
    return {
        show: showPopup
    };
})();
/**
 * create group japanese function
 * 
 * @author : ANS804 - 2017/08/30 - create
 * @author :
 * @params : obj
 * @return : 
 * @access : public
 * @see :
 */
var japanese = (function(){
    function checkIME(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('input.ime-disabled').attr('type','text');
        }
        // ime-modeが使えるか
        var supportIMEMode = ('ime-mode' in document.body.style);

        // 非ASCII
        var noSbcRegex = /[^\x00-\x7E]+/g;
        // 1バイト文字専用フィールド
        $('input.ime-disabled').on('blur paste', function(e) {
            
            // ime-modeが使えるならスキップ
            if (e.type == 'keyup' || e.type == 'blur')
                if (supportIMEMode) return;
            
            // 2バイト文字が入力されたら削除
            var target = $(this);
            window.setTimeout( function() {
                if(!target.val().match(noSbcRegex)) return;

                target.val( target.val().replace(noSbcRegex, '') );
            }, 1);

        });
    }
    // return
    return {
        checkIME : checkIME
    }
})();

/**
 * initItem
 * 
 * @author : ANS796 - 2017/03/07 - create
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
function initItem(obj) {
    try {
        // int element
        $.each(obj, function(key, element) {
            //Add by QuyPN at 2017/08/15
            if(element['type'] == 'CKEditor' || element['attr']['isCKEditor']){
                try{
                    var editor = CKEDITOR.instances[key];
                    if (element['attr']['tabindex'] != undefined) {
                        setTimeout( function() {
                            $('.cke_editor_' + editor.name + ' iframe').attr('tabindex', element['attr']['tabindex']);
                        }, 1000);
                    }
                    editor.on('change', function(){
                        if($('.cke_editor_' + editor.name).hasClass('item-error')){
                            $('.cke_editor_' + editor.name).removeAttr("has-balloontip-message");
                            $("#has-balloontip-class").remove();
                            $('.cke_editor_' + editor.name).removeClass('item-error');
                        }
                    })
                }catch(ex){}
            }
            //End add by QuyPN at 2017/08/15
            else{
                //check class or id
                if (element['attr']['isClass'] === true) {
                    // add maxlength
                    if (element['attr']['maxlength'] != undefined) {
                        $('.' + key).attr('maxlength', element['attr']['maxlength']);
                    }
                    // add class
                    if (element['attr']['class'] != undefined) {
                        $('.' + key).addClass(element['attr']['class']);
                    }
                    // add decimal
                    if (element['attr']['decimal'] != undefined) {
                        $('.' + key).attr('decimal', element['attr']['decimal']);
                    }
                    // add read-only
                    if (element['attr']['readonly'] != undefined) {
                        $('.' + key).attr('readonly', element['attr']['readonly']);
                    }
                    if (element['attr']['disabled'] != undefined) {
                        $('.' + key).attr('disabled', element['attr']['disabled']);
                    }
                    // add tabindex
                    if (element['attr']['tabindex'] != undefined) {
                        $('.' + key).attr('tabindex', element['attr']['tabindex']);
                    }
                    // add tabindex
                    if (element['attr']['not-check'] != undefined) {
                        $('.' + key).attr('not-check', element['attr']['not-check']);
                    }
                    //add name
                    if(!element['attr']['noname']){
                        if($('.' + key).length > 0){
                            $('.' + key).attr('name', key);
                        }
                    }
                }else{
                    // add maxlength
                    if (element['attr']['maxlength'] != undefined) {
                        $('#' + key).attr('maxlength', element['attr']['maxlength']);
                    }
                    // add class
                    if (element['attr']['class'] != undefined) {
                        $('#' + key).addClass(element['attr']['class']);
                    }
                    // add decimal
                    if (element['attr']['decimal'] != undefined) {
                        $('#' + key).attr('decimal', element['attr']['decimal']);
                    }
                    // add read-only
                    if (element['attr']['readonly'] != undefined) {
                        $('#' + key).attr('readonly', element['attr']['readonly']);
                    }
                    if (element['attr']['disabled'] != undefined) {
                        $('#' + key).attr('disabled', element['attr']['disabled']);
                    }
                    // add tabindex
                    if (element['attr']['tabindex'] != undefined) {
                        $('#' + key).attr('tabindex', element['attr']['tabindex']);
                    }
                    // add tabindex
                    if (element['attr']['not-check'] != undefined) {
                        $('#' + key).attr('not-check', element['attr']['not-check']);
                    }
                    //add name
                    if(!element['attr']['noname']){
                        if($('#' + key).length > 0){
                            $('#' + key).attr('name', key);
                        }
                    }
                }
            }
        });
    } catch (e) {
        console.log('initItem' + e.message);
    }
}
/**
 * postSessionScreenId
 *
 * @author      :   ANS806 - 2016/12/10 - create
 * @parram      :   $screen_id string, $parram string or array
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function postSessionScreenId(screen_id, parram, url, callback) {
    try {
        var data = {
            'screen_id' : screen_id,
            'parram'    : parram,
        };

        $.ajax({
            type        :   'POST',
            url         :   '/common/link/session-screen-id',
            dataType    :   'json',
            data        :   data,
            success: function(res) {
                var current_page = $('.bottom .current').text();
                sessionStorage.setItem('current_page', current_page);

                if (callback) {
                    callback();
                }
                if (res.response == 'true') {
                   window.location.href = url;
                }
            },
            error : function(res) {
               // closeWaiting();
            },
        });
    } catch(e) {
        console.log('postSessionScreenId' + e.message)
    }
}

