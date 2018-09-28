/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - User/Profile
    *
    * 処理概要      :   
    * 作成日        :   2017/08/16
    * 作成者        :   quypn – quypn@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   ADMIN/USERS
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
var _obj2 = {
    'oldpass'     : {'type' : 'password'    , 'attr' : {'maxlength': 50,  'tabindex': 7, 'class': 'required', 'noname': true}}
,   'newpass'     : {'type' : 'password'    , 'attr' : {'maxlength': 50,  'tabindex': 8, 'class': 'required', 'noname': true}}
,   'confirmpass' : {'type' : 'password'    , 'attr' : {'maxlength': 50,  'tabindex': 9, 'class': 'required', 'noname': true}}
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
        initItem(_obj2);
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
        $('#btn-save-profile').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    updateProfile();
                }
            });
        });
        $('#btn-save-pass').on('click', function(){
            jMessage(18, function(r){
                if(r){
                    savePass();
                }
            });
        });
        $('#newpass').on('change', function(){
            var check = /^(?=.{8,50}$)(?=.*\d)(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).*$/;
            if(check.test($('#newpass').val())){
                validateModule.clearErrorItem('#newpass',_text[25]);
            }
        });
        $('#confirmpass, #newpass').on('change', function(){
            if($('#newpass').val() == $('#confirmpass').val()){
                validateModule.clearErrorItem('#confirmpass',_text[17]);
            }
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * updateProfile
 *
 * @author      :   quypn - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function updateProfile(){
    try{
        if(validateModule.validate(_obj)){
            $('#form-update-profile').ajaxSubmit({
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
        alert('updateProfile: ' + e.message);
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
function savePass(){
    try{
        var errorConfirmPass = false;
        if($('#newpass').val() != $('#confirmpass').val()){
            errorConfirmPass = true;
            $('#confirmpass').errorStyle(_text[17]);
        }
        var errorPass = false;
        if ($('#newpass').val() != ''){
            var check = /^(?=.{8,50}$)(?=.*\d)(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).*$/;
            errorPass = !check.test($('#newpass').val());
            if(errorPass){
                $('#newpass').errorStyle(_text[25]);
            }
        }
        if(validateModule.validate(_obj2) && !errorConfirmPass && !errorPass){
            $('#form-change-pass').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(19, function(){
                            $('#oldpass').val('');
                            $('#newpass').val('');
                            $('#confirmpass').val('')
                            $('[tabindex=7]').focus();
                        });
                    }
                    else{
                        jMessage(res.msgNo, function(){
                            $('[tabindex=7]').focus();
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
        alert('savePass: ' + e.message);
    }
}