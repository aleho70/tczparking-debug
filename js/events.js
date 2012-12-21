// IMPORTANT: see device.js for document.addEventListener() for each event
var onSearchKeyDown = function() {
	Debug.info('*** SEARCHKEY');
//    $('#eventOutput').html('<span id="searchbuttontext" style="color:#28b;"><code>searchbutton</code> fired</span>');
//    $('#searchbuttontext').fadeOut(1500, function(){});
};
var onMenuButtonDown = function() {
	Debug.info('*** MENUBUTTON');
//    $('#eventOutput').html('<span id="menubuttontext" style="color:#2b8;"><code>menubutton</code> fired</span>');
//    $('#menubuttontext').fadeOut(1500, function(){});
};
var onEventFired = function() {  // generic logging event handler
	Debug.info('*** EVENT');
};
// IMPORTANT: see device.js for document.addEventListener() for each event

var onPause = function() {
	Debug.info('*** PAUSE');
};
var onResume = function() {
	Debug.info('*** RESUME');
};
var onOnline = function() {
	Debug.info('*** ONLINE');
};
var onOffline = function() {
	Debug.info('*** OFFLINE');
};
