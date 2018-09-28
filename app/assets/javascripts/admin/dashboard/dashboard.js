/**
    * ****************************************************************************
    * BRSE-SCHOOL
    * ADMIN - Dashdoard
    *
    * 処理概要      :   
    * 作成日        :   2017/07/31
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
var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90

$(document).ready(function() {
    try{
        initDashboard();
        initEventDashboard();
    }
    catch(e){
        alert('ready: ' + e.message);
    }
});
function initDashboard(){
    try{
        setInterval(drawClock, 1000);
        getWeather();
        table = $('.dt-responsive').DataTable({
            bFilter: false,
            'language': getDataTableLang(),
            "aoColumnDefs": [{ "bSortable": false, "aTargets": [ 4, 8, 9 ] }],
            "order": [[ 7, "desc" ]]
        });
        setTabIndexTable('#div-table-regist-courses');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch(e){
        alert('initDashboard: ' + e.message);
    }
}
function initEventDashboard(){
    try{
        $('#weather-city').on('change', function(){
            localStorage.setItem('idCity', $(this).val());
            getWeather();
        });
    }
    catch(e){
        alert('initEventDashboard: ' + e.message);
    }
}
function getWeather(){
    try{
        var idCity = localStorage.getItem('idCity');
        if (idCity != null){
            $('#weather-city').val(idCity);
        }
        $.ajax({
            type        :   'POST',
            url         :   '/admin/refer-weather',
            dataType    :   'json',
            data        :   {
                id      :    idCity == null ? $('#weather-city').val() : idCity
            }, 
            success: function(res) {
                if(res.status){
                    $('#div-weather').html(res.html);
                    init_skycons();
                    setWeather();
                }
            }
        });
    } catch (e) {
        alert('getWeather: ' + e.message);
    }
}
/**
 * set info of day for weather block 
 *
 * @author      :   quypn - 2017/07/31 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setWeather(){
    try{
        var days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        if (locale == 'ja'){
            days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
        }
        if (locale == 'en'){
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        } 
        $(".daily-weather .day").each(function(){
            var date = new Date(parseFloat($(this).text().trim())*1000);
            $(this).text(days[date.getDay()]);
        });
        var date = new Date();
        $('.temperature').html('<b>' + days[date.getDay()] + '</b>, ' + date.toLocaleDateString());
    }
    catch(e){
        alert('setWeather: ' + e.message);
    }
}
/**
 * draw the Analog Clock
 *
 * @author      :   quypn - 2017/07/31 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function drawClock() {
    try{
        drawFace(ctx, radius);
        drawNumbers(ctx, radius);
        drawTime(ctx, radius);
    }
    catch(e){
        alert('drawClock: ' + e.message);
    }
}
/**
 * draw the face of Clock
 *
 * @author      :   quypn - 2017/07/31 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function drawFace(ctx, radius) {
    try{
        var grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2*Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius*0.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }
    catch(e){
        alert('drawFace: ' + e.message);
    }
}
/**
 * draw numbers on Clock
 *
 * @author      :   quypn - 2017/07/31 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function drawNumbers(ctx, radius) {
    try{
        var ang;
        var num;
        ctx.font = radius*0.15 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        for(num = 1; num < 13; num++){
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius*0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius*0.85);
            ctx.rotate(-ang);
        }
    }
    catch(e){
        alert('drawNumbers: ' + e.message);
    }
}
/**
 * move the clockwise
 *
 * @author      :   quypn - 2017/07/31 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function drawTime(ctx, radius){
    try{
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour=hour%12;
        hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60));
        drawHand(ctx, hour, radius*0.5, radius*0.07);
        //minute
        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
        drawHand(ctx, minute, radius*0.8, radius*0.07);
        // second
        second=(second*Math.PI/30);
        drawHand(ctx, second, radius*0.9, radius*0.02);
    }
    catch(e){
        alert('drawTime: ' + e.message);
    }
}
/**
 * draw the clockwise
 *
 * @author      :   quypn - 2017/07/31 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function drawHand(ctx, pos, length, width) {
    try{
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
    catch(e){
        alert('drawHand: ' + e.message);
    }
}