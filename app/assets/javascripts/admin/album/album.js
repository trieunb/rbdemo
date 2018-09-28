/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Add Photos
    *
    * 処理概要      :   
    * 作成日        :   2017/09/12
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
var ids = [];
$(document).ready(function() {
    try{
        init();
        initEvent();
    }
    catch(e){
        alert('ready: ' + e.message);
    }
});
/**
 * init
 *
 * @author      :   quypn - 2017/09/12 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
        $(document).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch(e){
        alert('init: ' + e.message);
    }
}
/**
 * initEvent
 *
 * @author      :   quypn - 2017/09/12 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('.choose-img').on('ifChanged', function(){
            selectedItem(this);
        });
        $('#deletes').on('click', function(){
            if(ids.length == 0){
                jMessage(13, function(){
                    $('[tabindex=1]').focus();
                });
                return;
            }
            jMessage(8, function(r){
                if(r){
                    deletePhotos();
                }
            });
        });
        $('.delete-img').on('click', function(){
            var btn = this;
            jMessage(8, function(r){
                if(r){
                    deletePhoto(btn);
                }
            });
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * select item photo
 *
 * @author      :   quypn - 2017/09/12 - create
 * @author      :
 * @param       :   checkbox - checkbox had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function selectedItem(checkbox){
    try{
        var idx = ids.indexOf($(checkbox).val());
        if(idx > -1){
            ids.splice(idx, 1);
        }
        else{
            ids.push($(checkbox).val());
        }
        $(checkbox).parents('.img-item').removeClass('selected');
        for(var i = 0, length = ids.length; i < length; i++){
            $('.item' + ids[i]).addClass('selected');
        }
    }
    catch(e){
        alert('selectedItem: ' + e.message);
    }
}
/**
 * delete many photo
 *
 * @author      :   quypn - 2017/09/12 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deletePhotos(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/albums/delete',
            dataType    :   'json',
            data        :   {
                ids     :   ids
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        for(var i = 0, length = ids.length; i < length; i++){
                            $('.item' + ids[i]).parent().remove();
                        }
                        ids = [];
                    });
                }
                else{
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    }
    catch(e){
        alert('deletePhotos: ' + e.message);
    }
}
/**
 * delete one photo
 *
 * @author      :   quypn - 2017/09/12 - create
 * @author      :
 * @param       :   btn - button had clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deletePhoto(btn){
    try{
        var id = [];
        id.push($(btn).attr('id-img'));
        $.ajax({
            type        :   'POST',
            url         :   '/admin/albums/delete',
            dataType    :   'json',
            data        :   {
                ids     :   id
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        $('.item' + id[0]).parent().remove();
                    });
                }
                else{
                    jMessage(10, function(){
                        $('[tabindex=1]').focus();
                    });
                }
            }
        });
    }
    catch(e){
        alert('deletePhotos: ' + e.message);
    }
}