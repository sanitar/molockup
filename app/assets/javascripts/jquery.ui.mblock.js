/**
 * Created by Panasenkov Aleksandr.
 * User: pan
 * Date: 21.06.11
 * Time: 22:40
 */

(function($){

    $.widget('ui.mblock', {

        options: {
            title       : 'Mblock',
            block_type  : 'simple',
            block_id    : 0,
            layer_id    : 0,
            content     : 'Empty block',
            donor       : false,
            height      : 150,
            width       : 150,
            blockpool   : false

        },

        _create: function(){

            this.options.block_type = $('#block_type').val();
            this.init_block();
            /*
            * Making action from molockup.blockpool actions
            * this.options.blockpool - name of blockpool
            * */
            if (this.options.blockpool) {
                molockup.blockpool[this.options.blockpool].action(this.element.content);
            } 
            
        },

        init_block: function(){

            this.block_element = this.element;
            this.block_id = molockup.block_id++ || this.options.block_id;
            this.layer_id = this.options.layer_id;
            this.block_type = this.options.block_type;
            this.navigation = $('#navigation'); // @todo Ченить придумать по поводу появления блока, эта херня только для расчета позиции навигационного блока нужна ща
            this.workspace = $('#work_space'); // @todo Temp for draggable options
           
            this.ctrl = {}; // Block controllers

            this.debug = $('#debug'); // temp debug div
            
			// Block creation
            this._create_block();
            
            molockup.blocks['element_'+this.block_id] = this;
        },

        _create_block: function(){

            // Block content field
            this.block_content = $('<div/>', {
                    'class': 'content'
                });

            // Add layer id to block container
            this.element.addClass('layer_' + this.layer_id);

            // Add block id to block container
            this.element.attr('id', 'element_'+this.block_id);

            // Clone block, if has donor
            if (this.options.donor) {
                var donor = this.options.donor.settings;

                this.element.settings = {
                    id          : 'element_' + this.block_id,
                    width       : donor.width,
                    height      : donor.height,
                    left        : donor.left,
                    top         : donor.top,
                    type        : donor.type,
                    content_html: donor.content_html
                };
                this.block_content.append(donor.content_html);

            }
            else
            {
                this.element.settings = {
                    id          : 'element_' + this.next_id,
                    width       : this.options.width,
                    height      : this.options.height,
                    left        : this.navigation.position().left + this.navigation.width() + 20,
                    top         : 0,
                    type        : this.options.block_type,
                    content_html: this.options.content
                }
                this.block_content.append(this.options.content);
            }
            //(this.options.block_type);
            this.block_content.addClass(this.element.settings.type);

            //@todo Looks like ome kind of crap, forgot for what that was added
            this.element.append(this.block_content);
            this.element.content = this.block_content;


            /* Makes block draggable */
            this.element.draggable(this._draggable_options());

            /* Makes block resizable */
            this.element.resizable(this._resizable_options());
			var self = this;
            // Changes block selection
            this.element.click(function(){
                $('.ui-selected').removeClass('ui-selected');
                $(this).addClass('ui-selected');
				
				molockup.condition.block = this;
				flash('update_info_panel');
				return false
            });


            /*
             * Ховер блока
             */
            this.element.hover(function(){
                $(this).addClass('hovered');
            }, function(){
                $(this).removeClass('hovered');
            });

            /*
             * Позишн и размеры
             */
            this.element.addClass('element').css({
                'position'  : 'absolute',
                'width'     : this.element.settings.width,
                'height'    : this.element.settings.height,
                'left'      : this.element.settings.left + 20,
                'top'       : this.element.settings.top + 20
            });


            /* Add block to workspace */
            this.element.appendTo(this.workspace);

            /* Render triggers */
            this._render_triggers();

            /* Update block params info at first time */
            this.update_element_info();

        },

        /*
        * Updates block params info
        * OBJECT - this.element.settings
        * PARAMS;
        *   width
        *   height
        *   left
        *   top
        *   content_html
        * */
       update_element_info: function(){

            // @todo trigger which will send element info to wireframe
            this.element.settings = {
                    'width'         : this.element.width(),
                    'height'        : this.element.height(),
                    'left'          : this.element.position().left,
                    'top'           : this.element.position().top,
                    'content_html'  : this.element.content.html(),
                    'type'          : this.element.settings.type
            }
            return true

        },
        
         /*
         * Настройки для resizable
         */
        _resizable_options: function(){
            var self = this;
			var parent = 'parent';
			var options = {
    			handles: 'n, e, s, w, se',
                containment: parent,
                grid: 5,
                stop: function(event, ui){
                    self.update_element_info();

                }
            }
            return options

        },


        /*
         * Настройки для draggable
         */
        _draggable_options: function(){
            var self = this;
            var parent = 'parent';

            var selected_blocks = $([]), offset = {
                top: 0,
                left: 0
            };

            var options = {
                containment: parent,
                grid: [5, 5],
                scroll: true,
                stop: function(event, ui){

                    //@todo update other selected blocks info
                    
                    self.update_element_info();
                },
                start: function(ev, ui){
                    selected_blocks = self.workspace.children('.ui-selected').each(function(){
                        var el = $(this);
                        el.data("offset", el.offset());
                    });

                    offset = $(this).offset();
                },
                drag: function(ev, ui){

                    if (self.element.hasClass('ui-selected')) {
                        var dt = ui.position.top - offset.top, dl = ui.position.left - offset.left;

                        selected_blocks.not(self.element).each(function(){
                            var el = $(this), off = el.data("offset");
                            el.css({
                                top: off.top + dt,
                                left: off.left + dl
                            });
                        });
                    }
                }
            }
            return options
        },

        /*
        *  Creating default triggers
        *  triggers are methods in this.ctrl.triggers objects with two methods: handler and action
        *  handler - jQuery object
        *  action - function on handler click, return false
        *  @todo API for custom triggers
        * */

        _init_default_triggers: function(){
			var self = this;

            this.ctrl.triggers = {
                'close'     : {
                    'handler'   : $('<div/>',{'class':"close_trigger"}),
                    'action'    : function(){
                                    /*
                                    * @todo removes only dom object, need to remove all, especially object from molockup.blocks
                                    * */
                                    self.element.remove();
                                    return false
                    }
                },
                'clone'     : {
                    'handler'   : $('<div/>',{'class':'insert_trigger'}),
                    'action'    : function(){
                                    $('<div/>').mblock({
                                        donor:self.element
                                    });
                                    return false
                    }
                },
                'options'   : {
                    'handler'   : $('<div/>',{'class':'options_trigger'}),
                    'action'    : function(){
                                    // @todo next line don't work in opera
                                    self.debug.text(JSON.stringify(self.element));
                                    self._render_ctrl_content();
                                    return false

                    }
                    /*
                    * Can bind any jquery event
                    'event': 'mouseenter'
                    */
                },
                'select'    : {
                    'handler'   : $('<div/>',{'class':'select_trigger'}),
                    'action'    : function(){
                                    return false
                    }
                },
                'lock'      : {
                    'handler'   : $('<div/>',{'class':'lock_trigger'}),
                    'action'    : function(){
                                    self.element.resizable('option', 'disabled') ?
                                            self.element.resizable('option', 'disabled', false) :
                                            self.element.resizable('option', 'disabled', true);

                                    $(this).toggleClass('locked');
                                    return false

                    }
                }
            }
        },

        /*
        * Render all triggers from this.triggers object
        */
        _render_triggers: function(){

            var self = this;

            this._init_default_triggers();

            $.each(this.ctrl.triggers, function(){
                var event = this.event ? this.event : 'click';
                self.element.append($(this.handler));
                this.handler.bind(event, this.action)
            })

            return false
        },

		/*
		* Render content menu from molockup.blockpool 
		*/
        _render_ctrl_content: function(){
            var self = this;

            //this._init_default_content();

            molockup.content_menu.html('');

            $.each(molockup.blockpool, function(){
                var menu_item = $('<a/>').attr('href','#').html(this.title);

                molockup.content_menu.append(menu_item);
                menu_item.wrap('<li/>');

                var item = this;
                menu_item.click(function(){
                    item.action(self.element.content);
                    self.update_element_info();
                });

            })
            molockup.content_menu.wrapInner('<ul/>').toggle('show').draggable();

            return false

        }

    });

    
})(jQuery);