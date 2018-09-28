/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - courses
    *
    * 処理概要      :   
    * 作成日        :   2017/08/08
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
$( document ).ready(function() {
    try{
        initCourses();
        initEventCourses();
    } catch (e) {
        alert('readyCourses: ' + e.message);
    }
});
/**
 * initCourses
 *
 * @author      :   quypn - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initCourses(){
    try{
        $('#courses-se').addClass('hidden');
        showClassDetailFromLink();
        setTimeout(function(){
            showVerifyResult();
        }, 700);
    } catch (e) {
        alert('initCourses: ' + e.message);
    }
}
/**
 * initEventCourses
 *
 * @author      :   quypn - 2017/08/08 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventCourses(){
    try{
        $('.btn-change-courses').on('click', function(){
            changeCourses(this);
        });
        $('.show-class-detail').on('click', function(){
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/course-detail/' + $(this).attr('beauty-id'));
            showClassDetail($(this).attr('id-class'));
        });
    } catch (e) {
        alert('initEventCourses: ' + e.message);
    }
}
/**
 * change view courses
 *
 * @author      :   quypn - 2017/08/08 - create
 * @author      :
 * @param       :   btn - button - the button had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function changeCourses(btn){
    try{
        $('.btn-change-courses').removeClass('active');
        $(btn).addClass('active');
        var show = $(btn).attr('show');
        $('.div-courses-brse').addClass('hidden');
        $('#' + show).removeClass('hidden');
        $(window).scrollTop($(window).scrollTop()-1);
        $(window).scrollTop($(window).scrollTop()+1);
        $('.title-left').text($(btn).attr('text'));
        $('.title-left-white-bg').text($(btn).attr('text'));
    } catch (e) {
        alert('changeCourses: ' + e.message);
    }
}
/**
 * showClassDetailFromLink
 *
 * @author      :   quypn - 2017/08/08 - create
 * @author      :
 * @param       : 
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showClassDetailFromLink(){
    try{
        var id = $('#view-detail-from-link').val();
        if(parseInt(id + '') > 0){
            gotoSection($('#menu-courses')); // header.js
            setTimeout(function(){
                showClassDetail(id);
            }, 500);
        }
    } catch (e) {
        alert('showClassDetailFromLink: ' + e.message);
    }
}
/**
 * showClassDetail
 *
 * @author      :   quypn - 2017/08/08 - create
 * @author      :
 * @param       : 
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showClassDetail(id){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/home/refer-class',
            dataType    :   'json',
            data        :   {
                id      :    id
            }, 
            success: function(res) {
                if(res.status){
                    $('#course-details').html(res.html);
                    $('#course-details').addClass('show');
                    $('#course-details .item-facebook').append($('#fb-send').html());
                    $('body').css('overflow-y', 'hidden');
                    try {
                        FB.XFBML.parse();
                    } catch (e) {
                        console.log('FB.XFBML.parse(): ' + e.message);
                    }
                    
                }
            }
        });
    } catch (e) {
        alert('showClassDetail: ' + e.message);
    }
}
/**
 * showVerifyResult
 *
 * @author      :   quypn - 2017/08/30 - create
 * @author      :
 * @param       : 
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showVerifyResult(){
    try{
        var result = $('#show-message-verify').val();
        if (result != '') {
            if (result == 'true' || result == 'True') {
                showPopupMessage(true, 'verify-success');
            }
            else{
                showPopupMessage(false, 'verify-error');
            }
        }
    } catch (e) {
        alert('showVerifyResult: ' + e.message);
    }
}
