// Custom sorting plugin
google.load("jquery", "1.6.0");

google.setOnLoadCallback(function()
{
	
	

	/* selector can be id, class, tag name etc. */
	$("#tS1").thumbnailScroller({ 
		/* scroller type based on mouse interaction 
		values: "hoverPrecise", "hoverAccelerate", "clickButtons" 
		default: "hoverPrecise" */
		scrollerType:"hoverAccelerate", 
		/* scroller orientation 
		values: "horizontal", "vertical" 
		default: "horizontal" */
		scrollerOrientation:"horizontal", 
		/* scroll easing type only for "hoverPrecise" scrollers
		available values here: http://jqueryui.com/demos/effect/easing.html 
		default: "easeOutCirc" */
		scrollEasing:"easeOutCirc", 
		/* scroll easing amount only for "hoverPrecise" and "clickButtons" scrollers (0 for no easing) 
		values: milliseconds 
		default: 800 */
		scrollEasingAmount:800, 
		/* acceleration value only for "hoverAccelerate" scrollers 
		values: integer 
		default: 2 */
		acceleration:4, 
		/* scrolling speed only for "clickButtons" scrollers 
		values: milliseconds 
		default: 600 */
		scrollSpeed:800, 
		/* scroller null scrolling area only for "hoverAccelerate" scrollers 
		0 being the absolute center of the scroller
		values: pixels 
		default: 0 */
		noScrollCenterSpace:10, 
		/* initial auto-scrolling 
		0 equals no auto-scrolling 
		values: amount of auto-scrolling loops (integer) 
		default: 0 */
		autoScrolling:0, 
		/* initial auto-scrolling speed 
		values: milliseconds 
		default: 8000 */
		autoScrollingSpeed:2000, 
		/* initial auto-scrolling easing type 
		available values here: http://jqueryui.com/demos/effect/easing.html 
		default: "easeInOutQuad" */
		autoScrollingEasing:"easeInOutQuad", 
		/* initial auto-scrolling delay for each loop 
		values: milliseconds 
		default: 2500 */
		autoScrollingDelay:500 
	});
	$("#tS2").thumbnailScroller({ 
		scrollerType:"clickButtons", 
		scrollerOrientation:"horizontal", 
		scrollSpeed:2, 
		scrollEasing:"easeOutCirc", 
		scrollEasingAmount:600, 
		acceleration:4, 
		scrollSpeed:800, 
		noScrollCenterSpace:10, 
		autoScrolling:0, 
		autoScrollingSpeed:2000, 
		autoScrollingEasing:"easeInOutQuad", 
		autoScrollingDelay:500 
	});
	$("#tS3").thumbnailScroller({ 
		scrollerType:"hoverPrecise", 
		scrollerOrientation:"vertical", 
		scrollSpeed:2, 
		scrollEasing:"easeOutCirc", 
		scrollEasingAmount:800, 
		acceleration:4, 
		scrollSpeed:800, 
		noScrollCenterSpace:10, 
		autoScrolling:0, 
		autoScrollingSpeed:2000, 
		autoScrollingEasing:"easeInOutQuad", 
		autoScrollingDelay:500 
	});




	
	
	
	
        $('#Filter a').click(function(e) {

      if($(this).attr("data-type") == "all")
      {
        $("#FilteredGallery article:hidden").show(400);
      }
      else
      {
        $("#FilteredGallery article:visible").not("[data-type="+$(this).attr("data-type")+"]").hide(400);
        $("#FilteredGallery article[data-type="+$(this).attr("data-type")+"]:hidden").show(400);
      }

      $("a", $(this).parent().siblings()).removeClass("active");
      $(this).addClass("active");

      return false;
    });




/**
 * Get the names and values of all cookies for the page.
 *
 * @example $.cookie();
 * @desc Get all the cookies for the page
 *
 * @return an object with the name-value pairs of all available cookies.
 * @type Object
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

$.cookie = function(name, value, options) {
    if (typeof value != 'undefined'  ||  (name  &&  typeof name != 'string')) { // name and value given, set cookie
        if (typeof name == 'string') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = name + '=' + encodeURIComponent(value) + expires + path + domain + secure;
        } else { // `name` is really an object of multiple cookies to be set.
          for (var n in name) { jQuery.cookie(n, name[n], value||options); }
        }
    } else { // get cookie (or all cookies if name is not provided)
        var returnValue = {};
        if (document.cookie) {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (!name) {
                    var nameLength = cookie.indexOf('=');
                    returnValue[ cookie.substr(0, nameLength)] = decodeURIComponent(cookie.substr(nameLength+1));
                } else if (cookie.substr(0, name.length + 1) == (name + '=')) {
                    returnValue = decodeURIComponent(cookie.substr(name.length + 1));
                    break;
                }
            }
        }
        return returnValue;
    }
        };
        var CSSFilter = ".template-article",
        zoom = $.cookie("zoom"),
        incFilter = ".zoomin",

        decFilter = ".zoomout",
        resetFilter = ".zoomreset";

        $(incFilter).click(incZoom);
        $(decFilter).click(decZoom);
        $(resetFilter).click(resetZoom);

        $(".print").click(printpage);

        function printpage()
        {
                JavaScript:window.print();
                return false; auotmoat
        }

        if(!isNaN(zoom*1))
        {
                zoom *= 1;
                setSize(zoom);

        }
        else
        {

                zoom = 0;
                $.cookie("zoom", 0);
        }

        function setSize(z)
        {
                $(CSSFilter).each(function(){

                        if($(this).attr("fs"))
                        {
                                var fs = $(this).attr("fs") * 1;
                        }
                        else
                        {
                                var fs = $(this).css("font-size").replace("px", "")*1;
                                $(this).attr("fs", fs)
                        }

                        fs += fs*z;
                        $(this).css("font-size", fs+"px")
                });
                updateButtons();
        }

        function updateButtons()
        {
                if(Math.abs(zoom) < 0.04 & zoom != 0 )
                {
                        resetZoom();
                }

                if(zoom > 0){
                        $(incFilter).addClass("active");
                        $(decFilter).removeClass("active");
                }
                else if (zoom < 0){
                        $(decFilter).addClass("active");
                        $(incFilter).removeClass("active");
                }
                else{
                        $(decFilter).removeClass("active");
                        $(incFilter).removeClass("active");
                }


        }

        function incZoom()
        {
                zoom += 0.05;
                saveZoom();
        }
        function decZoom()
        {
                zoom -= 0.05;
                saveZoom();
        }
        function resetZoom()
        {
                zoom = 0;
                saveZoom();
        }

        function saveZoom()
        {
                if(isNaN(zoom))
                {
                        zoom = 0;
                }

                $.cookie("zoom", zoom);
                setSize(zoom);
        }

//------------ Menus
  var  flowOutVisible = false,
  timeout,
  overTime = 200,
  currentMenuOut,
  hoverTime = 200;

  $("#MainNavigation li:has(.flyout)").hover(function() {

    currentMenuOut = $(".flyout", this);
    window.clearTimeout(timeout);
    timeout = window.setTimeout(showMenu, hoverTime);

  }, function() {
    window.clearTimeout(timeout);
     $(".flyout", this).fadeOut();
  });

  function showMenu()
  {
    currentMenuOut.fadeIn();
    window.clearTimeout(timeout);
  }









});
