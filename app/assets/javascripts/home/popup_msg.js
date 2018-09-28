/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - popup message
    *
    * 処理概要      :   
    * 作成日        :   2017/08/25
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
        initPopupMessage();
        initEventPopupMessage();
    } catch (e) {
        alert('readyPopupMessage: ' + e.message);
    }
});
/**
 * initPopupMessage
 *
 * @author      :   havv - 2017/08/25 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initPopupMessage(){
    try{
    } catch (e) {
        alert('initPopupMessage: ' + e.message);
    }
}
/**
 * initEventPopupMessage
 *
 * @author      :   havv - 2017/08/25 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventPopupMessage(){
    try{
        $(document).on('click', '#popup-msg .close', function(){
            $('#popup-msg').removeClass('show');
        });
    } catch (e) {
        alert('initEventPopupMessage: ' + e.message);
    }
}
/**
 * show popup msg
 *          isSuccess = true: show message success
 *          isSuccess = false: show message fail
 *
 * @author      :   havv - 2017/08/25 - create
 * @param       :   isSuccess - bool
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showPopupMessage(isSuccess, msg) {
    try{
        if(msg == undefined || msg == null || msg == ''){
            msg = 'common';
        }
        //hide all icon, text
        $('#popup-msg .msg-icon').addClass('hide');
        $('#popup-msg .msg-text').addClass('hide');

        //show icon and text
        if (isSuccess) {
            //show message success
            $('#popup-msg .msg-success-icon').removeClass('hide');
            $('#popup-msg .msg-success-text.' + msg).removeClass('hide');
        } else {
            //show message fail
            $('#popup-msg .msg-fail-icon').removeClass('hide');
            $('#popup-msg .msg-fail-text.' + msg).removeClass('hide');
        }

        //show popup
        $('#popup-msg').addClass('show');
    } catch (e) {
        alert('showPopupMessage: ' + e.message);
    }
}