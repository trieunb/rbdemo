/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
      var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args); 
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100); 
        };
    };

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

// Sidebar
function init_sidebar() {
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
    	// reset height
    	$RIGHT_COL.css('min-height', $(window).height());

    	var bodyHeight = $BODY.outerHeight(),
    		footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
    		leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
    		contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
    	// normalize content
    	contentHeight = contentHeight - ($NAV_MENU.height() + footerHeight + 24);

    	$RIGHT_COL.css('min-height', contentHeight);
    };

    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();
        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }else
            {
    			if ( $BODY.is( ".nav-sm" ) )
    			{
    				$SIDEBAR_MENU.find( "li" ).removeClass( "active active-sm" );
    				$SIDEBAR_MENU.find( "li ul" ).slideUp();
    			}
    		}
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu 
    $MENU_TOGGLE.on('click', function() {
    	if ($BODY.hasClass('nav-md')) {
    		$SIDEBAR_MENU.find('li.active ul').hide();
    		$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
    	} else {
    		$SIDEBAR_MENU.find('li.active-sm ul').show();
    		$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
    	}
    	$BODY.toggleClass('nav-md nav-sm');
    	setContentHeight();
    	$('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
    });

    // check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
    	return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
    	setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing
    $(window).smartresize(function(){  
    	setContentHeight();
    });
    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
    	$('.menu_fixed').mCustomScrollbar({
    		autoHideScrollbar: true,
    		theme: 'minimal',
    		mouseWheel:{ preventDefault: true }
    	});
    }
};
// /Sidebar
var randNum = function() {
  return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
};

// Panel toolbox
$(document).ready(function() {
    $('.collapse-link').on('click', function() {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');
        
        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200); 
            $BOX_PANEL.css('height', 'auto');  
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

// Switchery
$(document).ready(function() {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery

// iCheck
$(document).ready(function() {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}

// Accordion
$(document).ready(function() {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).load(function () {
        NProgress.done();
    });
}
//hover and retain popover when on popover content
var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function(obj) {
    var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
    var container, timeout;
    originalLeave.call(this, obj);

    if (obj.currentTarget) {
        container = $(obj.currentTarget).siblings('.popover');
        timeout = self.timeout;
        container.one('mouseenter', function() {
            //We entered the actual popover – call off the dogs
            clearTimeout(timeout);
            //Let's monitor popover content instead
            container.one('mouseleave', function() {
                $.fn.popover.Constructor.prototype.leave.call(self, self);
            });
        });
    }
};

$('body').popover({
    selector: '[data-popover]',
    trigger: 'click hover',
    delay: {
        show: 50,
        hide: 400
    }
});

function gd(year, month, day) {
	return new Date(year, month - 1, day).getTime();
}
	
function init_skycons(){	
	if( typeof (Skycons) === 'undefined'){ return; }
	var icons = new Skycons({
		"color": "#73879C"
	}),
	list = [
		"clear-day", "clear-night", "clear", "partly-cloudy-day",
		"partly-cloudy-night", "cloudy", "clouds", "rain", "sleet", "snow", "wind",
		"fog"
	],
	i;
	for (i = list.length; i--;) icons.set(list[i], list[i]);
    icons.play();
}
$(document).ready(function() {
	init_sidebar();
	$('.lang-admin').on('click', function(){
        setLangAdmin(this);
    });
    setMenuAdminActive();
    $('#language-trans').on('click', function(){
        $('.col-trans').removeClass('ja');
        $('.col-trans').removeClass('en');
        $('.col-trans').addClass($('#language-trans').val());
    });
    $(window).on('scroll', function() {
        showBtnToTop();
    });
    $('#btn-to-top').on('click', function(){
        toTop();
    });
});
function getDataTableLang(){
    try{
        var dataTable_vi = {
            "emptyTable":     "No data available in table",
            "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty":      "Showing 0 to 0 of 0 entries",
            "infoFiltered":   "(filtered from _MAX_ total entries)",
            "lengthMenu":     "Show _MENU_ entries",
            "loadingRecords": "Loading...",
            "processing":     "Processing...",
            "search":         "Search:",
            "zeroRecords":    "No matching records found",
            "paginate": {
                "first":      "First",
                "last":       "Last",
                "next":       "Next",
                "previous":   "Previous"
            }
        }
        var dataTable_ja = {
            "emptyTable":     "テーブルにデータがありません。",
            "info":           "_START_を_TOTAL_エントリーの_END_に表示しています。",
            "infoEmpty":      "0を0エントリーの0に表示しています。",
            "infoFiltered":   "(_MAX_ のトータルエントリーからフィルターしました)",
            "lengthMenu":     "_MENU_ エントリーを表示します",
            "loadingRecords": "読み込み中...",
            "processing":     "処理中...",
            "search":         "検索:",
            "zeroRecords":    "マッチングレコードが見つかりません。",
            "paginate": {
                "first":      "最初",
                "last":       "最後",
                "next":       "次へ",
                "previous":   "前へ"
            }
        }
        var dataTable_en = {
            "emptyTable":     "No data available in table",
            "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty":      "Showing 0 to 0 of 0 entries",
            "infoFiltered":   "(filtered from _MAX_ total entries)",
            "lengthMenu":     "Show _MENU_ entries",
            "loadingRecords": "Loading...",
            "processing":     "Processing...",
            "search":         "Search:",
            "zeroRecords":    "No matching records found",
            "paginate": {
                "first":      "First",
                "last":       "Last",
                "next":       "Next",
                "previous":   "Previous"
            }
        }
        var lang = $.cookie("lang");
        if(lang == undefined){
            lang = 'vi';
        }
        if(lang == 'vi'){
            return dataTable_vi;
        }
        if(lang == 'ja'){
            return dataTable_ja;
        }
        if(lang == 'en'){
            return dataTable_en;
        }
    } catch (e) {
        return dataTable_vi;
    }
}
/**
 * save language user choose to cookies
 *
 * @author      :   quypn - 2017/08/14 - create
 * @author      :
 * @param       :   
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setLangAdmin(btn){
    try{
        $.cookie("lang", $(btn).attr('lang'), { expires: 30, path:'/admin' });
        window.location = window.location;
    } catch (e) {
        alert('setLangAdmin: ' + e.message);
    }
}
/**
 * set active for button follow language choosen
 *
 * @author      :   quypn - 2017/08/14 - create
 * @author      :
 * @param       :   
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setMenuAdminActive(){
    try{
        var lang = $.cookie("lang");
        if(lang == undefined){
            lang = 'vi';
        }
        $('.lang-admin').each(function(){
            if($(this).attr('lang') == lang){
                $(this).addClass('active');
            }
        });
        $('.col-trans').addClass($('#language-trans').val());
    } catch (e) {
        alert('setMenuAdminActive: ' + e.message);
    }
}
/**
 * set data for form translate, control of objêct in form much begin by trans_
 *
 * @author      :   quypn - 2017/08/15 - create
 * @author      :
 * @param       :   
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setDataTrans(obj, data){
    try{
        $.each(obj, function(key, element) {
            if(element['type'] == 'CKEditor' || element['attr']['isCKEditor']){
                CKEDITOR.instances[key].setData(data[key.replace('trans_', '')]);
            }
            else{
                if (element['attr']['isClass'] === true) {
                    $('.' + key).val(data[key.replace('trans_', '')]);
                } else if (element['attr']['file'] == 'image'){
                    $('#' + key).val(data[key.replace('trans_', '')].split("/").last);
                } else {
                    $('#' + key).val(data[key.replace('trans_', '')]);
                }
            }
        });
    }
    catch(e){
        alert('setDataTrans: ' + e.message);
    }
}
function setTabIndexTable(div){
    try{
        var max = 0;
        var min = 999999999;
        $(div + ' [tabindex=0]').each(function(){
            $(this).removeAttr('tabindex');
        })
        $(div + ' [tabindex]').attr('tabindex', function (a, b) {
            max = Math.max(max, +b);
            min = Math.min(min, +b);
        });
        $(div + ' #datatable-responsive_length [name=\'datatable-responsive_length\']').attr('tabindex', min - 2);
        $(div + ' #datatable-responsive_filter [type=\'search\']').attr('tabindex', min - 1);
        $(div + ' #datatable-responsive_paginate .paginate_button').each(function(){
            $(this).find('a').attr('tabindex', ++max);
        });
        return max;
    }
    catch(e){
        alert('setTabIndexTable: ' + e.message);
        return 0;
    }
}
function setTabIndexMenu(){
    try{
        var max = 0;
        $('[tabindex=0]').each(function(){
            $(this).removeAttr('tabindex');
        })
        $('[tabindex]').attr('tabindex', function (a, b) {
            max = Math.max(max, +b);
        });
        $('#profile-menu a').each(function(){
            $(this).attr('tabindex', ++max);
        });
        $('#menu_toggle').attr('tabindex', ++max);
        $('#sidebar-menu a').each(function(){
            $(this).attr('tabindex', ++max);
        });
        $('#sidebar-footer a').each(function(){
            $(this).attr('tabindex', ++max);
        });
        return max;
    }
    catch(e){
        alert('setTabIndexMenu: ' + e.message);
        return 0;
    }
}

/**
 * readImage
 *
 * @author      :   daonx - 2017/08/29 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */   
function readImage(file,width_height,idImage,previewImg) {
    try {
        if(previewImg == undefined || previewImg == null){
            previewImg = true;
        }
        window.URL    = window.URL || window.webkitURL;
        var useBlob   = false && window.URL; // set to `true` to use Blob instead of Data-URL

        var reader    = new FileReader();
        reader.addEventListener("load", function () {
            
            var image = new Image();
            image.addEventListener("load", function () {
                // set widht, height
                if (width_height !== '') {
                    $('#' + width_height).attr('data-width', image.width);
                    $('#' + width_height).attr('data-height', image.height);
                }

                // preview image
                if (previewImg) {
                    $('#' + idImage).attr('src', image.src);
                } else {
                    $('#' + idImage).attr('src', '');
                }

                if (useBlob) {
                    // Free some memory
                    window.URL.revokeObjectURL(image.src);
                }
            });
            image.src     = useBlob ? window.URL.createObjectURL(file) : reader.result;

        });        
        reader.readAsDataURL(file);
    } catch(e) {
        console.log('readImage: ' + e.message);
    }
}
/**
 * show loading progress bar
 *
 * @author      :   quypn - 2017/09/14 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :   app/views/layouts/admin.html.erb
 */   
var uploaded = 0, lastUpTime = 0;
function progress(e, textComplete){
    if(e.lengthComputable){
        var text = 'MB/s';
        var endTime = (new Date()).getTime();
        var upSpeed = (((e.loaded - uploaded)/1024/1024)*1000) / ((endTime - lastUpTime));
        if(upSpeed < 1){
            upSpeed *= 1024;
            text = 'KB/s'
        }
        upSpeed = Math.round(upSpeed);
        var percentage = Math.round((e.loaded * 100)/e.total);
        uploaded = e.loaded;
        lastUpTime = endTime;
        $('#percent-upload .progress-bar').attr('aria-valuenow', percentage);
        $('#percent-upload .progress-bar').css('width', percentage + '%');
        $('#percent-upload span').text(percentage + '% - ' + upSpeed + ' ' + text);
        if(textComplete != undefined && textComplete != null && textComplete != '' && percentage >= 100){
            $('#percent-upload span').text(textComplete);
        }
    }  
}
/**
 * get String Without Diacritics
 *
 * @author      :   havv - 2017/09/20 - create
 * @param       :   str - string
 * @return      :   string
 * @access      :   public
 * @see         :   
 */ 
function getStringWithoutDiacritics(str) {
    var strTemp = str;

    strTemp = strTemp.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    strTemp = strTemp.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    strTemp = strTemp.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    strTemp = strTemp.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    strTemp = strTemp.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    strTemp = strTemp.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    strTemp = strTemp.replace(/đ/g, "d");
    strTemp = strTemp.replace(/[^a-zA-Z0-9---]/g, "")
    strTemp = strTemp.replace(/----/g, "-");
    strTemp = strTemp.replace(/---/g, "-");
    strTemp = strTemp.replace(/--/g, "-");

    return strTemp;
}

/**
 * remove event enter of input tag in form
 *
 * @author      :   havv - 2017/09/25 - create
 * @param       :   str - string
 * @return      :   string
 * @access      :   public
 * @see         :   
 */ 
$(document).ready(function() {
    $(document).on('keyup, keypress','form input', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) { 
            e.preventDefault();
            return false;
        }
    });
});


/**
 * urlExists
 *
 * @author      :   daonx   - 2017/09/29 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function urlExists(url) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    } catch(e) {
        console.log('urlExists: ' + e.message);
    }
}

/**
 * setPreview
 *
 * @author      :   daonx   - 2017/09/15 - create
 * @author      :
 * @param       :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function setPreview(trans_img_preview,trans_img_event,link) {
    try {
        checkUrl = urlExists(link);
        if(checkUrl) {
            // preview image
            $(trans_img_preview).attr('src',link);
        } else {
            $(trans_img_preview).attr('src','');
        }
        // set name image
        $(trans_img_event).val(link.split('/').slice(-1));
    } catch(e) {
        console.log('setPreview: ' + e.message);
    }
}
/**
 * show button to top when scrool
 *
 * @author      :   quypn - 2017/10/02 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function showBtnToTop(){
    try{
        var scroll = $(window).scrollTop();
        if(scroll > 0){
            $('#btn-to-top').removeClass('hidden');
        }
        else{
            $('#btn-to-top').addClass('hidden');
        }
    } catch (e) {
        alert('showBtnToTop: ' + e.message);
    }
}
/**
 * set scrool to top
 *
 * @author      :   quypn - 2017/10/02 - create
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