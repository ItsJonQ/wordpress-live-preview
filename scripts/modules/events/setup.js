define([
    'api',
    'helper/eachModel',
    'modules/model/eventClick',
    'modules/model/eventRender',
    'modules/modal/eventClickNavigation',
    'modules/modal/eventKeypress'
    ],
    function(
        Api,
        eachModel,
        eventClick,
        eventRender,
        eventClickNavigation,
        eventKeypress
    ) {

    'use strict';

    // Defining the init status
    var initStatus = false;

    var createEventTrigger;
    var postEditEvents;
    var postListEvents;
    var init;
    var exports;

    (function($, undefined) {

        // Fn: Creating the event trigger
        createEventTrigger = function($actionRow, action, click) {
            // Return false if action or click is not defined
            if(!action || !click) return false;

            this.override('events', { preview: click });

            action.appendChild(click);

            $actionRow[0].appendChild(action);

            return true;

        };

        postEditEvents = function() {

            // Verifying that the page is post edit
            if(!Api.check.postEdit()) return false;

            // Looping through the model
            eachModel(function(model, i) {

                // Verifying that the postBody exists
                var postBody = model.el;
                if(postBody) {

                    // Getting the action row element from the DOM
                    var $actionRow = $(postBody).find('#edit-slug-box');

                    // Creating the action and click elements
                    var previewAction = document.createElement('span');
                    var previewClick = document.createElement('a');
                    previewClick.classList.add('button', 'button-small', 'hide-if-no-js');
                    previewClick.innerHTML = 'Live Preview';

                    // TODO: Can't Use Post List Due to WP Underscore Conflict

                    // Creating the event trigger
                    createEventTrigger.call(model, $actionRow, previewAction, previewClick);

                }
            });
            return true;
        };

        postListEvents = function() {
            // Verifying that the page is post lists
            if(!Api.check.postList()) return false;
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

                // Creating the event trigger
                createEventTrigger.call(model, $actionRow, previewAction, previewClick);

            });
            return true;
        };

        // Fn: Initializing the setup for events
        init = function() {

            // Return false if the initStatus is true
            if(initStatus) { return false; }

            // Switching the initStatus to true
            initStatus = true;

            if(Api.check.postEdit()) postEditEvents();
            if(Api.check.postList()) postListEvents();

            eventKeypress();

            eventClickNavigation();

            eventClick();

            // Returning true
            return true;

        };

    })(jQuery);

    // Exporting the methods of event setup
    exports = {
        click: eventClick,
        init: init,
        keypress: eventKeypress,
        navigationClick: eventClickNavigation
    };

    return exports;

});