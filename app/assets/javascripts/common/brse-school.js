/**
 * ****************************************************************************
 * BRSE-SCHOOL
 * BRSE-SCHOOL ADMIN JS
 * 
 * 処理概要        :   brse-school.js
 * 作成日          :   2017/07/28
 * 作成者          :   ANS809 – quypn@ans-asia.com
 * @package        :   COMMON
 * @copyright      :   Copyright (c) ANS-ASIA
 * @version        :   1.0.0
 * ****************************************************************************
 */
//max size file image is 10MB 
const MAX_SIZE_FILE_IMAGE = 10;
//max size file video is 252MB 
const MAX_SIZE_FILE_VIDEO = 252;
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    beforeSend: function(jqXHR, settings) {
        try{
            if (typeof settings.data == 'string'){
                settings.data = 'lang='+ locale +'&&' + settings.data;
            }
            else{
                settings.data.append('lang', locale);
            }
        }catch(e){}
        return true;
    }
});
$(document).ready(function() {
    try {
        $(document).ajaxStart(function () {
          callWaiting();
        });
        $(document).ajaxStop(function () {
           closeWaiting();
        });
        setCsrfTokenForm();
    } catch (e) {
        alert('ready: ' + e.message);
    }
});
/**
 * callWaiting
 *
 * @author      :   ANS809 - 2017/07/28 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   
 */
function  callWaiting(){
    try{
        $('.loading-flat').removeClass('hidden');
        $('.loading-img').removeClass('hidden');
    } catch (e) {
        alert('callWaiting: ' + e.message);
    }
}
/**
 * closeWaiting
 *
 * @author      :   ANS809 - 2017/07/28 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   
 */
function  closeWaiting(){
    try{
        $('.loading-flat').addClass('hidden');
        $('.loading-img').addClass('hidden');
        if(!$('#percent-upload').hasClass('hidden')){
            $('#percent-upload').addClass('hidden')
        }
    } catch (e) {
        alert('closeWaiting: ' + e.message);
    }
}
/**
 * setCsrfTokenForm
 *
 * @author      :   ANS809 - 2017/07/28 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   
 */
function  setCsrfTokenForm(){
    try{
        $('form #authenticity_token').val($('meta[name="csrf-token"]').attr('content'));
    } catch (e) {
        alert('setCsrfTokenForm: ' + e.message);
    }
}