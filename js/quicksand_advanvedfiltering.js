// Custom sorting plugin
google.load("jquery", "1.6.0");

google.setOnLoadCallback(function()
{ 
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

});
