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

            //Разобраться почему работает только так, стрнная хуйня
            this.trigger_collection = $('<div/>').triggers();
            this.layer_collection = $('<div/>').layers();
            this.types_collection = $('<div/>').blocktype();
            this.images_collection = $('<div/>').images({
                when_loaded: function(){
                    self.show_thumbs(this);
                }
            });
            this._modal_window('create');

            $('#add_layer').click(function(){
                self.create_layer();
                
            });
           
            
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
            
            
            // Триггер для картинок из гугла
            this.get_images_trigger = $('#get_images_trigger');
            
            this.get_images_trigger.click(function(){
                self.images_collection.images('from_google');
            });
            
            
            // Контентное меню
            //this._content_menu('create', $('body'), {});

            // Тригер для элементов
            this.element.click(function(){

                $('<div/>').mblock({
                    content: 'yo'
                });

            });
            
            this.work_space.selectable({
                filter: '.element'
            });

            this.draw_menu();
            
            
        },
        /*
        * Menu creation prototype
        * @todo refactor menu creation
        *
        * */
        draw_menu: function(){

            $.each(molockup.blockpool, function(key, item){

                var menu_item = $('<li/>');
                menu_item.append($('<a/>', {'href':'#'}))
                menu_item.children().append(item.title);

                $('#qwe').append(menu_item);
                menu_item.bind('click', function(){
                    $('<div/>').mblock({blockpool: key});
                })
            })
        },
        /*
         * Создание слоя
         */
        create_layer: function(template){
            var self = this;
            
			
            //Создаем слой, заменить на нормальную херню
            this.current_layer = this.layer_collection.layers('new_layer', 'header');
            //Меняем активный слой
            this.layers_container.children('.active').removeClass('active');
            $(this.current_layer.element).addClass('active');
            
            this.current_layer.element.click(function(){
                self.current_layer = this;
                /*
				 * Допилить нормальную выборку элементов в слое
				*/
                $('.ui-selected').removeClass('ui-selected');
                $('.'+self.current_layer.id).addClass('ui-selected');
				
				
                self.layers_container.children('.active').removeClass('active');
                $(this).addClass('active');
                
            });
        },
        

        /*
         * Обернуть и запихнуть тамбы
         */
        show_thumbs: function(thumbs){
            var self = this;
			
            $.each(thumbs, function(i, item){
                $("<img/>")
                .attr({
                    src: item.thumb,
                    title: item.width + ' x ' + item.height
                })
                .prependTo(self._modal_window('show'))
                .wrap($('<div/>', {
                    'class': 'image_wrapper'
                })).click(function(){
					
                    /*
					 * Поменять на метод замены содержимого, а в него впихнуть подгон размера блока под картинку
					*/
                    var type = $('#block_type').val();
                    if (self.selected_block){
                        self.selected_block.content.removeClass('type_text').addClass(type);
                        self.selected_block.settings.content = $("<img/>").attr("src", item.url);
                        self.selected_block.settings.width = item.width;
                        self.selected_block.settings.height = item.height;
                        self.update_element(self.selected_block);
						
                    }
                    
				
                });
            });
            
        },
        
        /*
         * Модальное окно
         */
        _modal_window: function(action, content_type){
        
            var self = this;
            
            switch (action) {
            
                case 'create':
                    
                    var window_width = $(window).width() / 2;
                    
                    this.modal_window_handler = $('<div/>', {
                        'id':'modal_window_handler'
                    });
                    this.modal_window_handler.html('<h1>Images from Google</h1>');
					
                    this.modal_window_content = $('<div/>', {
                        'class':'modal_window_content'
                    });
					
					
                    this.modal_window_block = $('<div/>', {
                        'class':'modal_window'
                    });
                    this.modal_window_block.append(this.modal_window_handler);
                    this.modal_window_block.append(this.modal_window_content);
                    this.modal_window_block.appendTo($('body'));
                    
                    // Драгается
                    this.modal_window_block.draggable({
                        handle: this.modal_window_handler
                    });
                    
                    //Триггер уничтожения
                    this.trigger_collection.triggers('close_trigger', this.modal_window_block, 'hide');
                    
                    this.modal_window_block.css({
                        'left': window_width - 250,
                        'top': '50px'
                    })
                    this.modal_window_block.hide();
                    break;
                    
                case 'show':

                    this.modal_window_block.show();
                    
                    break;
                    
                case 'hide':
                    this.modal_window_block.hide();
                    break;
                    
            }
            
            return this.modal_window_content;
        },
        
        /*
         * Сохранить текущую верстку
         * @todo не работает если есть гугло карты
         */
        _save_layout: function(){
        	
            //console.log(this.elements.length);
            console.log($('meta[name=csrf-token]').attr('content'));

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
                url: '/project/'+this.options.project_id+'/mockup/'+this.options.mockup_id+'/save',
                data: {
                    'authenticity_token':$('meta[name=csrf-token]').attr('content'),
                    'mockup': {
                        'content': JSON.stringify(molockup.blocks)
                    }
                },
                success: function(){
                    console.log('done!')
                }
            });
                
        //console.log(this.elements_info);
        },
		
        /*
         * Загрузить верстку мокапа
         */
        _load_layout: function(){
            var self = this;
            //console.log(this.elements.length)
            //for(var el in this.elements) {
            //console.log(el)
            //}
            //alert(JSON.stringify(this.elements))
			
            var loaded_layout = $.ajax({
                type: 'GET',
                url: '/projects/'+this.options.project_id+'/mockups/'+this.options.mockup_id+'.json',
                success: function(msg){
                    self._draw_layout(msg)
                },
                dataType: 'json'
            });
			
			
                
        // console.log(loaded_layout);
        },
        _draw_layout: function(layout_data){
            for(var el in layout_data) {
                //this._create_block('',layout_data[el].settings.type,layout_data[el].settings)
                $('<div/>').mblock({
                    donor:layout_data[el].element
                })
            }
        //_create_block
        },
        
        _callback: function(fn){
            if ($.isFunction(fn)) {
                fn.call(this);
            }
        }
        
    });
    
    
})(jQuery);

