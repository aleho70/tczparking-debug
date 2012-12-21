var Debug = function(){
	var logHistory = '';
	var DEBUG = true;
	var DEBUG_LEVEL = 0; //only log=0, info=1, warn=2, error=3}
	var logIt = function(message) {
		var dateTime = new Date()
		logHistory += dateTime.toLocaleTimeString() + ' ('+dateTime.getMilliseconds()+'): ' + message+'\n';
		$('#textLog').val(logHistory);
	};
	return {
		log : function(message) { if(DEBUG && console && DEBUG_LEVEL<=0) console.log(message); /*logIt(message);*/ },
		info : function(message) { if(DEBUG && console && DEBUG_LEVEL<=1) console.log(message); logIt(message); },
		warn : function(message) { if(DEBUG && console && DEBUG_LEVEL<=2) console.warn(message); logIt(message); },
		error : function(message) { if(DEBUG && console && DEBUG_LEVEL<=3) console.error(message); logIt(message); }
	};
}();

$(document).on('mobileinit', function(){
	Debug.info('*** MOBILEINIT');
	// Building PhoneGap (Cordova) apps with jQuery Mobile
	//   http://jquerymobile.com/demos/1.2.0/docs/pages/phonegap.html
	$.mobile.allowCrossDomainPages = true; //
	//  $.mobile.phonegapNavigationEnabled = true;  // If and only if your Android (Honeycomb) PhoneGap application uses a full page refresh (eg. for form validation) 
	// PhoneGap tips & tricks
	$.mobile.pushStateEnabled = false; // Enhancement to use history.replaceState in supported browsers, to convert the hash-based Ajax URL into the full document path. Note that we recommend disabling this feature if Ajax is disabled or if external links are used extensively.
	$.mobile.ajaxEnabled = false;
	$.mobile.page.prototype.options.backBtnText = 'Zpět';

	$.mobile.loader.prototype.options.text = 'loading';
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = 'a';
	$.mobile.loader.prototype.options.html = '';

	//http://stackoverflow.com/questions/11024464/speeding-up-page-transitions-in-jquery-mobile-1-1-for-iphone-apps-built-with-pho
	$.mobile.buttonMarkup.hoverDelay = 0;
	
	// layout.js
	$.support.touchOverflow = true;
	$.mobile.touchOverflowEnabled = true;
	//$.mobile.fixedToolbars.setTouchToggleEnabled(false);

});
