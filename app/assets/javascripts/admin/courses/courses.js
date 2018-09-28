/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Courses
    *
    * 処理概要      :   
    * 作成日        :   2017/08/22
    * 作成者        :   quypn – quypn@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   ADMIN
    * @copyright   :   Copyright (c) ANS-ASIA
    * @version     :   1.0.0
    * ****************************************************************************
*/
var _obj = {
    'title'       : {'type': 'input',     'attr': {'maxlength': 50, 'tabindex': 4, 'class': 'required', 'noname': true}}
,   'description' : {'type': 'input',     'attr': {'maxlength': 100,'tabindex': 5, 'noname': true}}
,   'price'       : {'type': 'input',     'attr': {'maxlength': 11, 'tabindex': 8, 'class': 'required', 'noname': true}}
,   'unit_price'  : {'type': 'select',    'attr': {'tabindex': 9,   'noname'  : true}}
,   'unit'        : {'type': 'input',     'attr': {'maxlength': 10, 'tabindex': 10,'class': 'required', 'noname': true}}
}
var _objTrans = {
    'trans_title'       : {'type': 'input',     'attr': {'maxlength': 50, 'tabindex': 13, 'class': 'required', 'noname': true}}
,   'trans_description' : {'type': 'input',     'attr': {'maxlength': 100,'tabindex': 14, 'noname': true}}
,   'trans_unit'        : {'type': 'input',     'attr': {'maxlength': 10, 'tabindex': 17,'class': 'required', 'noname': true}}
}
var msg_err_file = [0, 0, 0, 0];
$(document).ready(function() {
    try{
        init();
        initEvent();
        setTabIndexMenu();
        $('.money').trigger('blur');
        $('[tabindex=1]').focus();
    }
    catch(e){
        alert('ready: ' + e.message);
    }
});
/**
 * init
 *
 * @author      :   quypn - 2017/08/22 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init() {
    try{
        initItem(_obj);
        initItem(_objTrans);
    }
    catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * init
 *
 * @author      :   quypn - 2017/08/22 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('#language-trans').on('change', function(){
            referCourseTrans();
        });
        $('#level, #place').on('change', function(){
            referCourse();
        });
        $('#btn-update-course').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    updateCourse();
                }
            });
        });
        $('#btn-update-course-trans').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    updateCourseTrans();
                }
            });
        });
        $('#image, #image_title, #trans_image, #trans_image_title').on('click', function(e){
            validateModule.clearErrorItem('#' + $(this).attr('id-view'), _text[msg_err_file[$(this).attr('err-idx')]]);
        });
        $('#image, #image_title, #trans_image, #trans_image_title').on('change', function(e){
            checkFile(this, e);
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * get data of course by id
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referCourse(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/courses/refer-course',
            dataType    :   'json',
            data        :   {
                level   :   $('#level').val()
            ,   locale  :   $('#place').val()
            }, 
            success: function(res) {
                if(res.status){
                    setCourseData(_obj, res.data.course_vi);
                    setCourseTrans(res.data.course_ja);
                    $('#language-trans').val('ja');
                    $('#language-trans').attr('id-course', res.data.course_vi.id);
                    $('#id').val(res.data.course_vi.id);
                    $('#trans_id').val(res.data.course_vi.id);
                    $('#title').focus();
                }
            }
        });
    }
    catch(e){
        alert('referCourse: ' + e.message);
    }
}
/**
 * get data translate of course by language
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referCourseTrans(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/courses/refer-course-trans',
            dataType    :   'json',
            data        :   {
                id      :   $('#language-trans').attr('id-course')
            ,   lang    :   $('#language-trans').val()
            }, 
            success: function(res) {
                if(res.status){
                    setCourseTrans(res.data);
                    $('#trans_title').focus();
                }
            }
        });
    }
    catch(e){
        alert('referCourseTrans: ' + e.message);
    }
}
/**
 * set data for view translate
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @param       :   obj - data translate
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setCourseTrans(obj){
    try{
        setDataTrans(_objTrans, obj); //javascript/common/custom.js
        $('#img_preview2').attr('src', obj.image_title);
        $('#trans-image-title-name').val(obj.image_title);
        $('#trans_image_title').val('');
        $('#img_preview3').attr('src', obj.image);
        $('#trans-image-name').val(obj.image);
        $('#trans_image').val('');
    }
    catch(e){
        alert('referCourseTrans: ' + e.message);
    }
}
/**
 * set data for view main language
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @param       :   obj - controls need to set data
 * @param       :   data - data need to set
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setCourseData(obj, data){
    try{
        $.each(obj, function(key, element) {
            $('#' + key).val(data[key]);
        });
        $('#trans_price').val(data['price']);
        $('#trans_unit_price').val(data['unit_price']);
        $('#img_preview0').attr('src', data.image_title);
        $('#image-title-name').val(data.image_title);
        $('#image_title').val('');
        $('#img_preview1').attr('src', data.image);
        $('#image-name').val(data.image);
        $('#image').val('');
        $('#price').trigger('blur');
    }
    catch(e){
        alert('setCourseData: ' + e.message);
    }
}
/**
 * update data of course
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateCourse(){
    try{
        var err1 = validateModule.validate(_obj);
        var err2 = validateFile(0);
        if(err1 && err2){
            $('#form-course-main').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            window.location = window.location
                        });
                    }
                    else{
                        jMessage(7, function(){
                            $('#title').focus();
                        });
                    }
                },
            });
        }
        else{
            validateModule.focusFirstError();
        }
    }
    catch(e){
        alert('updateCourse: ' + e.message);
    }
}
/**
 * update data translate of course
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateCourseTrans(){
    try{
        var err1 = validateModule.validate(_objTrans);
        var err2 = validateFile(1);
        if(err1 && err2){
            $('#form-course-trans').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            window.location = window.location
                        });
                    }
                    else{
                        jMessage(7, function(){
                            $('#trans_title').focus();
                        });
                    }
                },
            });
        }
        else{
            validateModule.focusFirstError();
        }
    }
    catch(e){
        alert('updateCourseTrans: ' + e.message);
    }
}
/**
 * check file image upload
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @param       :   btn - button choose file
 * @param       :   e - e vent change file selected
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkFile(btn, e){
    try{
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            $('#' + $(btn).attr('id-view')).val('');
            msg_err_file[$(btn).attr('err-idx')] = 22;
            $('#' + $(btn).attr('id-view')).errorStyle(_text[22]);
            return;
        }
        if(files[0].size/1024/1024 > MAX_SIZE_FILE_IMAGE){
            msg_err_file[$(btn).attr('err-idx')] = 23;
            $('#' + $(btn).attr('id-view')).errorStyle(_text[23]);
        }
        else{
            msg_err_file[$(btn).attr('err-idx')] = 0;
            readImage(files[0],'size' + $(btn).attr('err-idx'),'img_preview' + $(btn).attr('err-idx'));
        }
        $('#' + $(btn).attr('id-view')).val(files[0].name);
    } catch (e) {
        alert('checkFile: ' + e.message);
    }
}
/**
 * validate file before upload
 *
 * @author      :   quypn - 2017/08/24 - create
 * @author      :
 * @param       :   mode - 0: main data, 1: translate data
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function validateFile(mode){
    try{
        var notError = true;
        var rate = 1;
        if(mode == 0){
            checkRateImg(0, 420, 11, 11.1);
            checkRateImg(1, 480, 2, 2.1);
            if(msg_err_file[0] != 0 || msg_err_file[1] != 0){
                notError = false;
            }
            return notError;
        }
        else{
            checkRateImg(2, 420, 11, 11.1);
            checkRateImg(3, 480, 2, 2.1);
            if(msg_err_file[2] != 0 || msg_err_file[3] != 0){
                notError = false;
            }
            return notError;
        }
    }
    catch (e) {
        alert('validateFile: ' + e.message);
    }
}
/**
 * check rate of image
 *
 * @author      :   quypn - 2017/09/21 - create
 * @author      :
 * @param       :   idx - int - index of image
 * @param       :   min_width - int - min width can accept
 * @param       :   min_rate - float - min rate can accept
 * @param       :   max_rate - float - max rate can accept
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkRateImg(idx, min_width, min_rate, max_rate){
    try{
        if(msg_err_file[idx] == 27) {
            msg_err_file[idx] = 0;
        }
        if($('#size' + idx).data('height') != undefined && $('#size'  + idx).data('width') != undefined){
            var width = parseInt($('#size' + idx).attr('data-width'));
            var height = parseInt($('#size' + idx).attr('data-height'));
            var rate = parseFloat(width/height);
            if(!(width >= min_width && rate >= min_rate && rate <= max_rate)){
                $('#' + $('#size' + idx).attr('id-view')).errorStyle(_text[27]);
                msg_err_file[idx] = 27;
            }
        }
    }
    catch (e) {
        alert('checkRateImg: ' + e.message);
    }
}