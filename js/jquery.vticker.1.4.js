
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
    , moveUp = function(){
        var last  = $("li",el).last();
        $("ul", el).prepend(last); 
        last.css("margin-top", -1 * last.height());

        last.animate({
            "margin-top": 0
   
        }, options.speed);

        // $("li:visible",el).last().slideUp(options.speed); 
    }

    , togglePause = function(){

        el.hover(function(){
            isPaused = true; 
        },function(){
            isPaused = false; 
        }) ; 
    }

    , tick = function(){
        if(!isPaused){
            moveUp();   
        }
        setTimeout(tick, options.pause);
    }

    , hideExtras = function(){
        $("li",el).each(function(i,e){
            if(i < options.showItems){
                $(e).show(); 
            } else {
                $(e).hide(); 
            }
        });
    }

    ,init = function(){
     //  hideExtras(); 
        togglePause();
        tick();
    };
    
    init();
    return this; 
}; 
