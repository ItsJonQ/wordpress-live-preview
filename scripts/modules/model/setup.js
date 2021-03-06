define([
    'api',
    'Model',
    'util/getPost'
    ], function(Api, Model, getPost) {

    'use strict';

    var modelSetupPostEdit;
    var modelSetupPostList;

    // Creating the collection for posts
    Api.Data.posts = {
        collection: {
            models: []
        }
    };

    // Fn: Setting up the post model (in edit view)
    modelSetupPostEdit = function() {
        if(Api.check.postEdit()) {

            // Defining the post body DOM element
            var postBody = document.getElementById('post-body-content');
            postBody = postBody ? postBody : null;

            // Get the Post ID DOM Element
            var postId = document.getElementById('post_ID');
            if(!postId) return false;

            // Getting the ID value from the post_ID input
            var id = postId.value;

            // Creating the new model
            var model = new Model();

            // Overriding the default attributes of the Post model
            model.override('collection', Api.Data.posts.collection.models);

            // Defining the el of the model
            model.override('el', postBody);

            // Adding the Post model to the collection
            Api.Data.posts.collection.models.push(model);

            // Getting the post's info from the Wordpress database
            getPost(id, function(data) {
                // Defining the post info from the response data
                var postInfo = data.post;

                // Defining the attributes of the model
                model.override('attributes', postInfo);

                // Defining the viewStatus of the model
                model.attributes.viewStatus = false;

            });
        }
    };

    // Fn: Setting up the post models (in list view)
    modelSetupPostList = function() {

        if(Api.check.postList()) {
            // Getting the post list from the DOM
            var posts = document.querySelectorAll('#the-list tr');
            // Return false of the post list doesn't exist
            if(!posts) { return false; }

            // Looping through all the posts
            for(var i = 0, len = posts.length; i < len; i++) {

                // Defining the post's DOM element
                var post = posts[i];

                // Caching the date DOM element
                var authorEl = post.querySelector('td.author a');
                var dateEl = post.querySelector('td.date abbr');
                var titleEl = post.querySelector('td.post-title a');
                var editEl = post.querySelector('.row-actions .edit a');

                // Defining all of the post's attributes
                var author = authorEl ? authorEl.innerHTML : null;
                var date = dateEl ? dateEl.innerHTML : null;
                var id = parseInt(post.id.replace('post-', ''), 10);
                var title = titleEl ? titleEl.innerHTML : null;
                var time = dateEl ? dateEl.title : null;
                var editUrl = editEl ? editEl.href : null;

                // Creating a new Model for the post
                var model = new Model();

                // Overriding the default attributes of the Post model
                model.override('collection', Api.Data.posts.collection.models);

                // Defining the el of the model
                model.override('el', post);

                // Defining the attributes of the model
                model.override('attributes', {
                    author: author,
                    date: date,
                    editUrl: editUrl,
                    id: id,
                    time: time,
                    title: title,
                    viewStatus: false
                });

                // Adding the Post model to the collection
                Api.Data.posts.collection.models.push(model);

            }

            return true;

        } else {
            return false;
        }

    };

    var modelSetup = function() {
        modelSetupPostEdit();
        modelSetupPostList();
    };

    return modelSetup;

});