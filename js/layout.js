var Layout = function(){
	//
	// Change content parameters.
	//
	var footerH = 57;
	var activePage = null;
	return {
		setActivePage : function(page) {
			activePage = page;
		},
		setHeight : function() {
			var headerH = $('section.ui-page-active header').height(),
			contentH = $(window).height() - headerH - footerH - 5;
			Debug.log(contentH);

			$('.wrapper').height(contentH + 'px');

			if (activePage.hasClass('dual-selection')) {
				if (window.innerHeight < window.innerWidth) {	// landscape
					//
					// Inputs take up 100% of the height however boxes are 80%
					//	of that height. So 10% above leaves 10% below hence
					//	centering.
					//
					headerH = activePage.find('.inputs').height() / 10;
					activePage.find('.inputs .section-box').css('margin-top', headerH + 'px');
				} else {
					activePage.find('.inputs .section-box').css('margin-top', '0px');
				}
			} else if (activePage.attr('id') == 'audio') {
				//
				// Inputs take up 100% of the height however boxes are 80%
				//	of that height. So 10% above leaves 10% below hence
				//	centering.
				//
				headerH = (contentH - $('#audio-selection').height() - $('#volume-wrapper').height()) / 2;
				$('#audio-selection').css('margin-top', headerH + 'px');

			} else if (activePage.hasClass('single-selection')) {
				if (window.innerHeight < window.innerWidth) {	// landscape
					//
					// Divided by 2 as lights are 50% of the height
					//	So 25% padding top leaves 25% padding bottom
					//
					headerH = (contentH - activePage.find('div.selections').height() - activePage.find('div.labels').height()) / 2;
					activePage.find('div.selections').css('margin-top', headerH + 'px');
				} else {
					activePage.find('div.selections').css('margin-top', '0px');
				}
			}
		}
	};
}();

$(window).bind('resize orientationchange', function (event) {
//	Debug.warn('resize orientationchange');
	//Layout.setHeight();
//	resizeUiElements();
});
$(document).on('pagechange','[data-role=page]', function(event, data){
//$.mobile.routerlite.pagechange('[data-role=page]', function(x,page){
//	Debug.warn(data.toPage);
	//Debug.warn(page);
	//$.mobile.fixedToolbars.setTouchToggleEnabled(false);
	//Layout.setActivePage(data.toPage);
	//Layout.setHeight();
//	resizeUiElements();
});



//$(document).on('pagecreate','[data-role=page]', function(){
//	Debug.info('*** PAGECREATE');
//});
//$(document).on('pageinit','[data-role=page]', function(){
//	Debug.info('*** PAGEINIT');
//	// Allows non active accordion items, see http://jsfiddle.net/codaniel/FN5Ve/3/
//	$(".ui-collapsible[data-allow-collapse=false]").unbind("expand collapse");
//});
//$(document).on('pagebeforeshow','[data-role=page]', function(){
//	Debug.info('*** PAGEBEFORESHOW');
//});
//$(document).on('pageshow','[data-role=page]', function(){
//	Debug.info('*** PAGESHOW');
//});


//$('[data-role="page"]').live('pageinit', function(event) {
//	$(".ui-collapsible[data-allow-collapse=false]").unbind("expand collapse");
//	$(".ui-li-has-count").each(function() {
//		if($(this).find(".ui-li-count").length == 2) {
//			var first = $(this).find(".ui-li-count:first");
//			var second = $(this).find(".ui-li-count:nth(1)");
//			var shiftFirst = (second.position().left - first.outerWidth() - 5);
//			first.css("left", shiftFirst).css("right","auto");         
//		}
//	});
//});
//$(document).on('expand','[data-role=collapsible]', function(){
//	Debug.info('*** EXPAND');
//});

/* detect device */
var ua = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    ipad = ~ua.indexOf('iPad'),
    ios = iphone || ipad,
    android = ~ua.indexOf('Android');

function resizeUiElements() {
    var $page = $(this),
        $target = $(this).find('.fullHeight'),
        t_padding = parseInt($target.css('padding-top'))
                    + parseInt($target.css('padding-bottom')),
        w_height = (ios)? screen.height-65: $(window).height();     // "-65" is to compensate for url bar. Any better ideas?
        headFootHeight = 0;

    // Get total height for all headers and footers on page
    $page.find('[data-role="footer"], [data-role="header"]').each(function() {
        var myTotalHeight = $(this).height();
                            + parseInt( $(this).css('padding-top') )
                            + parseInt( $(this).css('padding-bottom') );
        headFootHeight += myTotalHeight;
    });

    var the_height = (w_height - headFootHeight);           

    $page
     .height(w_height)
     .find('.fullHeight')
     .height(the_height - t_padding);
	Debug.log(w_height, the_height);

};

//
// Detect screen size and orientation changes
//
//
//$(document).on('pageshow','[data-role=page]', function(){
////	resizeUiElements($(this));
//});
//
//$(function () {
//	$.mobile.fixedToolbars.setTouchToggleEnabled(false);
//	activePage = $('section.ui-page-active');
//	setHeight();
//	
//	$(window).bind('resize orientationchange', function (event) {
//		setHeight();
//	});
//	
//	$('body').bind('pagechange', function (event, data) {
//		$.mobile.fixedToolbars.setTouchToggleEnabled(false);
//		activePage = data.toPage;
//		setHeight();
//	});
//	
//	$('#cancelbtn').bind('tap', function(){
//		
//		history.back();
//		return false;
//		
//	});
//});
//
////$(document).bind("mobileinit", function(){
////	$.support.touchOverflow = true;
////	$.mobile.touchOverflowEnabled = true;
////});
