
(function($){
    $.fn.vTicker = function(_options) {
        return this.each(function(){
            this.ticker = new VTicker(this, _options);
        });
    };
})(jQuery);


VTicker = function(_el, _options){

    var defaults = {
        speed: 2000,
        pause: 4000,
        showItems: 3,
    }

    , el = $(_el)
    , options = $.extend(defaults, _options)
    , isPaused = false
    , timeOut = new Date()
    , moveUp = function(){
        var last  = $("li",el).last();
        $("ul", el).prepend(last);
        last.show(); 
        last.css("margin-top", -1 * last.height());
        last.stop().animate({
            "margin-top": 0
        }, options.speed);
       hideExtras();
    }

    , togglePause = function(){

        el.hover(function(){
            isPaused = true;
        },function(){
            isPaused = false;
        }) ;
    }

    , tick = function(){
        var to = new Date() - timeOut;
        timeOut =  new Date();  
        if(!isPaused && timeOut > options.pause){
            moveUp();
        }
        else{
            console.log("."); 
        }
        setTimeout(tick, options.pause);
    }

    , hideExtras = function(){
        $("li",el).each(function(i,e){
            if (i < options.showItems){
                $(e).show();
            } else {
                $(e).fadeOut(options.speed);
            }
        });
    }
    , maxHeight = function(){
        var mh = 0
        , lis = $("li",el).sort(function(a,b){return   $(b).height() - $(a).height()})
        , size = Math.min(lis.size(), options.showItems);

        for(var i = 0; i < size; i++)
        {
            mh += $(lis[i]).height();
        }

        el.height(mh);
    }

    ,init = function(){
        maxHeight();
        hideExtras();
        togglePause();
        tick();

    };

    init();
    return this;
};
