'use strict';

// match markdown image and covert to asset_img
hexo.extend.filter.register('before_post_render', function(data){

    data.content = data.content.replace(/!{1}\[([^\[\]]*)\]\((.*)\s?(?:".*")?\)/g,
        function(match_str, label, path){

            let len = path.split("/").length;
            if( len == 3  && path.substring(0,2) == "./" ){//if  using  asset folder(post_asset_folder: true)
                // console.debug("Markdown Image Path: " + match_str);
                return "{% asset_img \"" + (path.split("/"))[2] + "\" \"" +  label + "\" %}"
            } else if (len > 3  && path.substring(0,7) == "/source") { // using global image config
                // console.debug("Markdown Image Path: " + match_str);
                let modified_match_str = match_str.replace('/source', '');
                return modified_match_str;
            } else if (path.search("/") == -1) { // no path defined, maybe example just return
                // console.debug("Markdown Image Path: " + match_str);
                return match_str;
            } else {
                console.debug(match_str);
                console.debug("Label :"+label);
                console.debug(path);
                console.debug("Markdown Image Path Pattern Error! ");
                return match_str;
            }

        });

    return data;
});
