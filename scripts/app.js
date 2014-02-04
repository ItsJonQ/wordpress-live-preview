define(function(require, exports, module) {

    'use strict';

    // Defining the API
    var Api = require('api');

    // Defining the Model class/constructor
    var Model = require('Model');
    var modelSetup = require('modules/model/setup');

    // Defining the modal (preview pop up)
    var modal = require('modules/modal/modal');

    // Defining the events
    var eventSetup = require('modules/events/setup');

    // Fn: Init method for post Preview module
    var init = function() {

        // Return false if post isn't post page
        if(!Api.check.postList() && !Api.check.postEdit()) { return false; }

        // Init model setup
        modelSetup();

        // Init event setup
        eventSetup.init();

        // Returning true
        return true;

    };

    // Updating the Api module

    Api.Models = {
        Base: Model
    };

    Api.Data.modal = modal.Data;

    Api.events = eventSetup;

    Api.modules = {
        modal: {
            exports: modal,
            events: modal.events,
            render: modal.render,
            status: modal.status
        },
    };

    Api.init = init;

    // Pushing the Api to the global Window

    window._QLP = Api;

    return Api;

});