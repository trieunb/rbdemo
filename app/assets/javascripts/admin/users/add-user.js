/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - AddUser
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
    'name'              : {'type' : 'text'      , 'attr' : {'maxlength': 50,  'tabindex': 1, 'class': 'required', 'noname': true}}
,   'username'          : {'type' : 'text'      , 'attr' : {'maxlength': 50,  'tabindex': 2, 'class': 'required alphabet', 'noname': true}}
,   'password'          : {'type' : 'password'  , 'attr' : {'maxlength': 50,  'tabindex': 3, 'noname': true}}
,   'confirmpass'       : {'type' : 'password'  , 'attr' : {'maxlength': 50,  'tabindex': 4, 'noname': true}}
,   'phone'             : {'type' : 'tel'       , 'attr' : {'maxlength': 20,  'tabindex': 6, 'class': 'required numeric', 'noname': true}}
,   'email'             : {'type' : 'text'      , 'attr' : {'maxlength': 255, 'tabindex': 5, 'class': 'required email', 'noname': true}}
,   'address'           : {'type' : 'text'      , 'attr' : {'maxlength': 200, 'tabindex': 7, 'class': 'required', 'noname': true}}
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
        $('#name').on('blur', function(){
            getUsername();
        });
        $('#btn-save-user').on('click', function(){
            jMessage(5, function(r){
                if(r){
                    saveUser();
                }
            });
        });
        $('#password').on('change', function(){
            var check = /^(?=.{8,50}$)(?=.*\d)(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).*$/;
            if(check.test($('#password').val())){
                validateModule.clearErrorItem('#password',_text[25]);
            }
        });
        $('#confirmpass, #password').on('change', function(){
            if($('#password').val() == $('#confirmpass').val()){
                validateModule.clearErrorItem('#confirmpass',_text[17]);
            }
        });
    }
    catch(e){
        alert('initEvent: ' + e.message);
    }
}
/**
 * get username login from full name of user
 *
 * @author      :   quypn - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function getUsername(){
    try{
        if($('#name').val() == ''){
            $('#username').val('');
        }
        var manes = $('#name').val().toLowerCase().split(' ');
        var str = manes[manes.length - 1];
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        var length = manes.length - 1;
        for(var i = 0; i < length; i++){
            if(manes[i].length > 0){
                str += manes[i].substring(0,1);
            }
        }
        str = str.replace(/[^a-zA-Z0-9]/g, "")
        $('#username').val(str);
    }
    catch(e){
        alert('getUsername: ' + e.message);
    }
}
/**
 * save data of user
 *
 * @author      :   quypn - 2017/08/16 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function saveUser(){
    try{
        var errorConfirmPass = false;
        if($('#password').val() != $('#confirmpass').val()){
            errorConfirmPass = true;
            $('#confirmpass').errorStyle(_text[17]);
        }
        var errorPass = false;
        if ($('#password').val() != ''){
            var check = /^(?=.{8,50}$)(?=.*\d)(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).*$/;
            errorPass = !check.test($('#password').val());
            if(errorPass){
                $('#password').errorStyle(_text[25]);
            }
        }
        if(validateModule.validate(_obj) && !errorConfirmPass && !errorPass){
            $('#form-add-user').ajaxSubmit({
                beforeSubmit: function(a,f,o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if(res.status){
                        jMessage(6, function(){
                            window.location = '/admin/users/edit?id=' + res.idUser;
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
        alert('saveUser: ' + e.message);
    }
}