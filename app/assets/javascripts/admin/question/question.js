/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Question (Index)
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
var tableQuestion;
$(document).ready(function() {
    try {
        initalizeQuestions();
        initEventQuestions();
    } catch(e){
        console.log('ready: ' + e.message);
    }
});

/**
 * initalizeQuestions
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initalizeQuestions() {
    try{
        tableQuestion = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang()
                        });

        setTabIndexTable('#div-table-question');

        setTabIndexMenu();

        $('[tabindex=1]').focus();
    } catch(e){
        console.log('initalizeQuestions: ' + e.message);
    }
}

/**
 * initEventQuestions
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventQuestions(){
    try{
        // delete
        $(document).on('click', '.btn-del-question', function(e){
            var ele = this;
            jMessage(8, function(r){
                if(r){
                    result = deleteQuestion(ele);
                    if (result) {
                        // remove row chosen
                        tableQuestion.row($(ele).parents('tr')[0]).remove().draw();
                    }
                }
            });
        });

        // draw table when resize
        $(window).resize(function(){
            tableQuestion.columns.adjust().draw();
        });
    } catch(e){
        console.log('initEventQuestions: ' + e.message);
    }
}

/**
 * delete question
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   btn - button - button delete had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteQuestion(e){
    try{
        var result = false;

        $.ajax({
            type        :   'POST',
            url         :   '/admin/questions/delete',
            dataType    :   'json',
            async       :   false,
            data        :   {
                id      :   $(e).attr('id-question')
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        // $(e).parents('tr').remove();
                    });
                } else {
                    jMessage(10, function(){
                    });
                }
                result = res.status;
            }
        });

        return result;
    } catch(e){
        console.log('deleteQuestion: ' + e.message);
    }
}

/**
 * updateShowQuestion
 *
 * @author      :   daonx - 2017/09/12 - create
 * @author      :
 * @param       :   check - checkbox had changed status
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateShowQuestion(element){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/questions/update-show-question',
            dataType    :   'json',
            data        :   {
                id      :   $(element).attr('id-question')
            }, 
            success: function(res) {
            }
        });
    }
    catch(e){
        console.log('updateShowQuestion: ' + e.message);
    }
}