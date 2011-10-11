/*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* 
* DEPRECATED STUFF, FUCK OUT
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* */
(function($){

    $.widget('ui.triggers', {
    
        options: {
            title: 'triggers'
        },
        
        _create: function(){
            var self = this;
			console.log('huyak');
            
        },
        
        close_trigger: function(current_element, action, destroy_fn){
			var self = this;
            var close_trigger = $('<div/>').addClass('close_trigger');
            
            current_element.append(close_trigger);
            
			close_trigger.click(function(){
				
                if (action == 'hide') {
                    current_element.hide();
                }
                else {
                    current_element.remove();
					self._callback(destroy_fn)
                };
                
            });
			return false
        },
		
		clone_trigger: function(current_element){
			var insert_block_trigger = $('<div/>').addClass('insert_trigger');
			
            current_element.append(insert_block_trigger);
            return insert_block_trigger
		},
		
		select_trigger: function(current_element){
			var select_block_trigger = $('<div/>').addClass('select_trigger');
			
            current_element.append(select_block_trigger);
            return select_block_trigger
		},
        
        _callback: function(fn){
            if ($.isFunction(fn)) {
                fn.call();
            };
                    }
    });
    
    
})(jQuery);