// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
//
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
//
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC.
//
/**
 * ****************************************************************************
 * MANNET
 * DIALOG
 * 
 * 処理概要		:	edit library jalert
 * 作成日		:	2015/09/23
 * 作成者		:	viettd – viettd@ans-asia.com
 * 
 * 更新日		:	
 * 更新者		:	
 * 更新内容		:	
 * 
 * @package		:	COMMON
 * @copyright	:	Copyright (c) ANS-ASIA
 * @version		:	1.0.0
 * ****************************************************************************
 */
(function($) {
	$.alerts = {
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: 1,                // transparency level of overlay
		overlayColor: 'rgba(0, 0, 0, 0.4)',               // base color of overlay
		draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;', // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		// Public methods
		// alert
		alert: function(message, title, callback) {
			if( title == null ) title = '確認';
			$.alerts._show(title, message, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		// confirm
		confirm: function(message, title, callback) {
			if( title == null ) title = '確認';
			$.alerts._show(title, message, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
		// info
		info: function(message, title, callback) {
			if( title == null ) title = '報告';
			$.alerts._show(title, message, 'info', function(result) {
				if( callback ) callback(result);
			});
		},
		// success
		success: function(message, title, callback) {
			if( title == null ) title = '完了し';
			$.alerts._show(title, message, 'success', function(result) {
				if( callback ) callback(result);
			});
		},
		// warning
		warning: function(message, title, callback) {
			if( title == null ) title = '警告';
			$.alerts._show(title, message, 'warning', function(result) {
				if( callback ) callback(result);
			});
		},
		//error
		error: function(message, title, callback) {
			if( title == null ) title = '禁止';
			$.alerts._show(title, message, 'error', function(result) {
				if( callback ) callback(result);
			});
		},
		// Private methods
		// show method
		_show: function(title, msg, type, callback) {
			$.alerts._hide();
			$.alerts._overlay('show');
			$("body").append(
			'<div id="popup_container">' +
				'<div id="popup_icon"></div>' +
				'<div id="popup_content">' +
					'<div id="popup_message"></div>' +
				'</div>' +
			'</div>');
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			// IE6 Fix
//			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed';
//			$("#popup_container").css({
//				position: pos,
//				zIndex: 999999,
//				padding: 0,
//				margin: 0
//			});
			$("#popup_icon").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth() + 5,
				maxWidth: $("#popup_container").outerWidth() + 5
			});
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			switch( type ) {
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><button id="popup_ok" class="btn">' + $.alerts.okButton + '</button> <button id="popup_cancel" class="btn">' + $.alerts.cancelButton + '</button></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 27 ) 
							$("#popup_cancel").trigger('click');
						if( e.keyCode == 13 ) 
							if($("#popup_ok").is(":focus"))
								$("#popup_ok").trigger('click');
							else if($("#popup_cancel").is(":focus"))
								$("#popup_cancel").trigger('click');
					});
				break;
				default:
					$("#popup_message").after('<div id="popup_panel"><button id="popup_ok" class="btn">' + $.alerts.okButton + '</button></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
					break;
			}
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		// hide method
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		// overlay method
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 1030,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		// reposition method
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			// IE6 fix
//			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
//			$("#popup_container").css({
//				top: top + 'px',
//				left: left + 'px'
//			});
			$("#popup_overlay").height( $(document).height() );
		},
		// _maintainPosition method
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
	};
	// Shortuct functions
	// jAlert function
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}; 
	// jConfirm function
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
	// jInfo function
	jInfo = function(message, title, callback) {
		$.alerts.info(message, title, callback);
	};
	// jSuccess function
	jSuccess = function(message, title, callback) {
		$.alerts.success(message, title, callback);
	};
	// jWarning function
	jWarning = function(message, title, callback) {
		$.alerts.warning(message, title, callback);
	};
	// jError function
	jError = function(message, title, callback) {
		$.alerts.error(message, title, callback);
	};
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	// Create jMessage()
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	jMessage = function(id, callback, options, type){
		//get mesage
		var message =  _text[id];
		if(options !=undefined){
			message = options;
		}
		//get type
		var type_msg = _type_msg[id];
		if(type !=undefined){
			type_msg = type;
		}
		//Unblock screen
        //closeWaiting();
        //Type messagebox
		if(type_msg==1){
			jConfirm(message, _title[id], callback);
		}else if(type_msg==2){
			jSuccess(message, _title[id], callback);
		}else if(type_msg==3){
			jWarning(message, _title[id], callback);
		}else if(type_msg==4){
			jError(message, _title[id], callback);
		}else if(type_msg==5){
			jWarning(message, _title[id], callback);
		}else if(type_msg==6){
			jError(message, _title[id], callback);
		}else{
			jError('Unknow type message', null, callback);
		}
	};
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	// Create jMessage() with str : vulq 29/07/2016
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	jMessage_str = function(id,str, callback, options){
		if (typeof str === "undefined" || str === null) { 
		    str = ''; 
		 }
		message = '';
		if(options !=undefined){
			message = options;
		}else{
			message = str+_text[id];
		}
		if(_type_msg[id]==1){
			jAlert(message, _title[id], callback);
		}else if(_type_msg[id]==2){
			jConfirm(message, _title[id], callback);
		}else if(_type_msg[id]==3){
			jInfo(message, _title[id], callback);
		}else if(_type_msg[id]==4){
			jSuccess(message, _title[id], callback);
		}else if(_type_msg[id]==5){
			jWarning(message, _title[id], callback);
		}else if(_type_msg[id]==6){
			jError(message, _title[id], callback);
		}else{
			jError('Unknow type message', null, callback);
		}
	};

})(jQuery);