define(function(require, exports, modules) {

    'use strict';

    // Defining the init status
    var initStatus = false;

    // Defining the eachModel helper
    var eachModel = require('helper/eachModel');

    // Defining event methods
    var eventClick = require('modules/model/eventClick');
    var eventRender = require('modules/model/eventRender');
    var eventClickNavigation = require('modules/modal/eventClickNavigation');
    var eventKeypress = require('modules/modal/eventKeypress');

    var init;

    (function($, undefined) {

        // Fn: Initializing the setup for events
        init = function() {

            // Return false if the initStatus is true
            if(initStatus) { return false; }

            // Switching the initStatus to true
            initStatus = true;

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