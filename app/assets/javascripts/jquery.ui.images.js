(function($){
    $.fn.getImage = function(){
        console.log(this);
        this.css({
            'width':'500px'
        })
        console.log('wtf?');
    }
})(jQuery);

(function($){


    $.widget('ui.images', {

        options: {
            title: 'images',
            when_loaded: null
        },
        
        thumbs: [],
        
        _create: function(){
            var self = this;
            
        },
        /*
         * Загрузка картинок из гугла
         */
        from_google: function(){
        
            var apiURL = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&callback=?';
            var self = this;
            
            // Тема поиска, переделать
            if ($('#theme').val()) {
                var theme = $('#theme').val();
            }
            else {
                var theme = 'applicot'
            };
            
            $.getJSON(apiURL, {
                q: theme,
                rsz: '8',
                start: 0
            }, function(r){
            
                var data = r.responseData.results;
                
                self.thumbs[theme] = [];
                
                $.each(data, function(i, item){
                   
                    self.thumbs[theme][i] = {
                        thumb: item.tbUrl,
                        thumb_width: item.tbWidth,
                        thumb_height: item.tbHeight,
                        width: item.width,
                        height: item.height,
                        url: item.url,
                        title: item.titleNoFormatting
                    };
                    
                });
                
                if ($.isFunction(self.options.when_loaded)) {
                    self.options.when_loaded.call(self.thumbs[theme]);
                };
                
                            });
        },
        
        /*
         * Загрузка картинок с фликра
         */
        from_flickr: function(){
            var self = this;
            var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=snowboard&tagmode=any&format=json&jsoncallback=?";
            
            $.getJSON(url, function(data){
            
                $.each(data.items, function(i, item){
                    console.log(item);
                    
                    self.thumbs[theme][i] = {
                        thumb: null,
                        thumb_width: 'auto',
                        thumb_height: 'auto',
                        width: 'auto',
                        height: 'auto',
                        url: item.media.m,
                        title: item.title
                    };
                    
                });
            });
        }
    });
    
    
})(jQuery);
