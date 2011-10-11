(function($){

    $.widget('ui.layers', {
    
        options: {
            title: 'layers',
            index: 0,
            name: 'layer'
        },
        
        _create: function(){
            var self = this;
			this.index = this.options.index;
			this.layers = [];
			this.layers_container = $('#layers');
			
        },
		
		new_layer: function(name){
			var self = this;
			this.index++;
			
			name = name || this.options.name;
			
			this.layers[this.layer_index] = {
				element: $('<li/>').addClass('layer_handler').attr('id', 'layer_'+this.index).html(name+' ('+this.index+ ')').prependTo(this.layers_container),
				index: this.index,
				z_index: this.index + this.options.start_z_index,
				id: 'layer_'+this.index
			};
			
			return this.layers[this.layer_index];
		}
    });
    
    
})(jQuery);