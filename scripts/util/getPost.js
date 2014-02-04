define(function() {

    'use strict';

    var getPost;

    (function ($, undefined) {

        // Get: Fetching the post preview from the server
        getPost = function(postId, callback) {

            // Defining the ID
            var id = postId ? postId : false;

            // Making the XHR ajax call to the WP databse
            $.ajax({
                url: window.ajaxurl,
                type: 'GET',
                data: {
                    action: 'get_post_preview',
                    id: id,
                    post_type: window.typenow
                },
                dataType: 'json',
                success: function(data) {

                    // Console logging for debugging
                    // console.log(data.debug);

                    // Initializing the callback if defined, passing on the data
                    if(callback !== undefined && typeof callback === 'function') {
                        callback(data);
                    }

                    return data;
                },
                error: function() {
                    console.log('Error');
                    return false;
                }
            });
        };

    })(jQuery);

    return getPost;

});