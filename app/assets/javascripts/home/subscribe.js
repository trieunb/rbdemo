/**
 * ****************************************************************************
 * BRSE-SCHOOL
 * HOME - subscribe
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
$( document ).ready(function() {
    try{
        initSubscribe();
        initEventSubscribe();
    } catch (e) {
        alert('readySubscribe: ' + e.message);
    }
});
/**
 * initSubscribe
 *
 * @author      :   havv - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initSubscribe(){
    try{
        if($('#show-regist-advisory').val() == '1'){
            showRegistAdvisory(true);
        }
    } catch (e) {
        alert('initSubscribe: ' + e.message);
    }
}
/**
 * initEventSubscribe
 *
 * @author      :   havv - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventSubscribe(){
    try{
        //click button btn-regist-receive-interview
        $(document).on('click', '.btn-regist-receive-interview', function () {
            showRegistAdvisory(true);
        });

        //click button btn-subscribe
        $(document).on('click', '#btn-subscribe', function () {
            //hide msg
            $('#subs-e-footer .msg').removeClass('show');

            var email = $('#subs-input-email').val();
            var _validate = validate('subs-e-footer');

            if (_validate) {
                postSubscribeEmail(email);
            } else {
                $('#subs-input-email').focus();
            }
        });
    } catch (e) {
        alert('initEventSubscribe: ' + e.message);
    }
}
/**
 * Subscribe Email
 *
 * @author      :   havv - 2017/08/11 - create
 * @param       :   email - string
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function postSubscribeEmail(email) {
    try {
        var data = {
            'email'     :   email,
            'status'    :   1
        };

        $.ajax({
            type        :   'POST',
            url         :   '/home/subscribe-email',
            dataType    :   'json',
            data        :   data, 
            success: function(res) {
                if(res.status){
                    //clear item
                    $('#subs-input-email').val('');
                    //focus item
                    $('#subs-input-email').focus();
                    //hide msg err
                    $('#subs-input-email').parents('.had-err').find('.err-email').removeClass('show');
                    //show msg success
                    showPopupMessage(true);
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