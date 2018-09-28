/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - header
    *
    * 処理概要      :   
    * 作成日        :   2017/08/02
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
var isShowMenu = false;
var topHeight = 120;
var heightToTop = 65;
var sections =['header', 'media', 'courses', 'footer'];
// var menus =['menu-home', 'menu-message', 'menu-media', 'menu-courses', 'menu-contact'];
var menus =['menu-home', 'menu-media', 'menu-courses', 'menu-contact'];
$( document ).ready(function() {
    try{
        initHeader();
        initEventHeader();
    } catch (e) {
        alert('readyHeader: ' + e.message);
    }
});
/**
 * initHeader
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initHeader(){
    try{
        setLangFlag();
        scrollEvent();
        checkSelectMenu();
    } catch (e) {
        alert('readyFooter: ' + e.message);
    }
}
/**
 * initEventHeader
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventHeader(){
    try{
        //event when click menu on mobile
        $('.event-menu li a').on('click', function() {
            viewMenuMobile();
        });
        //event when click logo
        $('#logo').on('click', function(){
            window.location = window.location;
        });
        //event when click menu
        $('.menu-item').on('click', function(){
            gotoSection(this);
        });
        //show message when click menu message
        $('#menu-message').on('click', function(){
            $('#msg-of-direction').addClass('show');
            $('#content-slide').addClass('hidden-mobi');
            $('#video-about-us').removeClass('show');
            $('#letter-img').removeClass('show');
        });
        //show form regist course
        $('#btn-apply-course').on('click', function(){
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/apply');
            $('#regist-courses').addClass('show');
            $('#regist-courses #id-course-selected').focus();
            $('body').css('overflow-y', 'hidden');
        })
        //event set style menu when resize window
        $(window).resize(function() {
            if(window.innerWidth >= 648){
                $('#nav-menu-main').removeAttr('style');
                isShowMenu = false;
            }
        });
        //event fix header when scrool
        $(window).on('scroll', function() {
            scrollEvent();
            checkSelectMenu();
        });
        $('.header-lang').on('click', function(){
            setLinkWithLang(this);
        });
    } catch (e) {
        alert('initEventHeader: ' + e.message);
    }
}
/**
 * show and hide menu in mobile
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function viewMenuMobile(){
    try{
        if(window.innerWidth < 648){
            if(!isShowMenu){
                $('#nav-menu-main').show(200);
            }else{
                $('#nav-menu-main').hide(200);
            }
            isShowMenu = !isShowMenu;
        }
    } catch (e) {
        alert('viewMenuMobile: ' + e.message);
    }
}
/**
 * calculate the height of menu
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @return      :   int - the hieght of menu
 * @access      :   public
 * @see         :
 */
function calcTopHeight(){
    try{
        topHeight = 120;
        heightToTop = 65;
        var witdh = window.innerWidth;
        if(witdh < 991 && witdh >= 480){
            topHeight = 115;
        }
        if(witdh < 480){
            topHeight = 107;
        }
        if(witdh < 648){
            heightToTop = 58;
        }
        return topHeight + heightToTop;
    } catch (e) {
        alert('calcTopHeight: ' + e.message);
    }
}
/**
 * fix header when scrool
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function scrollEvent(){
    try{
        var scroll = $(window).scrollTop();
        var heightToTop = calcTopHeight();
        if(scroll >= topHeight){
            $('#header').addClass('fix-menu');
            $('.margin-for-top').css('height', heightToTop);
        }
        else{
            $('#header').removeClass('fix-menu');
            $('.margin-for-top').css('height', 0);
        }
    } catch (e) {
        alert('scrollEvent: ' + e.message);
    }
}
/**
 * set to view flag in menu follow language
 *
 * @author      :   quypn - 2017/08/03 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setLangFlag(){
    try{
        $('.lang').removeClass('active');
        $('#' + lang).addClass('active');
    } catch (e) {
        alert('setLangFlag: ' + e.message);
    }
}
/**
 * scrool to section when click menu
 *
 * @author      :   quypn - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function gotoSection(menu){
    try{
        var section = $(menu).attr('section');
        $('.menu-item').removeClass('active');
        $(menu).addClass('active');
        $(menu).focus();
        $('html, body').animate({
            scrollTop: $('#' + section).offset().top - $('#main-menu').outerHeight()
        }, 300);
    } catch (e) {
        alert('gotoSection: ' + e.message);
    }
}
/**
 * check to select menu when scrool
 *
 * @author      :   quypn - 2017/08/09 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function checkSelectMenu(){
    var scroll = $(window).scrollTop();
    var length = menus.length;
    for(var i = 0; i < length; i++){
        if(scroll >= $('#' + sections[i]).offset().top - $('#main-menu').outerHeight()){
            $('.menu-item').removeClass('active');
            $('#' + menus[i]).addClass('active');
        }
    }

    //scrolled to the bottom
    if(scroll + $(window).height() >= $(document).height()) {
        $('.menu-item').removeClass('active');
        $('#menu-contact').addClass('active');
    }
}
/**
 * add param lang to link redirec
 *
 * @author      :   quypn - 2017/09/25 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setLinkWithLang(btn_lang){
    try{
        var key = escape('lang');
        var value = escape($(btn_lang).attr('id'));
        if(window.location.search.indexOf('lang=') == -1){
            var url_string = window.location.pathname;
            if (url_string.indexOf('/ja') >= 0) {
                window.location.pathname = url_string.replace('/ja', '/' + value);
            } else if (url_string.indexOf('/en') >= 0) {
                window.location.pathname = url_string.replace('/en', '/' + value);
            } else if (url_string.indexOf('/vi') >= 0){
                window.location.pathname = url_string.replace('/vi', '/' + value);
            } else{
                window.location.pathname = '/' + value + url_string;
            }
        } else{
            var kvp = document.location.search.substr(1).split('&');
            if (kvp == '') {
                document.location.search = '?' + key + '=' + value;
            }
            else {
                var i = kvp.length; var x; while (i--) {
                    x = kvp[i].split('=');
                    if (x[0] == key) {
                        x[1] = value;
                        kvp[i] = x.join('=');
                        break;
                    }
                }
                if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
                document.location.search = kvp.join('&');
            }
        }
    } catch (e) {
        alert('setLinkWithLang: ' + e.message);
    }
}