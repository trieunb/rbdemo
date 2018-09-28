/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Slide (Index)
    *
    * 処理概要      :   
    * 作成日        :   2017/08/24
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
var tableSlide;
$(document).ready(function() {
    try{
        initalizeSlides();
        initEventSlides();
    }
    catch(e){
        console.log('ready: ' + e.message);
    }
});
/**
 * initalizeSlides
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initalizeSlides() {
    try{
        tableSlide = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang()
                        });
        setTabIndexTable('#div-table-slide');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch(e){
        console.log('initalizeSlides: ' + e.message);
    }
}
/**
 * initEventSlides
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventSlides(){
    try{
        $(document).on('change', '.show-slide', function(){
            updateShowSlide(this);
        });

        $(document).on('click', '.btn-del-slide', function(e){
            var ele = this;
            jMessage(8, function(r){
                if(r){
                    result = deleteSlide(ele);
                    if (result) {
                        // remove row chosen
                        tableSlide.row($(ele).parents('tr')[0]).remove().draw();
                    }
                }
            });
        });

        // resize
        $(window).resize(function(){
            tableSlide.columns.adjust().draw();
        })
    }
    catch(e){
        console.log('initEventSlides: ' + e.message);
    }
}
/**
 * updateShowSlide
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   check - checkbox had changed status
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateShowSlide(element){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/slides/update-show-slide',
            dataType    :   'json',
            data        :   {
                id      :   $(element).attr('id-slide')
            }, 
            success: function(res) {
            }
        });
    }
    catch(e){
        console.log('updateShowSlide: ' + e.message);
    }
}

/**
 * delete slide
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   btn - button - button delete had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteSlide(e){
    try{
        var result = false;

        $.ajax({
            type        :   'POST',
            url         :   '/admin/slides/delete',
            dataType    :   'json',
            async       :   false,
            data        :   {
                id      :   $(e).attr('id-slide')
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
        alert('deleteLetter: ' + e.message);
    }
}