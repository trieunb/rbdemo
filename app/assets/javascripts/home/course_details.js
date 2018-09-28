/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - course deatils
    *
    * 処理概要      :   
    * 作成日        :   2017/08/09
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
        initCourseDetails();
        initEventCourseDetails();
    } catch (e) {
        alert('readyCourseDetails: ' + e.message);
    }
});
/**
 * initCourseDetails
 *
 * @author      :   quypn - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initCourseDetails(){
    try{
        showFormRegistCourseFromLink();
    } catch (e) {
        alert('initCourseDetails: ' + e.message);
    }
}
/**
 * initEventCourseDetails
 *
 * @author      :   quypn - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventCourseDetails(){
    try{
        $(document).on('click', '#close-course-details', function(){
            history.pushState(null, null, (locale == 'vi' ? '/' : ('/' + locale)));
            $('#course-details ').removeClass('show');
            $('body').css('overflow-y', 'auto');
        });
        $(document).on('click', '#btn-regist-course', function(){
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/apply/' + $('#course-details #beauty-id').val());
            showFormRegistCourse();
        });
    } catch (e) {
        alert('initEventCourseDetails: ' + e.message);
    }
}
/**
 * show and set default for form regist course
 *
 * @author      :   quypn - 2017/08/10 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showFormRegistCourse(){
    try{
        $('#regist-courses').addClass('show');
        $('#id-course-selected').val($('#course-details #id-class').val());
        $('#id-course-selected').attr('disabled', 'disabled');
        $('#regist-courses #name').focus();
    } catch (e) {
        alert('showFormRegistCourse: ' + e.message);
    }
}
function showFormRegistCourseFromLink(){
    try{
        if(parseInt($('#show-form-apply-from-link').val()) == 1){
            $('#regist-courses').addClass('show');
            var id = $('#view-detail-from-link').val(); // _courses.html.erb
            if(parseInt(id + '') > 0){
                $('#id-course-selected').val(id);
                $('#id-course-selected').attr('disabled', 'disabled');
                $('#regist-courses #name').focus();
            }
            else{
                $('#regist-courses #id-course-selected').focus();
                $('body').css('overflow-y', 'hidden');
            }
        }
    } catch (e) {
        alert('showFormRegistCourseFromLink: ' + e.message);
    }
}