// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

/* Init global molockup variable */
var molockup = {};
molockup.title = 'go!';

/*
* global molockup.blockpool contains block types
*
* structure: 'type_name':{
*               'title': 'Title in menu',
*               'action': function(contetnt){}
*           }
*
* content - div inside block with all content, requires css class 'content', and can has other classes for custom styles
*
* */
(function(molockup){
    molockup.blockpool = {
        'reset' : {
            'title': 'Clear box (reset)',
            'action': function(content){
                content.html('')
                        .css({
                                 'width':'100%',
                                 'height':'100%',
                                 'background': 'none'
                             })
                        .attr('class', 'content');
            }
        },

        'string' : {
            'title': 'One String',
            'action': function(content){
                content.html(molockup.title)
            }
        },
        'background':{
            'title': 'Black Back',
            'action': function(content){
                content.css({
                    'background':'#000000'
                }).removeClass().addClass('content');
            }
        },
        'log': {
            'title': 'Holy bible!',
            'action':function(content){
                console.log(molockup);
            }

        }
    }
})(molockup);