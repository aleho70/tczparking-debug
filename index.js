var GA_PLUGIN_ID = 'UA-37001546-2'; // web type
           
function onBackbutton() {
	Debug.info('*** BACKBUTTON');
  if($.mobile.activePage.attr("id") == "pageMain"){
		if(navigator.notification) {
			navigator.notification.confirm(
					'Ukončit aplikaci?',
//          onExitApp,
					function(button) {
            if (button == 2) {
              navigator.app.exitApp();
            }
          },
					'TCZ Parking',
					'Ne,Ano'
			);
    } else {
      navigator.app.exitApp();
    }
  } else {
    $.mobile.changePage("#pageMain");
    $.mobile.silentScroll(0);
  }
////    // the intro div is considered home, so exit if use
////    // wants to go back with button from there
//	pageMain
////    if ($('.api-div#api-intro').css('display') === 'block') {
//  if ($('#pageMain').css('display') === 'block') {
//        alert("Exiting app");
//        navigator.app.exitApp();
//    } else {    
////        $('.api-div').hide();
////        $('.api-div#api-intro').show();
//        $.mobile.silentScroll(0);
//    }
}

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
  Timer.pause();
};
var onResume = function() {
	Debug.info('*** RESUME');
  Timer.resume();
};
var onOnline = function() {
	Debug.info('*** ONLINE');
};
var onOffline = function() {
	Debug.info('*** OFFLINE');
};


var GAPlugin = function(){
	var gaPlugin;
	var onSuccess = function() {
		Debug.info('GAPlugin.onSuccess('+JSON.stringify(arguments)+')');
	};
	var onError = function() {
		Debug.error('GAPlugin.onError('+JSON.stringify(arguments)+')');
	};
	return {
		init: function(id) {
			gaPlugin = window.plugins.gaPlugin;
			Debug.info('GAPlugin.init('+JSON.stringify(arguments)+')');
		  if(gaPlugin) gaPlugin.init(onSuccess, onError, id, 10);
		},
		trackEvent: function(category, eventAction, eventLabel, eventValue) {
			Debug.info('GAPlugin.trackEvent('+JSON.stringify(arguments)+')');
			if(gaPlugin) gaPlugin.trackEvent( onSuccess, onError, category, eventAction, eventLabel, eventValue);
		},
		setVariable: function(key, value, index){
			Debug.info('GAPlugin.setVariable('+JSON.stringify(arguments)+')');
			if(gaPlugin) gaPlugin.setVariable(onSuccess, onError, key, value, (index || 1));
		},
		trackPage: function(url) {
			Debug.info('GAPlugin.trackPage('+JSON.stringify(arguments)+')');
			if(gaPlugin) gaPlugin.trackPage(onSuccess, onError, url);
		},
		exit: function(id) {
			Debug.info('GAPlugin.exit('+JSON.stringify(arguments)+')');
		    if(gaPlugin) gaPlugin.exit(onSuccess, onError);
		}
	};
}();

var onDeviceReady = function() {
	Debug.info('*** DEVICEREADY');
	GAPlugin.init(GA_PLUGIN_ID);
  // Debug.info('*** navigator.splashscreen.hide');
  navigator.splashscreen.hide();
    
    // api-device
//    // ***IMPORTANT: access device object only AFTER "deviceready" event    
//    document.getElementById("name").innerHTML = device.name;
//    document.getElementById("pgversion").innerHTML = device.cordova ? device.cordova : device.phonegap;
//    document.getElementById("platform").innerHTML = device.platform;
//    document.getElementById("uuid").innerHTML = device.uuid;
//    document.getElementById("version").innerHTML = device.version;
//    // screen information  ***Not necessary to wait for deviceready event
//    document.getElementById("width").innerHTML = screen.width;
//    document.getElementById("height").innerHTML = screen.height;
//    document.getElementById("availwidth").innerHTML = screen.availWidth;
//    document.getElementById("availheight").innerHTML = screen.availHeight;
//    document.getElementById("colorDepth").innerHTML = screen.colorDepth;  
    
    // api-events - see events.js for handler implementations
    // ***IMPORTANT: add event listeners only AFTER "deviceready" event    
    document.addEventListener("searchbutton", onSearchKeyDown, false);   
    document.addEventListener("menubutton", onMenuButtonDown, false);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
    // using callback for backbutton event may interfere with normal behavior
    document.addEventListener("backbutton", onBackbutton, false);
//    document.addEventListener("batterycritical", onEventFired, false);
//    document.addEventListener("batterylow", onEventFired, false);
//    document.addEventListener("batterystatus", onEventFired, false);
//    document.addEventListener("startcallbutton", onEventFired, false);
//    document.addEventListener("endcallbutton", onEventFired, false);
//    document.addEventListener("volumedownbutton", onEventFired, false);
//    document.addEventListener("volumeupbutton", onEventFired, false);
    
    // api-camera  Photo URI
//    pictureSource=navigator.camera.PictureSourceType;
//    destinationType=navigator.camera.DestinationType;
       
//    // The Samsung Galaxy Tab 10.1 is currently the only device known to
//    // support orientation/change correctly and reliably.
//    if (device.name === "GT-P7510") {
//        var updateScreen = function() {
//            document.getElementById("width").innerHTML = screen.width;
//            document.getElementById("height").innerHTML = screen.height;
//            document.getElementById("availwidth").innerHTML = screen.availWidth;
//            document.getElementById("availheight").innerHTML = screen.availHeight;        
//        };         
//        window.addEventListener("orientationchange", function(e){
//            //console.log("window.orientation: " + window.orientation);
//            updateScreen();
//        }, false);
//    }
};

function init() {
	Debug.info('*** INIT');
    document.addEventListener("deviceready", onDeviceReady, true);
}


/*$(document).on('mobileinit', function(){
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

});*/

//[{"code":"ID640PARK1","name":"BBC A","address":"Vyskočilova 1442/1b, Praha 4"},{"code":"ID100PARK1","name":"GAMMA","address":"Za Brumlovkou 2/266, Praha 4"},{"code":"ID629PARK1","name":"ÚTB","address":"Olšanská 6/2681, Praha 3"}]

// Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
// that use async data access APIs
var callLater = function(callback, data) {
    if (callback) {
        //var callbackFunctionName = callback.toString().match(/function ([^\(]+)/);//[1];
        //if(callbackFunctionName) callbackFunctionName = callbackFunctionName[1]; 
        //else callbackFunctionName = 'anonymous function';
        setTimeout(function() {
            callback(data);
        });
    }
}

var Sign = function(){
	var SIGN_IMAGE_PATH = 'images/signs/';
	var COLOR = {
			RED: 'red',
			YELLOW: 'yellow',
			GREEN:'green' 
	};
	var YELLOW_THRESHOLD = 10;
	var signImage = {
			green  : 'green-traffic-light-128x300.png',
			yellow : 'yellow-traffic-light-128x300.png',
			red    : 'red-traffic-light-128x300.png'
	};
	return {
		getSignImage: function(color) {
			return SIGN_IMAGE_PATH+signImage[color];
		},
		getSignColor: function(count) {
			if(count>YELLOW_THRESHOLD) return COLOR.GREEN;
			else if(count>0) return COLOR.YELLOW;
			else return COLOR.RED;
		}
	};
	
}();

var Parking = function(){
	var PARKING_DATA = 'parkingData';	// used as key name in backend and also as local resource key
	var PARKING_BACKEND_URL = 'http://to2parking.appspot.com/getvalue';
	var parkingCount = 0; 
	var PARKING_DATA_EXPIRATION = 60;	// in minutes
	var lastParkingDataUpdate;
	var parkingData = [
//	                   {	
//	                	   code: "ID640PARK1",
//	                	   name: "BBC A",
//	                	   address: "Vyskočilova 1442/1b, Praha 4",
////	                	   status: ["--.--.---- --:--","--","--"]
////	                	   status: ["11.11.2012 20:46",137,161]
//	                   },
//	                   {
//	                	   code: "ID100PARK1",
//	                	   name: "GAMMA",
//	                	   address: "Za Brumlovkou 2/266, Praha 4",
////	                	   status: ["--.--.---- --:--","--","--"]
////	                	   status: ["11.11.2012 20:46",305,57]
//	                   }
	                   ];
	var onLoading = function(tagValue, callbackMethod) {
		Debug.info('Parking.onLoading('+tagValue+')');
		callLater(callbackMethod, tagValue);
		$.mobile.loading( 'show' );
	};
	var onSuccess = function(data, callbackMethod) {
		Debug.info('Parking.onSuccess('+data+')');
		callLater(callbackMethod, data);
		$.mobile.loading( 'hide' );
	};
	var onError = function(status, callbackMethod) {
		Debug.error('Parking.onError('+status+')');
		callLater(callbackMethod, status);
		$.mobile.loading( 'hide' );
//		if(navigator.notification) 
//			navigator.notification.confirm(
//					'Nepodařilo se načíst stav obsazenosti parkoviště. Chcete to zkusit znovu?',
//					onErrorRetry,
//					'Chyba připojení',
//					'Ne,Ano'
//			);
	};
	function onErrorRetry(button) {
		if (button == 2) {
			getParkingStatus(getBuildingCode());
			//getBuildingCode();
			//dataRequest();
		}
	};
	var dataRequest = function(tagValue, callbackOnLoading, callbackOnSuccess, callbackOnError) {
		onLoading(tagValue, callbackOnLoading);
		$.ajax({
			type: 'POST',
			data: 'tag='+tagValue,
			cache: false,
			url: PARKING_BACKEND_URL,
			dataType: 'json',
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, textStatus, jqXHR){
				onSuccess(data, callbackOnSuccess);
//				callbackFunction(data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				onError(textStatus, callbackOnError);
			}
		});
	};
  var enableCallbackOnFinished = false;
  
	return {
		refresh: function(parkingCode, callbackOnFinished){
			Debug.info('Parking.refresh('+parkingCode+')');
      enableCallbackOnFinished = true;
			dataRequest(parkingCode, 
					//callbackOnLoading
					undefined, 
					//callbackOnSuccess
					(function(data) {
						var status = (data[2][0]=='[') ? $.parseJSON(data[2]) : $.parseJSON('['+data[2]+']'); // fix data
						//parkingData[parkingCode].status = status;
						// Update status in parking array
						$.each(parkingData, function(index, value) {
//							console.log(index);
							if(parkingData[index].code === parkingCode) {
//								console.log(parkingData[index].code+'==='+parkingCode);
								parkingData[index].status = status;
								if(callbackOnFinished && enableCallbackOnFinished) {
									// /Debug.log('Parking.refresh.callbackOnFinished()');
									callLater(callbackOnFinished, parkingData[index]);
								}
							}
						});
//						if(callbackOnFinished) callbackOnFinished(parkingData[index]);
					}),
					//callbackOnError
					undefined
			);
		},
		refreshAll: function(callbackOnFinished){
			Debug.info('Parking.refreshAll()');
      enableCallbackOnFinished = true;
			this.load( function(data) {
				$.each(parkingData, function(index, value) {
					var len = $.map(parkingData, function(n, i) { return i; }).length;
					parkingCount = len-1;
					dataRequest(parkingData[index].code, 
							//callbackOnLoading
							undefined, 
							//callbackOnSuccess
							(function(data) {
								var status = (data[2][0]=='[') ? $.parseJSON(data[2]) : $.parseJSON('['+data[2]+']'); // fix data
								parkingData[index].status = status;
								if(--parkingCount) {
                  Debug.log('enableCallbackOnFinished='+enableCallbackOnFinished);
									if(callbackOnFinished && enableCallbackOnFinished) {
										// /Debug.log('Parking.refreshAll.callbackOnFinished()');
										callLater(callbackOnFinished, parkingData);
									}
								}
							}),
							//callbackOnError
							undefined
					);
				});
			});
		},
    stopRefresh: function() {
			Debug.info('Parking.stopRefresh()');
      enableCallbackOnFinished = false;
    },
		list: function(){
			Debug.info('Parking.list()');
			// /Debug.log(parkingData);
			return parkingData;
		},
		get: function(parkingCode){
			Debug.info('Parking.get('+parkingCode+')');
			$.each(parkingData, function(index, value) {
				if(parkingData[index].code === parkingCode) {
					// /Debug.log(parkingData[index]);
					return parkingData[index]
				}
			});
		},
		load: function(callbackOnFinished){
			Debug.info('Parking.load()');
			parkingData = Config.get(CONFIG_PARKING_DATA) || [];
			// /Debug.log(parkingData);

			var refreshParkingData = true;
//			lastParkingDataUpdate = Config.get(CONFIG_PARKINGDATA_LAST_UPDATE) || 5;
			if(lastParkingDataUpdate) {
				var now = new Date();
				var diff = DateDiff.inMinutes(lastParkingDataUpdate, now);
				if( diff < PARKING_DATA_EXPIRATION)
					refreshParkingData = false;
			}
//			Debug.warn(parkingData.length+' '+refreshParkingData );
			if (parkingData.length != 0 && !refreshParkingData) {
				if(callbackOnFinished) {
					// /Debug.log('Parking.load.callbackOnFinished()');
					callLater(callbackOnFinished, parkingData);
				}
			} else { 
				dataRequest(PARKING_DATA, 
						//callbackOnLoading
						undefined, 
						//callbackOnSuccess
						(function(data) {
							parkingData = $.parseJSON(data[2]); // attribute names must be in doublequotes!
							Parking.save(parkingData);
							lastParkingDataUpdate = new Date();
							if(callbackOnFinished) {
								// /Debug.log('Parking.load.callbackOnFinished()');
								callLater(callbackOnFinished, parkingData);
							}
						}),
						//callbackOnError
						undefined
				);
			}
		},
		save: function(newParkingData){
			newParkingData = newParkingData || parkingData;
			Debug.info('Parking.save('+newParkingData+')');
			Config.set(CONFIG_PARKING_DATA, newParkingData);
		}
	};
}();

var ParkingGUI = function(){
	var list = function(listId, parkingData, enableDetail) {
		$listId = $(listId);
		if(listId && parkingData) {
			var items = [];
			items.push('<li data-role="list-divider">Lokalita</li>');
			//var parkingData = Parking.list();
      var nameElement = (enableDetail) ? 'h3' : 'b';
			$.each(parkingData, function(index, value){
				items.push(
						'<li>' +
						'<a ' +
						'id="parking' + index + '" ' +
						//'class="ui-bar-b" ' +
						'data-id="' + value.code + '">' +
            //(!enableDetail) 'data-mini="true"' : '' +
						//'<h3>'+value.name+'</h3>'
						'<'+nameElement+'>'+value.name+'</'+nameElement+'>'
				);
				if(enableDetail && value.status) {
					items.push(
							'<p>'+value.address+'</p>'+
							'<p>Čas aktualizace: <b>'+value.status[0]+'</b></p>'+
							'<span class="ui-li-count">'+value.status[2]+'</span>'+
							'<span class="ui-li-count">'+value.status[1]+'</span>'
					);
				}
				items.push(
						'</a>'+
						'</li>'
				);
			});
			$listId.html(items.join(''));    
			$listId.trigger('create');    
			try { $listId.listview('refresh'); } catch(e) {};
		}
	};
	return {
		autoRefresh: function(enable) {
			if(enable) {
				var refreshTimeout = Config.get(CONFIG_AUTOREFRESH_TIMEOUT) || 5;
				var refreshInterval = Config.get(CONFIG_AUTOREFRESH_INTERVAL) || 60;
//				$('a[data-icon="refresh"]').each( function() {
				Timer.start(
						/*onLoop*/function(minutes) {
							var selectedParkingCode = Config.get(CONFIG_SELECTED_PARKING_CODE);
							ParkingGUI.refreshStatus(selectedParkingCode);
							$('.text-refresh').each( function() {
								$(this).text('Auto ('+minutes+' min)');
							});
						},
						/*onFinish*/function() {
							$('.text-refresh').each( function() {
								$(this).text('Aktualizovat');
							});
						},
						refreshInterval, refreshTimeout);
			} else {
				Timer.stop();
//				$('a[data-icon="refresh"]').each( function() {
				$('.text-refresh').each( function() {
					$(this).text('Aktualizovat');
				});
				var selectedParkingCode = Config.get(CONFIG_SELECTED_PARKING_CODE);
				this.refreshStatus(selectedParkingCode);
			}
		},
//		stopRefresh: function() {
//			if (this.refreshTimer) {
//				window.clearTimeout(this.refreshTimer);
//			}
//		},
		refreshList: function(listId, enableDetail, callbackOnFinished) {
			var savedParkingData = Config.get(CONFIG_PARKING_LIST);
			list(listId, savedParkingData, enableDetail);
      
			Parking.refreshAll(
					//callbackOnFinished
					function(parkingData) {
						list(listId, parkingData, enableDetail);
						Config.set(CONFIG_PARKING_LIST, parkingData);
						if(callbackOnFinished) {
							// /Debug.log('ParkingGUI.refreshAll.callbackOnFinished()');
							callLater(callbackOnFinished, parkingData);
						}
						
					}
			);
		},
		refreshStatus: function(parkingCode) {
      Debug.log(parkingCode);
			if(parkingCode)
			Parking.refresh(parkingCode,
					//callbackOnFinished
					function(parkingData) {
            $('.parking').show(); // presunuto sem aby se zobrazilo az ve chvili kdy jsou aktualni data
						$parkingName = $('#parkingName');
						$statusLastUpdate = $('#statusLastUpdate');
						$statusTimeout = $('#statusTimeout');
						$imgCorporate = $( '#imgCorporate' );
						$imgPrivate = $( '#imgPrivate' );
						$statusCorporate = $('#statusCorporate');
						$statusPrivate = $( '#statusPrivate' )

//						Debug.log(parkingData);
//						var selectedParkingData = $.grep(parkingData, function(e){ console.log(e); return e.code === parkingCode; });
//						console.log(selectedParkingData);
						selectedParkingData = [parkingData];
						if (selectedParkingData.length == 0) {
;							Debug.error('Not found parkingCode('+parkingCode+')');
							Debug.warn(selectedParkingData);
							// not found
						} else {
							if (selectedParkingData.length > 1) {
								Debug.warn('Multiple parkingCode found');
								Debug.warn(selectedParkingData);
							}
							selectedParkingData = selectedParkingData[0]; // first item in returned array
							// /Debug.log('selectedParkingData = '+JSON.stringify(selectedParkingData)+'');

							var status = selectedParkingData.status;
							//var status = (data[2][0]=='[') ? $.parseJSON(data[2]) : $.parseJSON('['+data[2]+']'); // fix data
							// Name
							var previousName = $parkingName.text();
							$parkingName.text(parkingData.name);
							if(parkingData.name!=previousName) flash($parkingName);
							// Last change
							var previousLastUpdate = $statusLastUpdate.text();
							$statusLastUpdate.text(status[0]);
							if(status[0]!=previousLastUpdate) flash($statusLastUpdate);
							
							// Timeout in min
							var previousTimeout = $statusTimeout.text();
							var d1 = new Date(Date.fromString(status[0], {order: 'DMY'}));
							var d2 = new Date();
							var diffInMinutes = DateDiff.inMinutes(d1, d2);
							var s = 'před ';
							if(diffInMinutes<120) {
								s += diffInMinutes;
								if(diffInMinutes == 1) s+=' minutou';
								if(diffInMinutes == 0 || diffInMinutes>1) s+=' minutami';
							} else {
								var diffInHours = DateDiff.inMinutes(d1, d2);
								if(diffInHours<24) {
									s += diffInHours;
									if(diffInHours == 1) s+= ' hodinou';
									if(diffInHours == 0 || diffInHours>1) s+= ' hodinami';
								} else {
									var diffInDays = DateDiff.inDays(d1, d2);
									s += diffInDays;
									if(diffInDays == 1) s+= ' dnem';
									if(diffInDays == 0 || diffInDays>1) s+= ' dny';
								}
							}
							$statusTimeout.text(s);
							if(s!=previousTimeout) flash($statusTimeout);
							
//							console.log(DateDiff.inHours(d1, d2));
//							console.log(previousLastUpdate, d1);
//							console.log(status[0], d2);
//							console.log(DateDiff.inMinutes(d1, d2));
//							console.log(DateDiff.inHours(d1, d2));
//							console.log(new Date(Date.fromString(status[0], {order: 'DMY'})));
							
							// Corporate
							var countCorporate = status[1];
							var previousCorporate = parseInt($statusCorporate.text(),10);
							$statusCorporate.text(countCorporate);
							if(countCorporate!=previousCorporate) flash($statusCorporate);
							$imgCorporate.attr('src',Sign.getSignImage(Sign.getSignColor(countCorporate)));
							// Private
							var countPrivate = status[2];
							var previousPrivate = parseInt($statusPrivate.text(),10);
							$statusPrivate.text(countPrivate);
							if(countPrivate!=previousPrivate) flash($statusPrivate);
							$imgPrivate.attr('src',Sign.getSignImage(Sign.getSignColor(countPrivate)));
							//$imgPrivate.removeAttr('disabled');
//							alert(JSON.stringify(data));
						}
					}
			);
		}
	};
}();

var Timer = function(){
	var timer, callbackOnLoop, callbackOnFinish, interval, timeout, started, running, paused=false;
  // paused will not stop timer but it will not call calback function
	var loop = function() {
		Debug.info('Timer.loop()');
		var now = new Date();
		var diff = DateDiff.inMinutes(started, now);
		running = diff < timeout;
    Debug.log('Timer: running='+running+' paused='+paused);
    if(running) {
			// /Debug.log('Timer.diff='+diff+' '+timeout);
			if(!paused) callLater(callbackOnLoop, timeout-diff);
			timer = setTimeout(loop, interval*1000);
		} else {
			Debug.info('Timer finished');
			if(paused) callLater(callbackOnLoop, timeout-diff); // kdyz je paused tak posledni aktualizaci provede
			callLater(callbackOnFinish); 
		}
		
	};
	return {
		start: function(onLoop, onFinish, intervalS/* seconds */, timeoutM/* minutess */) {
			Debug.info('Timer.start('+intervalS+','+timeoutM+')');
			if(running && interval==intervalS && timeout==timeoutM)
				return; // timer is already running and parameters are not changed
			// start timer and change parameters 
			this.stop();
			callbackOnLoop = onLoop;
			callbackOnFinish = onFinish;
			interval = intervalS; // ? (intervalS * 1000) : 30000;
			timeout = timeoutM;
			started = new Date();
      paused=false;
			timer = setTimeout(loop, 0);
    },
    stop: function() {
        if(timer)
          clearTimeout(timer);
    },
    pause: function() {
        if(timer)
          paused=true;
    },
    resume: function() {
        if(timer)
          paused=false;
    }
	};
}();	    

//function DeltaTimer(callback, interval, timeout) {
//    var timer;
//    var lastTime;
//
//    this.start = start;
//    this.stop = stop;
//
//    function start() {
//        timer = setTimeout(loop, 0);
//        lastTime = + new Date;
//        return lastTime;
//    }
//
//    function stop() {
//        clearTimeout(timer);
//        return lastTime;
//    }
//
//    function loop() {
//        var thisTime = + new Date;
//        var deltaTime = thisTime - lastTime;
//        var delay = Math.max(interval - deltaTime, 0);
//        timer = setTimeout(loop, delay);
//        lastTime = thisTime + delay;
//        callback(thisTime);
//    }
//};

//The above script runs the given render function as close as possible to the specified interval, and to answer your question it makes use of setTimeout to repeat a process. In your case you may do something as follows:
//
//var timer = new DeltaTimer(function (time) {
//    console.log("10 seconds");
//}, 10000);
//
//var start = timer.start();

var CONFIG_PARKING_LIST = 'parkingList';
var CONFIG_SELECTED_PARKING_CODE = 'selectedParkingCode';
var CONFIG_VERSION = 'version';	// last downloaded version, if is different show splash screen with release notes
var CONFIG_ENABLE_AUTOREFRESH = 'enableAutoRefresh';
var CONFIG_AUTOREFRESH_TIMEOUT = 'autoRefreshTimeout';
var CONFIG_AUTOREFRESH_INTERVAL = 'autoRefreshInterval';
var CONFIG_PARKING_DATA = 'parkingData';
var CONFIG_PARKINGDATA_LAST_UPDATE = 'parkingDataLastUpdate';
var CONFIG_ENABLE_DEBUGLOG = 'enableDebugLog';

var Config = function(){
	var CONFIG_DATA = 'configData';
	var configData = {};

	return {
		get: function(id){
			this.load();
//			Debug.info('Config.get('+id+')='+configData[id]);
//			Debug.log(configData[id]);
			return configData[id];
		},
		set: function(id, value){
//			Debug.info('Config.set('+id+','+value+')');
			configData[id] = value;
			this.save();
		},
		remove: function(id){
//			Debug.info('Config.remove('+id+')');
			if (this.exists(id)) {
				var data = this.load();
				delete data[id];
//				Debug.log('removed '+id);
				this.save(data);
			}
		},
		exists: function(id) {
			var d = this.load();
			if(d && d.hasOwnProperty(id)) return true;
			else return false;
		},
		load: function(){
//			Debug.info('Config.load()');
			configData = JSON.parse(localStorage.getItem(CONFIG_DATA)) || {};
//			Debug.log(configData);
			return configData;
		},
		save: function(newConfigData){
			newConfigData = newConfigData || configData;
//			Debug.info('Config.save('+newConfigData+')');
			return localStorage.setItem(CONFIG_DATA, JSON.stringify(newConfigData));
		}
	};
}();

var DateDiff = {
		inSeconds: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();
			return parseInt((t2-t1)/(1000));
		},
		inMinutes: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();
			return parseInt((t2-t1)/(60*1000));
		},
		inHours: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();
			return parseInt((t2-t1)/(3600*1000));
		},

		inDays: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();
			return parseInt((t2-t1)/(24*3600*1000));
		},

		inWeeks: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();
			return parseInt((t2-t1)/(24*3600*1000*7));
		},

		inMonths: function(d1, d2) {
			var d1Y = d1.getFullYear();
			var d2Y = d2.getFullYear();
			var d1M = d1.getMonth();
			var d2M = d2.getMonth();
			return (d2M+12*d2Y)-(d1M+12*d1Y);
		},

		inYears: function(d1, d2) {
			return d2.getFullYear()-d1.getFullYear();
		}
};

function checkConnectionAvailability() {
    var connectionState = navigator.network.connection.type;
    if (connectionState == Connection.NONE || connectionState == Connection.UNKNOWN) {
        return "No network connection available";
    }
    return 'online';
};
$(document).on('pageshow','[data-role=page]', function(){
//	resizeUiElements($(this));
});

//$(window).bind( 'orientationchange', function(e){
//	if ($.event.special.orientationchange.orientation() == "portrait") {
//		//Do whatever in portrait mode
//	} else {
//		//Do Whatever in landscape mode
//		ParkingGUI.refreshList('#listParking');
//		console.log('orientationchange');
//	}
//});


function flash($element) {
//  $element.css({'font-size':'120%'});  
	$element.fadeTo('fast', 0.5, function() {
		$element.fadeTo('fast', 1);
	});
//  $element.css({'font-size':'100%'});  
/*  .animate({
    fontSize: '110%'
  }, 500, 'linear', {fontSize: '100%'
  });*/
  
//	$(elementId).removeClass('ui-btn-up-c').addClass('ui-btn-up-e').fadeTo('slow', 0.5, function() {
//		$(elementId).removeClass('ui-btn-up-e').addClass('ui-btn-up-c').fadeTo('fast', 1);
//	});  
//	$element.removeClass('ui-btn-up-c').addClass('ui-btn-up-e');
//	setTimeout(function() {
//		$element.removeClass('ui-btn-up-e').addClass('ui-btn-up-c').fadeIn('fast');
//	}, 500);
};
function disableUi(uiId, disabled) {
	$uiId = $(uiId);
	if(disabled) { 
		if(!$uiId.hasClass('ui-disabled'))
			$uiId.addClass('ui-disabled');
	} else {
		$uiId.removeClass('ui-disabled');
	}
}	

var REFRESH_TIMEOUT = 1000*60*5; // 5min
var lastRefresh = new Date();

//
// global page init
//
$(document).on('pageinit','[data-role=page]', function(event){
	Debug.info('*** PAGEINIT('+event.target.id+ ')');
 // protoze je href #pageMain tak neni nutne
//	$('.btn-refresh').click(function() {
//		ParkingGUI.refreshStatus(Config.get(CONFIG_SELECTED_PARKING_CODE));
//	});
	// disable the tap to toggle for fixed footer and headers 
	//$('[data-role=header],[data-role=footer]').fixedtoolbar({ tapToggle:false });
	//$('[data-role=footer]').fixedtoolbar({ tapToggle:false });
});
//
// global page create
//
$(document).on('pagebeforecreate','[data-role=page]', function(event){
  Debug.info('*** PAGEBEFORECREATE('+event.target.id+ ')');
	// Universal header and footer
	var $page = $(this);
	Layout.setActivePage($page);
	if($page.find('[data-role="header"]').length === 0){
		$page.prepend($('#universalHeader').html());
    // /Debug.log('Added #universalHeader');
	}
	if($page.find('[data-role="footer"]').length === 0){
		$page.append($('#universalFooter').html())
		.find('a').removeClass('ui-btn-active')
		.find('a.'+$page.attr('data-activeFooter')).addClass('ui-btn-active')
		;
    // /Debug.log('Added #universalFooter');
	}
});
$(document).on('pagebeforeshow','[data-role=page]', function(){
	var pageId = $.mobile.activePage.attr('id');
	Debug.info('*** PAGEBEFORESHOW('+pageId+')');
	GAPlugin.trackPage($.mobile.activePage.attr('id'));
  // Enable debug log
  var enableDebugLog = Config.get(CONFIG_ENABLE_DEBUGLOG);
  $('.enable-debuglog').each( function() {
    if(enableDebugLog) $(this).show(); else $(this).hide();
  });
});

var APP_VERSION = '0.9.0';

//
// pageInfo
//
$.mobile.routerlite.pageinit('#pageInfo', function(page){
	Debug.info('*** PAGEINIT #pageInfo');
//	/GAPlugin.trackPage(CONFIG_SELECTED_PARKING_CODE, dataId);
	$('.btn-ok').click(function() {
		// save actual version, later only if it will be another, then pageInfo will be displayed again 
		Config.set(CONFIG_VERSION, APP_VERSION);
	});
	$('.btn-test').click(function() {
		try {
    Debug.log( window.plugins.childBrowser.showWebPage('https://build.phonegap.com/docs/hydration'), { showLocationBar: true, showAddress: true, showNavigationBar: true } );
    }
    catch(e) {
    Debug.error(e);
    }
	});
});

//
// pageSetup
//
$.mobile.routerlite.pageinit('#pageSetup', function(page){
	Debug.info('*** PAGEINIT #pageSetup');
	$("#checkAutoRefresh").bind( "change", function(event, ui) {
		var enableAutoRefresh = $("#checkAutoRefresh").is(':checked');
		disableUi('#selectTimeout,#selectInterval', !enableAutoRefresh);
		$("#selectTimeout,#selectInterval").selectmenu('refresh');
	});
	$('.btn-ok').click(function() {
		var enableAutoRefresh = $("#checkAutoRefresh").is(':checked');
		Config.set(CONFIG_ENABLE_AUTOREFRESH, enableAutoRefresh);
		var refreshTimeout = parseInt($("#selectTimeout").val(),10);
		Config.set(CONFIG_AUTOREFRESH_TIMEOUT, refreshTimeout);
		var refreshInterval = parseInt($("#selectInterval").val(),10);
		Config.set(CONFIG_AUTOREFRESH_INTERVAL, refreshInterval);
		// Start autorefresh if it is enabled
		ParkingGUI.autoRefresh(enableAutoRefresh);
		if(enableAutoRefresh) {
			GAPlugin.setVariable(CONFIG_AUTOREFRESH_TIMEOUT, refreshTimeout);
			GAPlugin.setVariable(CONFIG_AUTOREFRESH_INTERVAL, refreshInterval);
		}
		var enableDebugLog = $("#checkDebugLog").is(':checked');
		Config.set(CONFIG_ENABLE_DEBUGLOG, enableDebugLog);
    Timer.resume();

//		if(enableAutoRefresh) {
//			Timer.start(function() {
//				var selectedParkingCode = Config.get(CONFIG_SELECTED_PARKING_CODE);
//				ParkingGUI.refreshStatus(selectedParkingCode);
//			}, refreshInterval, refreshTimeout);
//		}
	});
});

$(document).on('pagebeforeshow','#pageSetup', function(){
	Debug.info('*** PAGEBEFORESHOW #pageSetup');
  Timer.pause();
// remove "selected" from any options that might already be selected
	$('option[selected="selected"]').each( function() {
		$(this).removeAttr('selected');
	});
	var refreshTimeout = parseInt(Config.get(CONFIG_AUTOREFRESH_TIMEOUT),10) || 2;
    $("#selectTimeout option[value='"+refreshTimeout+"']").attr('selected', 'selected');
	var refreshInterval = parseInt(Config.get(CONFIG_AUTOREFRESH_INTERVAL),10) || 30;
    $("#selectInterval option[value='"+refreshInterval+"']").attr('selected', 'selected');
	var enableAutoRefresh = Config.get(CONFIG_ENABLE_AUTOREFRESH) || false;
	disableUi('#selectTimeout,#selectInterval', !enableAutoRefresh);
	$("#checkAutoRefresh").attr('checked', enableAutoRefresh).checkboxradio("refresh");
	$("#selectTimeout,#selectInterval").selectmenu('refresh');
	var enableDebugLog = Config.get(CONFIG_ENABLE_DEBUGLOG) || false;
	$("#checkDebugLog").attr('checked', enableDebugLog).checkboxradio("refresh");
 });

$.mobile.routerlite.pagechange('#pageSetup', function(page, data ){
	Debug.info('*** PAGECHANGE #pageSetup');

});


//
// pageMain
//
$.mobile.routerlite.pageinit('#pageMain', function(page){
	Debug.info('*** PAGEINIT #pageMain');
	// Update parking list in landscape menu
	ParkingGUI.refreshList('#listParking2', false /*enableDetail*/, 
			/*callbackOnFinished*/
			(function() {
				$('#listParking2 li a').click(function(event) {
					event.preventDefault();
					var id = $(this).attr('id');
					$('#listParking2 li a').removeClass('ui-bar-b');
					$('#' + id).addClass('ui-bar-b');
					var dataId = $(this).attr('data-id');
					// /Debug.log('Selected : ' + dataId +' '+id);
					Config.set(CONFIG_SELECTED_PARKING_CODE, dataId);
					GAPlugin.setVariable(CONFIG_SELECTED_PARKING_CODE, dataId);
					$.mobile.changePage("#pageMain");
          $.mobile.silentScroll(0);
				});
			})
	);
  
});

$(document).on('pagebeforechange','#pageMain', function(){
	Debug.info('*** PAGEBEFORECHANGE #pageMain');
alert(10);
});

$.mobile.routerlite.pagechange('#pageMain', function(page, data ){
	Debug.info('*** PAGECHANGE #pageMain');
  	if(Config.get(CONFIG_VERSION) != APP_VERSION) {
		// display pageInfo because it is first time or saved version is different 
		$.mobile.changePage("#pageInfo");
	} else {
    Timer.resume();
		var selectedParkingCode = Config.get(CONFIG_SELECTED_PARKING_CODE);
		// If is selection unknown, disable refresh buttons and hide parking interface 
		disableUi('.btn-refresh', (selectedParkingCode==undefined));
		if(selectedParkingCode) {
			//$('.parking').show();
			// Start autorefresh if it is enabled
			var enableAutoRefresh = Config.get(CONFIG_ENABLE_AUTOREFRESH);
			ParkingGUI.autoRefresh(enableAutoRefresh);
//			// Start autorefresh if it is enabled
//			var enableAutoRefresh = Config.get(CONFIG_ENABLE_AUTOREFRESH) || false;
//			if(enableAutoRefresh) {
//				var refreshTimeout = Config.get(CONFIG_AUTOREFRESH_TIMEOUT) || 5;
//				var refreshInterval = Config.get(CONFIG_AUTOREFRESH_INTERVAL) || 60;
//				Timer.start(function() {
//					ParkingGUI.refreshStatus(selectedParkingCode);
//				}, refreshInterval, refreshTimeout);
//			} else {
//				ParkingGUI.refreshStatus(selectedParkingCode);
//			}
		} else {
			$('.parking').hide();
			$.mobile.changePage("#pageSelect");
		}
	}

});

//
// pageSelect
//
$.mobile.routerlite.pageinit('#pageSelect', function(page){
	Debug.info('*** PAGEINIT #pageSelect');
});
$.mobile.routerlite.pagechange('#pageSelect', function(page){
	Debug.info('*** PAGECHANGE #pageSelect');
  Timer.pause();
	var selectedParkingCode = Config.get(CONFIG_SELECTED_PARKING_CODE);
	// If is selection unknown, disable refresh buttons and hide parking interface 
	disableUi('.btn-refresh', (selectedParkingCode==undefined));
	ParkingGUI.refreshList('#listParking1', true /*enableDetail*/, 
			/*callbackOnFinished*/
			(function() {
				$('#listParking1 li a').click(function(event) {
          event.preventDefault();
          Parking.stopRefresh();
          var dataId = $(this).attr('data-id');
          // /Debug.log('Selected : ' + dataId);
          Config.set(CONFIG_SELECTED_PARKING_CODE, dataId);
					GAPlugin.setVariable(CONFIG_SELECTED_PARKING_CODE, dataId);
					$.mobile.changePage("#pageMain");
          $.mobile.silentScroll(0);
				});
			})
	);
});

//
// pageLog
//
$.mobile.routerlite.pageinit('#pageLog', function(page){
	Debug.info('*** PAGEINIT #pageLog');
	$('.btn-ok').click(function() {
	});
	$('.btn-clear').click(function() {
    Debug.clearLogHistory();
	});
});
