var Debug = function(){
	var logHistory = '';
	var DEBUG = true;
	var DEBUG_LEVEL = 1; //only log=0, info=1, warn=2, error=3}
	var logIt = function(message) {
		var dateTime = new Date()
		logHistory += dateTime.toLocaleTimeString() + ' ('+dateTime.getMilliseconds()+'): ' + message+'\n';
    if($) {
      $textLog = $('#textLog');
      if($textLog)
        $textLog.val(logHistory).attr('readonly','readonly').keyup();;
    }
	};
	return {
//		log : function(message) { if(DEBUG && console && DEBUG_LEVEL<=0) console.log(message); /*logIt(message);*/ },
//		info : function(message) { if(DEBUG && console && DEBUG_LEVEL<=1) console.log(message); logIt(message); },
		info : function(message) { if(DEBUG && console && DEBUG_LEVEL<=0) { console.log(message); logIt(message); } },
		log : function(message) { if(DEBUG && console && DEBUG_LEVEL<=1) { console.log(message); logIt(message); } },
		warn : function(message) { if(DEBUG && console && DEBUG_LEVEL<=2) { console.warn(message); logIt(message); } },
		error : function(message) { if(DEBUG && console && DEBUG_LEVEL<=3) { console.error(message); logIt(message); } },
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
