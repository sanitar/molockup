/* 
* Init global molockup variable with title and
* molockup conditions, current 'layer', 'bundle' and 'block' 
*/

var molockup = {
		title: 'Molockup!',
		condition:{
			layer:{},
			bundle:{},
			block:{}
			}
		};

/*
* Global flash actions
* action - name of action
* msg - message
* data - data
* 				Sincerely yours, KO.
*/
var flash = function(action, msg, data){
				msg = msg || 'Flash time, baby!';
				data = data || {};
				
				switch (action){
					case 'alert':
						alert(msg)
					case 'update_info_panel':
						$(molockup.current_block_info[0]).html($(molockup.condition.block).attr('id'));
					default:
						console.log(action, msg, data)
						
					}
				}
