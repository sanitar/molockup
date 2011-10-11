(function($){

    $.widget('ui.blocktype', {
    
        options: {
            title: 'blocktype'
        },
        
        _create: function(){
            var self = this;
            
        },
        
        b_simple: function(){
					
        },
        
        b_text: function(){
        
        },
        
        b_image: function(){
        
        },
        
        b_map: function(element, kind){
        	    
							var myLatlng = new google.maps.LatLng(-34.397, 150.644);
							var myOptions = {
								zoom: 8,
								center: myLatlng,
								mapTypeId: google.maps.MapTypeId.ROADMAP
							}
				
							var map = new google.maps.Map($(element)[0], myOptions);
							//console.log(document.getElementById("map_canvas"));
							//console.log($('#map_canvas'))
									/*$('#rmap').click(function(){
									 	$('#map_canvas').resizable({
									 		stop: function(){
									 			google.maps.event.trigger(map, "resize");
									 		}
									 	});
									 })*/
					
        	
        }
        	
            
	})
})(jQuery);

