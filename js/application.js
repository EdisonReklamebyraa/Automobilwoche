var addthis_config = {"data_track_clickback":true, ui_language: "de"};
google.load("jquery", "1.6.0");

google.setOnLoadCallback(function()
                         {
                             
                             //set wmode for all the flash banners, bad hack I know. 

                             $("param[name=wmode]").attr("value", "Transparent");
                             $("object, embed").attr("wmode", "Transparent"); 
                             $("object").each(function() {
                                                  $(this).html($(this).html( ) ); 
                                              }); 


                           /* selector can be id, class, tag name etc. */
                           $("#tS1").thumbnailScroller({
                             scrollerType:"hoverAccelerate",
                             scrollerOrientation:"horizontal",
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
                               return false;
                           };
                           var CSSFilter = "#MainbColumn",
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
                             return false; 
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
                                 $(this).attr("fs", fs);
                               }

                               fs += fs*z;
                               $(this).css("font-size", fs+"px");
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



                           $('.tickeranim').vTicker({
                             speed: 500,
                             pause: 5000,
                             showItems: 3,
                             animation: 'fade',
                             mousePause: true,
                             height: 0,
                             direction: 'up'
                           });


                           var tabContainers = $('div.tabs > div');

                           $('div.tabs ul.tabNavigation a').click(function () {
                             tabContainers.hide().filter(this.hash).show();

                             $('div.tabs ul.tabNavigation li').removeClass('selected');

                             $(this).parent("li").addClass('selected');

                             return false;
                           }).filter(':first').click();



                          var MainArticleRotator = function() {
                             this.mainWidth = 619,
                             this.mainHeight = 348,
                             this.smallWidth = 179,
                             this.smallHeight = 118,
                             this.speed = 1500,
                             this.intervalTime = 18000,
                             this.afterUpdate,
                             this.articleContainer = $("#MainbColumn .main .articleview_picturelist"),
                             this.intervalID = 0 ;




                             this.rotate = function() {
                               var self = this,
                               articles =$("article", this.articleContainer),
                               lastArticle = articles.last(),
                               topArticle = $("#MainbColumn .main .top"),
                               mainArticle = this.createMainArticle(topArticle, lastArticle),
                               nextArticle = this.createNextArticle(topArticle, lastArticle);

                               clearTimeout(this.intervalID);
                               var top = $("#MainbColumn .main .top header");

                               $(top).after(mainArticle);
                               $(mainArticle).fadeIn(this.speed, function() { top.remove(); }) ;

                               this.articleContainer.prepend(nextArticle);
                               nextArticle.slideDown(this.speed);
                               lastArticle.fadeOut(this.speed, function() {
                                 $(this).remove();
                                 self.startUpdating();
                               });

                               if(this.afterUpdate)
                               {
                                 this.afterUpdate();
                               }


                             };

                             this.createMainArticle = function(topArticle, lastArticle) {
                               var html = $("a:has(img)", lastArticle).html()  || "",
                               linkHtml = html.replace(this.smallWidth, this.mainWidth).replace(this.smallHeight, this.mainHeight),
                               link = $("a:has(img)", lastArticle).clone(),


                               header = $("<header></header>"),
                               caption = $("<div class='caption'>");
                               link.html(linkHtml);
                               caption.append("<h1>"+$("h4", lastArticle).html()+"</h1>");
                               header.append(caption);
                               header.append(link);

                               caption.append("<p>"+$("p", lastArticle).html()+"</p>");
                               header.hide();
                               return header;
                             };

                             this.createNextArticle = function(topArticle, lastArticle) {
                               var html = $("a:has(img)", topArticle).html()  || "",
                               smallLinkHtml = html.replace(this.mainWidth, this.smallWidth).replace(this.mainHeight, this.smallHeight),
                               smallLink = $("a:has(img)", topArticle).clone(),
                               newArticle = $("<article>");
                               newArticle.attr("class", $(lastArticle).attr("class") );
                               newArticle.append("<hr>");
                               smallLink.html(smallLinkHtml);
                               newArticle.append(smallLink);
                               newArticle.append("<h4>"+$("h1", topArticle).html()+"</h4>");
                               newArticle.append("<p>"+$("p", topArticle).html()+"</p>");

                               newArticle.hide();
                               return newArticle;


                             };

                             this.startUpdating = function() {
                               var self = this;
                               this.intervalID = setTimeout(function(){self.rotate();}, this.intervalTime);
                             };


                           };

                           var mar = new MainArticleRotator();
                           mar.startUpdating();
                           mar.afterUpdate = addFancyboxToPage;

                           addFancyboxToPage();



                         });

function addFancyboxToPage(){



                           $("a#example1").fancybox();
                           $("a#example2").fancybox({
                             'overlayShow' : false,
                             'transitionIn'  : 'elastic',
                             'transitionOut' : 'elastic'
                           });

                           $("a#example3").fancybox({
                             'transitionIn'  : 'none',
                             'transitionOut' : 'none'
                           });

                           $("a#example4").fancybox({
                             'opacity'   : true,
                             'overlayShow' : false,
                             'transitionIn'  : 'elastic',
                             'transitionOut' : 'none'
                           });

                           $("a#example5").fancybox();

                           $("a#example6").fancybox({
                             'titlePosition'   : 'outside',
                             'overlayColor'    : '#000',
                             'overlayOpacity'  : 0.9,
                             'type' : "image"
                           });

                           $("a#example7").fancybox({
                             'titlePosition' : 'inside'
                           });

                           $("a#example8").fancybox({
                             'titlePosition' : 'over'
                           });

                           $("a[rel=example_group]").fancybox({
                             'transitionIn'    : 'none',
                             'transitionOut'   : 'none',
                             'titlePosition'   : 'over',
                             'titleFormat'   : function(title, currentArray, currentIndex, currentOpts) {
                               return '<span id="fancybox-title-over">Foto ' + (currentIndex + 1) + ' von ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
                             }
                           });

                           $("#various1").fancybox({
                             'titlePosition'   : 'inside',
                             'transitionIn'    : 'none',
                             'transitionOut'   : 'none'
                           });

                           $("#various2").fancybox();

                           $("#various2_2").fancybox();

                           $("#various3").fancybox({
                             'width'       : '75%',
                             'height'      : '75%',
                             'autoScale'     : false,
                             'transitionIn'    : 'none',
                             'transitionOut'   : 'none',
                             'type'        : 'iframe'
                           });

                           $("#Registrieren").fancybox({
                             'width'       : '50%',
                             'height'      : '75%',
                             'autoScale'     : false,
                             'transitionIn'    : 'none',
                             'transitionOut'   : 'none',
                             'type'        : 'iframe'
                           });
                           $("#Meinedaten, .ABOREG, #Abo,#Abo2, #Newsletter, #Newsletter2").fancybox({
                             'width'       : '50%',
                             'height'      : '90%',
                             'autoScale'     : false,
                             'transitionIn'    : 'none',
                             'transitionOut'   : 'none',
                             'type'        : 'iframe'
                           });
                           $("#Lostpassword").fancybox({
                             'width'       : '20%',
                             'height'      : '40%',
                             'autoScale'     : false,
                             'transitionIn'    : 'none',
                             'transitionOut'   : 'none',
                             'type'        : 'iframe'
                           });
                           $("#various4").fancybox({
                             'padding'     : 0,
                             'autoScale'     : false,
                             'transitionIn'    : 'none',
                             'transitionOut'   : 'none'
                           });
                           // FANCYBOX END //
}




function NewWindow(width,height,url) {
  window.open(url,"PopUp","menubars=0,scrollbars=0,resizable=1,height="+height+",width="+width);
}
function choosedate () {
  window.open('/g/kalender_ger.html?searchform.dateselected','','menubar=0,titlebar=0,width=268,height=236');
  document.searchform.Interval.options[document.searchform.Interval.options.length-1].selected = true;
}
