define(function(require, exports, module) {

    'use strict';

    var Model = require('Model');
    var modal = require('modules/modal');

    // Creating the globals QLivePreview API
    window.QLivePreview = {
        Data: {
            modules: {}
        },
        Models: {},
        modules: {}
    };

    (function ($, _Q, undefined) {

        _Q.Data = {};

        // Fn: Setting up the post models
        var modelSetup = function() {

            // Getting the post list from the DOM
            var posts = document.querySelectorAll('#the-list tr');
            // Return false of the post list doesn't exist
            if(!posts) { return false; }

            // Creating the collection for posts
            _Q.Data.posts = {
                collection: {
                    models: []
                }
            };

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
                model.override('collection', _Q.Data.posts.collection.models);

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
                _Q.Data.posts.collection.models.push(model);

            }
        };

        // Fn: Helper method to loop through each model
        var eachModel = function(callback) {
            var collection = _Q.Data.posts.collection;
            var models = collection.models;
            // Make sure the collection is valid and has models in it
            if(collection === undefined || models.length === 0) {
                return false;
            }

            // Looping through all the models and initializing the callback, if defined
            for(var i = 0, len = models.length; i < len; i++) {
                var model = models[i];
                if(callback !== undefined && typeof callback === 'function') {
                    callback(model, i);
                }
            }
            // Returning true
            return true;
        };

        // Get: Fetching the post preview from the server
        var getPost = function(postId, callback) {

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
                    console.log(data.debug.post);

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

        var eventUpdateEditPostLink = function(model) {

            if(!model) { return false; }

            var editButton = modal.Data.els.edit;

            if(!editButton) { return false; }

            console.log(model);

            editButton.href = model.get('editUrl');

            return true;

        };

        // Fn: Updating the viewStatus of the model
        var eventUpdateViewStatus = function(model) {

            if(!model) { return false; }

            eachModel(function(m, i){
                m.attributes.viewStatus = false;
            });


            model.attributes.viewStatus = true;

        };

        // Event: Rendering the Model's UI in the popup
        var eventRender = function(e, model) {

            // Return false if the model is not defined
            if(!model) {
                return false;
            }

            if(e) { e.preventDefault(); }

            var id = model.get('id');

            eventUpdateViewStatus(model);

            eventUpdateEditPostLink(model);

            // Optimization: Cached Method
            if(model.get('template')) {

                modal.events.activate();
                modal.render(model, true);

                return true;

            }

            // Initializing the Wordpress ajax call
            getPost(id, function(data) {
                var post = data.post;

                modal.events.activate();

                modal.render(model, post);

            });

            return true;
        };

        // Event: Creating the post preview click action
        var eventClick = function() {

            // Looping through each model
            eachModel(function(model, i){

                // Adding the click event to the model
                model.events.preview.addEventListener('click', function(event) {
                    // Activating the render method
                    eventRender(event, model);
                }, false);

                // Adding the render method to the model
                model.override('render', function() {
                    eventRender(false, model);
                });

            });

            // Returning true
            return true;

        };

        // Fn: Event to go to the previous / next post
        var eventNavigation = function(direction) {

            // Return false if direction is not defined
            if(!direction) { return false; }

            // Defining the index
            var index = false;

            // Defining the postCounter
            var postCount = 0;

            // Looping through each model to find the "active" viewStatus
            eachModel(function(model, i) {

                // Increasing the post counter
                postCount++;

                if(model.get('viewStatus')) {
                    // Setting the index of the active view
                    index = i;
                    postCount++;
                }

            });

            // Return false if the index isn't set/defined
            if(index === false) { return false; }

            // Adjusting the index based on the direction
            if(direction === 'next') {
                // Increase the index if it is less than the postCount
                if(index < postCount) {
                    index = index + 1;
                } else {
                    return false;
                }
            } else if(direction === 'previous' || direction === 'prev') {

                // Decrease the index if it is more than zero
                if(index !== 0) {
                    index = index - 1;
                } else {
                    return false;
                }
            }

            var postToRender = _Q.Data.posts.collection.models[index];

            // Rendering the next/previous post
            postToRender.render();

            // Returning the next/previous post
            return postToRender;

        };

        var eventClickNavigation = function() {
            var header = modal.Data.els;

            if(!header) { return false; }

            var previous = header.previous;
            var next = header.next;

            previous.addEventListener('click', function(e) {
                e.preventDefault();
                eventNavigation('previous');
            }, false);

            next.addEventListener('click', function(e) {
                e.preventDefault();
                eventNavigation('next');
            }, false);

            return true;

        };

        // Event: Keyboard left/right navigation
        var eventKeypress = function() {
            $("body").keydown(function(e){

                // Return false if the modal isn't active
                if(!modal.status) { return; }

                // Left for previous posts
                if((e.keyCode || e.which) === 37)
                {
                    eventNavigation('previous');
                }

                // Right for next post
                if((e.keyCode || e.which) === 39)
                {
                    eventNavigation('next');
                }

                // Escape to Close the modal
                if((e.keyCode || e.which) === 27)
                {
                    modal.events.deactivate();
                }

                return true;

            });

        };

        // Fn: Method to setup the post click event
        var eventSetup = function() {

            // Looping through each model
            eachModel(function(model, i) {

                // Injecting the event link
                var $actionRow = $(model.el).find('.row-actions');
                if(!$actionRow[0]) { return false; }

                var previewAction = document.createElement('span');
                previewAction.classList.add('preview-post');
                previewAction.innerHTML = ' | ';

                var previewClick = document.createElement('a');
                previewClick.setAttribute('data-post-id', model.get('id'));
                previewClick.href = '#';
                previewClick.innerHTML = '<strong>Live Preview</strong>';

                model.override('events', { preview: previewClick });

                previewAction.appendChild(previewClick);

                $actionRow[0].appendChild(previewAction);

            });

            eventKeypress();

            eventClickNavigation();

            // Returning true
            return true;

        };

        // Fn: Init method for post Preview module
        var init = function() {

            // Return false if the page is not a post-edit page
            if(window.pagenow !== undefined && window.pagenow.indexOf('edit-') === -1) {
                return false;
            }


            // Init stack for
            modelSetup();
            eventSetup();
            eventClick();

            // Returning true
            return true;

        };


    ////////////////////////////////////////
    // Inits
    ////////////////////////////////////////

        _Q.Models = {
            Base: Model
        };

        _Q.Data.modal = modal.Data;

        _Q.modules = {
            modal: {
                exports: modal,
                events: modal.events,
                render: modal.render,
                status: modal.status
            },
            navigation: {
                init: eventNavigation
            }
        };

        _Q.init = init;

    })(jQuery, QLivePreview);

    return QLivePreview;

});