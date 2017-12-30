
(function musicDB(){

    this.init = function(){
        this.search();
    };

    this.search = function(){
        var form = document.querySelector("#form");
        form.addEventListener("submit", function(e){
            e.preventDefault();
            var value = document.querySelector("#input_search").value;
            form.reset();
             //find whitespaces and replace it with '+'
            getData(value.split(' ').join("+"));
        });
    };

    this.getData = function(artist){
        var http = new XMLHttpRequest();
        var url = "https://itunes.apple.com/search?term=" + artist + "&entity=album";
        var method = "GET";

        var container = document.querySelector("#album_list_container");
        container.innerHTML = '';

        http.open(method, url);
        http.onreadystatechange = function(){
            if(http.readyState === XMLHttpRequest.DONE && http.status === 200){
                showArtist(JSON.parse(http.response));
            } else if (http.readyState == XMLHttpRequest.DONE && http.status !== 200) {
                //failed procedure TODO
            }
        }

        http.send();
    }

    this.showArtist = function(obj){
        var container = document.querySelector("#album_list_container");
        var template = '';

        if(obj.results.length > 0){
            document.querySelector("#not_match").style.display = 'none';
            for(var i = 0; i<obj.results.length; i++){
                if(i < 4) {
                    template += '<div class="col-sm-3 album_item">';
                }
                else {
                    template += '<div class="col-sm-3 album_item hideme">';
                }
                template += '<div class="item_thmb" style="background: url('+ obj.results[i].artworkUrl100 + ')"></div>';
                template += '<div class="item_title">' + obj.results[i].collectionName + '</div>';
                template += '<div class="item_price"><span>Price</span>'+ obj.results[i].collectionPrice + 'USD </div>'; 
                template += '<a href="' + obj.results[i].collectionViewUrl + '#" target="_blank">Buy now</a>';
                template += '</div>';                
            }

            container.innerHTML = '';
            container.insertAdjacentHTML('afterbegin', template);
            showOnScroll();
        } else {
            document.querySelector("#not_match").style.display = 'block';
        }
    }

    this.showOnScroll = function(){
        $(window).scroll( function(){   
            $('.hideme').each( function(i){
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                /* If the object is completely visible in the window, fade it in */
                if( bottom_of_window > bottom_of_object ){
                    $(this).animate({'opacity':'1'},500);
                }
             }); 
        });
    }

    this.init();
})();