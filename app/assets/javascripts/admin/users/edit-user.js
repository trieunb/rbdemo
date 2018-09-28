/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - EditUser
    *
    * 処理概要      :   
    * 作成日        :   2017/08/16
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
    'name'      : {'type' : 'text'      , 'attr' : {'maxlength': 50,  'tabindex': 1, 'class': 'required', 'noname': true}}
,   'phone'     : {'type' : 'tel'       , 'attr' : {'maxlength': 20,  'tabindex': 3, 'class': 'required numeric', 'noname': true}}
,   'email'     : {'type' : 'text'      , 'attr' : {'maxlength': 255, 'tabindex': 2, 'class': 'required email', 'noname': true}}
,   'address'   : {'type' : 'text'      , 'attr' : {'maxlength': 200, 'tabindex': 4, 'class': 'required', 'noname': true}}
}
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
 * @author      :   quypn - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function init(){
    try{
        initItem(_obj);
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
 * @author      :   quypn - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEvent(){
    try{
        $('#btn-update-user').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    updateUser();
                }
            });
        });
        $('#btn-delete-user').on('click', function(){
            jMessage(8, function(r){
                if(r){
                    deleteUser();
                }
            });
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * updateUser
 *
 * @author      :   quypn - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateUser(){
    try{
        if(validateModule.validate(_obj)){
            $('#form-update-user').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            $('[tabindex=1]').focus();
                        });
                    }
                    else{
                        jMessage(res.msgNo, function(){
                            if(res.msgNo == 7){
                                $('[tabindex=1]').focus();
                            }
                            else{
                                $('[tabindex=2]').focus();
                            }
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
        alert('updateUser: ' + e.message);
    }
}
/**
 * deleteUser
 *
 * @author      :   quypn - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function deleteUser(){
    try{
        $.ajax({
            type        :   'POST',
            url         :   '/admin/users/delete',
            dataType    :   'json',
            data        :   {
                id      :    $('#id').val()
            }, 
            success: function(res) {
                if(res.status){
                    jMessage(9, function(){
                        window.location = '/admin/users';
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
        alert('deleteUser: ' + e.message);
    }
}