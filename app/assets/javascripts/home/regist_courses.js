/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - regist course
    *
    * 処理概要      :   
    * 作成日        :   2017/08/10
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
        initRegistCourse();
        initEventRegistCourse();
    } catch (e) {
        alert('readyRegistCourse: ' + e.message);
    }
});
/**
 * initRegistCourse
 *
 * @author      :   quypn - 2017/08/10 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initRegistCourse(){
    try{
        setPlaceHolderSelect($('#id-course-selected'));
        setMinHeight();
    } catch (e) {
        alert('initRegistCourse: ' + e.message);
    }
}
/**
 * initEventRegistCourse
 *
 * @author      :   quypn - 2017/08/10 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventRegistCourse(){
    try{
        $('#back-to-details').on('click', function(){
            resetFormRegistCourse();
            $('#regist-courses').removeClass('show');
            if(!$('#course-details').hasClass('show')){
                $('body').css('overflow-y', 'auto');
                history.pushState(null, null, (locale == 'vi' ? '/' : ('/' + locale)));
            }else{
                history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/course-detail/' + $('#course-details #beauty-id').val());
            }
        });
        $('#close-regist-course').on('click', function(){
            history.pushState(null, null, (locale == 'vi' ? '/' : ('/' + locale)));
            resetFormRegistCourse();
            $('#course-details').removeClass('show');
            $('#regist-courses').removeClass('show');
            $('body').css('overflow-y', 'auto');
        });
        $('#id-course-selected').on('change', function(){
            setPlaceHolderSelect(this);
        });
        $('#save-regist-course').on('click', function(){
            saveRegistCourse();
        });
        $('#profile').on('click', function(e){
            $(this).val('');
            $('#cv-name').val('');
        });
        $('#profile').on('change', function(e){
            checkFile(e);
        });
    } catch (e) {
        alert('initEventCourseDetails: ' + e.message);
    }
}
/**
 * resetFormRegistCourse
 *
 * @author      :   quypn - 2017/08/10 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function resetFormRegistCourse(){
    try{
        $('#id-course-selected').val(0);
        $('#id-course-selected').removeAttr('disabled');
        $('#profile').val('');
        $('#cv-name').val('');
        $('#name').val('');
        $('#address').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#message').val('');
        setPlaceHolderSelect('#id-course-selected');
        clearError('regist-course');
    } catch (e) {
        alert('resetFormRegistCourse: ' + e.message);
    }
}
/**
 * set color for option placeholder of select
 *
 * @author      :   quypn - 2017/08/10 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setPlaceHolderSelect(select){
    try{
        if(parseInt($(select).val()) < 1){
            $(select).css('color', '#999999');
        }else{
            $(select).css('color', '#555');
        }
    } catch (e) {
        alert('setPlaceHolderSelect: ' + e.message);
    }
}
/**
 * set minheight for body to make it full screen
 *
 * @author      :   quypn - 2017/08/10 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setMinHeight(){
    try{
        var margin = (window.innerHeight - 50 - $('#regist-courses .body').innerHeight()) / 2;
        if(margin > 0){
            $('#regist-courses .border-top').css('margin-top', margin + 'px');
        }
        else{
            $('#regist-courses .border-top').css('margin-top', '0px');
        }
    } catch (e) {
        alert('setMinHeight: ' + e.message);
    }
}
/**
 * check info of file when select file
 *
 * @author      :   quypn - 2017/08/10 - create
 * @parrams     :   e - event - event change file
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFile(e){
    try{
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            $('#cv-name').val('');
            $('#cv-name').parents('.had-err').find('.err-required').addClass('show');
        }else{
            $('#cv-name').parents('.had-err').find('.err-required').removeClass('show');
            if(files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE){
                $('#profile').val('');
                $('#cv-name').parents('.had-err').find('.err-size').addClass('show');
                return;
            }
            $('#cv-name').parents('.had-err').find('.err-size').removeClass('show');
            $('#cv-name').val(files[0].name);
        }
    } catch (e) {
        alert('checkFile: ' + e.message);
    }
}
/**
 * save data regist course
 *
 * @author      :   quypn - 2017/08/10 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveRegistCourse(){
    try{
        clearError('regist-course');
        var disabled = $('#id-course-selected').attr('disabled');
        $('#id-course-selected').removeAttr('disabled');
        if(validate('regist-course')){
            $('#regist-course').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if(disabled == 'disabled'){
                        $('#id-course-selected').attr('disabled', 'disabled');
                    }
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        resetFormRegistCourse();
                        // $('#regist-course-success').addClass('show');

                        //show message success
                        showPopupMessage(true, 'regist-course-success');
                    }
                    else{
                        // $('#regist-course-err').addClass('show');
                        
                        //show message fail
                        showPopupMessage(false);
                    }
                },
            });
        }
        else{
            focusFirstItemErr('regist-course')
        }
    } catch (e) {
        alert('registCourse: ' + e.message);
    }
}