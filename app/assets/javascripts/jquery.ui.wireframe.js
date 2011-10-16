(function($){

    $.widget('ui.wireframe', {
        options: {
            title: 'wireframe',
            mockup_id: '1',
            project_id: '1'
        },

        init_vars: function(){
            this.next_id = 0;
            this.elements = {};
            this.work_space = $('#work_space');
            this.elements_info = $('#elements_info');
            this.current_layer = {};
            this.layers_container = $('#layers');
            molockup.content_menu = $('<div/>', {'class':'content_menu'}).appendTo('body').hide();
        },
        
        _create: function(){
            var self = this;

            /*
            * molockup - service object
            *
            * */

            molockup.block_id = 0;
            molockup.blocks = {};

            molockup.layer_id = 0;
            molockup.layers = [];

            this.init_vars();
           
            
            // Воткну сюда навигацию пока
            this.navigation = $('#navigation');
            this.navigation.draggable({
                containment: 'parent',
                axis: 'x'
            })
            
            // Temp layout save and get
            $('#save_layout').click(function(){
                self._save_layout();
            })
            $('#load_layout').click(function(){
                self._load_layout();
            })
      
            // Тригер для элементов
            this.element.click(function(){

                $('<div/>').mblock({
                    content: 'yo'
                });

            });
            
            this.work_space.selectable({
                filter: '.element'
            });
            
            
            
        },

        /*
         * Сохранить текущую верстку
         * @todo не работает если есть гугло карты
         */
        _save_layout: function(){
        	/*
            * @todo recalculate blocks params before saving (position and size)
            * */

            /*
            * Updates block positions
            * */
            for(var el in molockup.blocks) {
                molockup.blocks[el].element.mblock("update_element_info");
            }
            
            $.ajax({
                type: 'POST',
                url: '/projects/'+this.options.project_id+'/mockups/'+this.options.mockup_id+'/save',
                data: {
                    'authenticity_token':$('meta[name=csrf-token]').attr('content'),
                    'mockup': {
                        'content': JSON.stringify(molockup.blocks)
                    }
                },
                success: function(){
                    console.log('done!')
					// javascript from views/mockups/save.js.erb raises here
                }
            });
                
        },
		
        /*
         * Загрузить верстку мокапа
         */
        _load_layout: function(){
            var self = this;
            var loaded_layout = $.ajax({
                type: 'GET',
                url: '/projects/'+this.options.project_id+'/mockups/'+this.options.mockup_id+'.json',
                success: function(msg){
                    self._draw_layout(msg)
                },
                dataType: 'json'
            });
			
        },
		/*
		* Draw layout from json data, using 'mblock' widget
		*/
        _draw_layout: function(layout_data){
            for(var el in layout_data) {
                $('<div/>').mblock({
                    donor:layout_data[el].element
                })
            }
        },
        _callback: function(fn){
            if ($.isFunction(fn)) {
                fn.call(this);
            }
        }
        
    });
    
    
})(jQuery);

