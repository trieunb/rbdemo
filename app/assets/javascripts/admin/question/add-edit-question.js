/**
 * ****************************************************************************
 * BRSE-SCHOOL
 * ADMIN - Add/Edit Question
 *
 * 処理概要      :   
 * 作成日        :   2017/09/12
 * 作成者        :   daonx – daonx@ans-asia.com
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
    'question'          : {'type': 'CKEditor', 'attr': {'maxlength': 500,    'class': 'required', 'noname': true}},
    'answer'            : {'type': 'CKEditor', 'attr': {'maxlength': 1000,   'class': 'required', 'noname': true}}
};
var _objTrans = {
    'trans_question'    : {'type': 'CKEditor', 'attr': {'maxlength': 500,    'class': 'required', 'noname': true}},
    'trans_answer'      : {'type': 'CKEditor', 'attr': {'maxlength': 1000,   'class': 'required', 'noname': true}}
};

$(document).ready(function() {
    try {
        initializeAddEditQuestion();
        initEventAddEditQuestion();
    } catch(e) {
        console.log('ready: ' + e.message);
    }
});
/**
 * initializeAddEditQuestion
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initializeAddEditQuestion(){
    try {
        CKEDITOR.replace( 'question', {
            height: 150
        });
        CKEDITOR.replace( 'answer', {
            height: 150
        });
        initItem(_obj);

        if(mode == 'U'){
            CKEDITOR.replace( 'trans_question', {
                height: 150
            });
            CKEDITOR.replace( 'trans_answer', {
                height: 150
            });
            initItem(_objTrans);
        }

        initItem(_obj);

        autoTabindexForm();

        setTabIndexMenu();

        // focus item first
        // $('[tabindex=1]').focus();
        setTimeout(function(){
            CKEDITOR.instances['question'].focus();
        },1500);
        
    } catch(e) {
        console.log('initializeAddEditQuestion: ' + e.message);
    }
}

/**
 * initEventAddEditQuestion
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventAddEditQuestion(){
    try {
        $('#btn-save-question').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if(validateModule.validate(_obj)){
                        saveQuestion();
                    } else {
                        validateModule.focusFirstError();
                    }
                }
            });
        });

        $('#trans-btn-save-question').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    if(validateModule.validate(_objTrans)){
                        saveQuestionTrans();
                    } else {
                        validateModule.focusFirstError();
                    }
                }
            });
        });

        $('#btn-delete-question').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteQuestion();
                }
            });
        });

        // change language
        $('#language-trans').on('change', function(){
            referQuestionLang();
        });

        // catch event enter for button
        $('button').on('keypress',function(e){
            if (e.keyCode == 13) {
                var id = $(this).data('target');
                $("#" + id).trigger('click');
            }
        });
    } catch(e) {
        console.log('initEventAddEditQuestion: ' + e.message);
    }
}

/**
 * autoTabindexForm
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function autoTabindexForm(){
    try {
        var index = 0;
        $('.form_auto_tabindex:not(:disabled):not([readonly])').each(function(index,element){
            $(this).attr('tabindex',++index);
        });
    } catch (e) {
        console.log("autoTabindexForm: " + e.message);
    }
}

/**
 * saveQuestion
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveQuestion(){
    try {
        $('#question').val(CKEDITOR.instances.question.getData());
        $('#answer').val(CKEDITOR.instances.answer.getData());
        $('#form-question-main').ajaxSubmit({
            beforeSubmit: function(a,f,o) {
                o.dataType = 'json';
                o.async    = true;
                // o.cache    = false;
            },
            success: function(responseText , textStatus) {
                var res = responseText;
                if(res.status){
                    jMessage(6, function(){
                        if (mode == 'I') {
                            if (res.id != null && res.id != '') {
                                window.location = '/admin/questions/edit?id=' + res.id;
                            } else {
                                window.location = window.location;
                            }
                        } else {
                            window.location = window.location;
                        }
                        
                    });
                } else {
                    jMessage(7, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            },
        });
    } catch(e) {
        console.log('saveQuestion: ' + e.message);
    }
}

/**
 * saveQuestionTrans
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveQuestionTrans(){
    try {
        $('#trans_question').val(CKEDITOR.instances.trans_question.getData());
        $('#trans_answer').val(CKEDITOR.instances.trans_answer.getData());
        $('#form-question-trans').ajaxSubmit({
            beforeSubmit: function(a,f,o) {
                o.dataType = 'json';
                o.async    = true;
                // o.cache    = false;
            },
            success: function(responseText , textStatus) {
                var res = responseText;
                if(res.status){
                    jMessage(6, function(){
                        if (res.id != null && res.id != '') {
                            window.location = '/admin/questions/edit?id=' + res.id;
                        } else {
                            window.location = window.location;
                        }
                    });
                } else {
                    jMessage(7, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            },
        });
    } catch(e) {
        console.log('saveQuestionTrans: ' + e.message);
    }
}

/**
 * delete aquestion
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteQuestion(){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/admin/questions/delete',
            dataType    :   'json',
            data        :   {
                    id      :   $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/questions';
                    });
                } else {
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    } catch(e) {
        console.log('deleteQuestion: ' + e.message);
    }
}

/**
 * get data of question follow language
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function referQuestionLang(){
    try {
        $.ajax({
            type        :   'POST',
            url         :   '/admin/questions/refer-question',
            dataType    :   'json',
            data        :   {
                id      :   $('#id').val()
            ,   lang    :   $('#language-trans').val()
            }, 
            success: function(res) {
                if(res.status){
                    setDataTrans(_objTrans,res.data); //javascript/common/custom.js
                }
            }
        });
    }
    catch (e) {
        console.log('referQuestionLang: ' + e.message);
    }
}