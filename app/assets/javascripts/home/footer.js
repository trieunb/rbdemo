/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * HOME - footer
    *
    * 処理概要      :   
    * 作成日        :   2017/08/07
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
        initFooter();
        initEventFooter();
    } catch (e) {
        alert('readyFooter: ' + e.message);
    }
});
/**
 * initFooter
 *
 * @author      :   quypn - 2017/08/07 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initFooter(){
    try{
        initMap();
    } catch (e) {
        alert('initFooter: ' + e.message);
    }
}
/**
 * initEventFooter
 *
 * @author      :   quypn - 2017/08/07 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventFooter(){
    try{
        //event show button to top when scrool
        $(window).on('scroll', function() {
            showBtnToTop();
        });
        $('#btn-to-top').on('click', function(){
            toTop();
        });
        $('#chat-fb').on('click', function(){
            showFbMessage();
        });
        $('#layer-map').on('click', function(){
            showSocial('google-map');
        });
        $('#layer-fb').on('click', function(){
            showSocial('page-fb');
        });
        $('.btn-close-social').on('click', function(){
            hideSocial();
        });
    } catch (e) {
        alert('initEventFooter: ' + e.message);
    }
}
/**
 * show button to top when scrool
 *
 * @author      :   quypn - 2017/08/07 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showBtnToTop(){
    try{
        var scroll = $(window).scrollTop();
        if(scroll > 0){
            $('#btn-to-top').addClass('show');
        }
        else{
            $('#btn-to-top').removeClass('show');
        }
    } catch (e) {
        alert('showBtnToTop: ' + e.message);
    }
}
/**
 * set scrool to top
 *
 * @author      :   quypn - 2017/08/07 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function toTop(){
    try{
        $("html, body").animate({ scrollTop: 0 }, 300);
    } catch (e) {
        alert('toTop: ' + e.message);
    }
}
/**
 * show orr hide the FB message box
 *
 * @author      :   quypn - 2017/08/07 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showFbMessage(){
    try{
        var div = $('#chat-fb').parents('.chat-fb');
        if($(div).hasClass('show')){
            $(div).removeClass('show');
        }
        else{
            $(div).addClass('show');
        }
    } catch (e) {
        alert('showFbMessage: ' + e.message);
    }
}
/**
 * google maps
 * -----------------------------------------------
 * @author      :   quypn - 2017/08/07 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :   remark
 */
 function initMap() {
    try{
        $('#google-map').css('height', $('#col-contact-us').innerHeight());
        var myCenter = new google.maps.LatLng(lat, lng);
        var mapCanvas = document.getElementById("google-map");
        var mapOptions = {center: myCenter, zoom: 15};
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var marker = new google.maps.Marker({position:myCenter});
        marker.setMap(map);
        var infowindow = new google.maps.InfoWindow({
            content: address
        });
        google.maps.event.addListener(marker,'click',function() {
            infowindow.open(map,marker);
        });
        google.maps.event.addListener(marker,'mouseover',function() {
            infowindow.open(map,marker);
        });
    } catch (e) {
        alert('initMap: ' + e.message);
    }
}
/**
 * show info of map and FB
 * -----------------------------------------------
 * @author      :   quypn - 2017/08/07 - create
 * @param       :   divShow - string - id of div will show
 * @return      :   null
 * @access      :   public
 * @see         :   remark
 */
function showSocial(divShow){
    try{
        $('#' + divShow).parents('.footer-col').removeClass('hide-social');
        $('#layer-map').parents('.footer-col').addClass('hidden')
    } catch (e) {
        alert('showSocial: ' + e.message);
    }
}
/**
 * hide info of map and FB
 * -----------------------------------------------
 * @author      :   quypn - 2017/08/07 - create
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :   remark
 */
function hideSocial(){
    try{
        $('#google-map').parents('.footer-col').addClass('hide-social');
        $('#page-fb').parents('.footer-col').addClass('hide-social');
        $('#layer-map').parents('.footer-col').removeClass('hidden')
    } catch (e) {
        alert('showSocial: ' + e.message);
    }
}