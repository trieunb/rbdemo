/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - slide
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
$( document ).ready(function() {
    try{
        initSlide();
        initEventSlide();
    } catch (e) {
        alert('readySlide: ' + e.message);
    }
});
/**
 * initSlide
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initSlide(){
    try{
        $('.slide-imgs').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });

    } catch (e) {
        alert('initSlide: ' + e.message);
    }
}
/**
 * initEventSlide
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventSlide(){
    try{
        $('.readmore-letter').on('click', function(){
            showLetter(this);
        });
        $('.btn-close-letter').on('click', function(){
            hideLetter(this);
        });
        $(document).on('click', '.col-letter.hide-letter', function(){
            hideAndShowLetter(this);
        });
        //hide video when click button off
        $('#trurn-off').on('click', function(){
            $('#video-about-us').removeClass('show');
        });
        $('#btn-close-greeting').on('click', function(){
            $('#msg-of-direction').removeClass('show');
            $('#content-slide').removeClass('hidden-mobi');
            gotoSection('#menu-message');// header.js
        });

        // show video about us
        $('#show-about-us-0').on('click', function(){
            history.pushState(null, null, (locale == 'vi' ? '' : ('/' + locale)) + '/greeting');
        });
        
        $('#hide-about-us-0').on('click', function(){
            history.pushState(null, null, (locale == 'vi' ? '/' : ('/' + locale)));
        });
        
        if($('#showVideoAboutUs').val() == '1'){
            $('#show-about-us-0').click();
        }
    } catch (e) {
        alert('initEventSlide: ' + e.message);
    }
}
/**
 * show more content of one letter
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @param       :   btn - button - the button in div have letter to view
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showLetter(btn){
    try{
        var div = $(btn).parents('.col-letter');
        $(div).addClass('show-letter');
        $(div).find('.readmore-letter').parents('.div-readmore').addClass('hidden');
        $(div).find('.btn-close-letter').parents('.div-readmore').removeClass('hidden');

        if($('#msg-of-direction').hasClass('show')){
            $('#msg-of-direction').removeClass('show');
        }

        if($(div).attr('video') != undefined && $(div).attr('video') != ''){
            // show video
            if($(div).attr('typ') == '1'){
                $('#video-about-us').addClass('show');
                $('#video-about-us').find('iframe').attr('src', $(div).attr('video'));
                if(window.innerWidth < 902){
                    $('#video-about-us').find('iframe').css('height', $('#video-about-us').innerWidth() * 9 / 16);
                }
            } else {// show image 
                $('#letter-img').addClass('show');
                $('#letter-img').find('.letter-img-content').css('background-image', 'url(\'' + $(div).attr('video') + '\')');
                $('#letter-img').find('.letter-img-content-mobi').attr('src', $(div).attr('video'));
            }
            if(!$('#content-slide').hasClass('hidden-mobi')){
                $('#content-slide').addClass('hidden-mobi');
            }
        } else {
            if($('#content-slide').hasClass('hidden-mobi')){
                $('#content-slide').removeClass('hidden-mobi');
            }
        }
        $('.col-letter').each(function(){
            if(!$(this).hasClass('show-letter')){
                $(this).addClass('hide-letter');
            }
            $(this).removeClass('active');
        });
        $(div).addClass('active');
    } catch (e) {
        alert('showLetter: ' + e.message);
    }
}
/**
 * hide content of one letter
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @param       :   btn - button - the button in div have letter to hide
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function hideLetter(btn){
    try{
        var div = $(btn).parents('.col-letter');
        $(div).find('.letter').scrollTop(0);
        $(div).removeClass('show-letter');
        $(div).find('.readmore-letter').parents('.div-readmore').removeClass('hidden');
        $(div).find('.btn-close-letter').parents('.div-readmore').addClass('hidden');
        $('.col-letter').each(function(){
            if($(this).hasClass('hide-letter')){
                $(this).removeClass('hide-letter');
            }
        });
        if($('#video-about-us').hasClass('show')){
            $('#video-about-us').find('iframe').css('height', '');
            $('#video-about-us').removeClass('show');
        }
        if($('#letter-img').hasClass('show')){
            $('#letter-img').removeClass('show');
        }
        if($('#content-slide').hasClass('hidden-mobi')){
            $('#content-slide').removeClass('hidden-mobi');
        }
    } catch (e) {
        alert('hideLetter: ' + e.message);
    }
}
/**
 * hide the div is showing, and show the div was clicked
 *
 * @author      :   quypn - 2017/08/02 - create
 * @author      :
 * @param       :   div - div - the div was clicked
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function hideAndShowLetter(div){
    try{
        $('.col-letter').each(function(){
            if($(this).hasClass('show-letter')){
                $(this).find('.letter').scrollTop(0);
                $(this).removeClass('show-letter');
                $(this).find('.readmore-letter').parents('.div-readmore').removeClass('hidden');
                $(this).find('.btn-close-letter').parents('.div-readmore').addClass('hidden');
                if($('#video-about-us').hasClass('show')){
                    $('#video-about-us').removeClass('show');
                    $('#video-about-us').find('iframe').css('height', '');
                }
                if($('#letter-img').hasClass('show')){
                    $('#letter-img').removeClass('show');
                }
            }
            else{
                $(this).removeClass('hide-letter');
            }
        });
        $(div).addClass('show-letter');
        $(div).find('.readmore-letter').parents('.div-readmore').addClass('hidden');
        $(div).find('.btn-close-letter').parents('.div-readmore').removeClass('hidden');
        if($('#msg-of-direction').hasClass('show')){
            $('#msg-of-direction').removeClass('show');
        }
        if($(div).attr('video') != undefined && $(div).attr('video') != ''){
            if($(div).attr('typ') == '1'){
                $('#video-about-us').addClass('show');
                $('#video-about-us').find('iframe').attr('src', $(div).attr('video'));
                if(window.innerWidth < 902){
                    $('#video-about-us').find('iframe').css('height', $('#video-about-us').innerWidth() * 9 / 16);
                }
            }
            else{
                $('#letter-img').addClass('show');
                $('#letter-img').find('.letter-img-content').css('background-image', 'url(\'' + $(div).attr('video') + '\')');
                $('#letter-img').find('.letter-img-content-mobi').attr('src', $(div).attr('video'));
            }
        }else{
            $('#content-slide').removeClass('hidden-mobi');
        }
        $('.col-letter').each(function(){
            if(!$(this).hasClass('show-letter')){
                $(this).addClass('hide-letter');
            }
            $(this).removeClass('active');
        });
        $(div).addClass('active');
    } catch (e) {
        alert('hideAndShowLetter: ' + e.message);
    }
}