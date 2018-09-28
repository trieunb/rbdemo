/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Media (Index)
    *
    * 処理概要      :   
    * 作成日        :   2017/09/01
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
var tableMedia;
$(document).ready(function() {
    try{
        initalizeMedias();
        initEventMedias();
    } catch(e){
        console.log('ready: ' + e.message);
    }
});
/**
 * initalizeMedias
 *
 * @author      :   daonx - 2017/09/01 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initalizeMedias() {
    try{
        tableMedia = $('#datatable-responsive').DataTable({
                            'language': getDataTableLang()
                        });
        setTabIndexTable('#div-table-media');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    } catch(e){
        console.log('initalizeMedias: ' + e.message);
    }
}
/**
 * initEventMedias
 *
 * @author      :   daonx - 2017/09/01 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventMedias(){
    try{
        // delete
        $(document).on('click', '.btn-del-media', function(e){
            //console.log($(this).parents('tr')[0].getAttribute('class'));return;
            var ele = this;
            jMessage(8, function(r){
                if(r){
                    result = deleteMedia(ele);
                    if (result) {
                        // remove row chosen
                        var tr = $(ele).parents('tr');
                        if (tr[0].getAttribute('class') == 'child') {
                            tableMedia.row(tr.prev()).remove().draw();
                        } else {
                            tableMedia.row(tr[0]).remove().draw();
                        }
                    }
                }
            });
        });

        // draw table when resize
        $(window).resize(function(){
            tableMedia.columns.adjust().draw();
        });
    } catch(e){
        console.log('initEventMedias: ' + e.message);
    }
}

/**
 * delete media
 *
 * @author      :   daonx - 2017/08/24 - create
 * @author      :
 * @param       :   btn - button - button delete had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteMedia(e){
    try{
        var result = false;

        $.ajax({
            type        :   'POST',
            url         :   '/admin/medias/delete',
            dataType    :   'json',
            async       :   false,
            data        :   {
                id      :   $(e).attr('id-media')
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
        console.log('deleteMedia: ' + e.message);
    }
}