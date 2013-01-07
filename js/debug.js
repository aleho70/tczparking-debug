var Debug = function(){
	var logHistory = '';
	var DEBUG = true;
	var DEBUG_LEVEL = 1; //only log=0, info=1, warn=2, error=3}
	var logIt = function(level, message) {
    if(DEBUG && console && level>=DEBUG_LEVEL) {
      switch(level) {
        case 0 : console.log(message); break;
        case 1 : console.log(message); break;
        case 2 : console.warn(message); break;
        case 3 : console.error(message); break;
      }
    }
      /*var callbackFunctionName = callback.toString().match(/function ([^\(]+)/);//[1];
      if(callbackFunctionName) callbackFunctionName = callbackFunctionName[1]; 
      else callbackFunctionName = 'anonymous function';
      console.log(callbackFunctionName);
    var callbackFunctionName = arguments.callee.caller.toString().match(/function ([^\(]+)/);//[1];
    if(callbackFunctionName) callbackFunctionName = callbackFunctionName[1]; 
    else callbackFunctionName = 'anonymous function';
      */
  
    if(level>=DEBUG_LEVEL && $) {
      $textLog = $('#textLog');
      if($textLog) {
        var dateTime = new Date();
        logHistory += dateTime.toLocaleTimeString() + ' ('+dateTime.getMilliseconds()+'): ' + message+'\n';
        $textLog.val(logHistory).attr('readonly','readonly').keyup();;
      }
    }
	};
	return {
		log : function(message) { logIt(0, message); },
  	info : function(message) { logIt(1, message); },
		warn : function(message) { logIt(2, message); },
		error : function(message) { logIt(3, message); },
		setDebugLevel : function(level) { DEBUG_LEVEL = level; },
    clearLogHistory : function() { 
      logHistory = ''; 
      if($) {
        $textLog = $('#textLog');
        if($textLog)
          $textLog.val(logHistory).css("height", 40).keyup(); 
      }
    }
	};
}();
