define([], function() {

    'use strict';

    // Constructor: For Base Models on the page
    var Model = function(attributes, options) {

        this.attributes = {};

        this.initStatus = false;

        // Fn: The base initialize function
        this.initialize = function() {

        };

        // Fn: The base init function that will execute initialize on creation
        this.init = function() {

            // Return false if the initStatus has already been fired
            if(this.initStatus) {
                return false;
            }

            // Changing the initStatus to true
            this.initStatus = true;


            // Executing the initalize function of avaiable
            if(this.initialize === undefined && typeof this.initialize !== 'function') {
                return false;
            } else {
                this.initialize();
            }

            // Removing the init & initialize method from the Model
            delete this.init;
            delete this.initialize;

        };

        // Executing the initialize function
        this.init();

    };

    // Fn: Method to get attributes
    Model.prototype.get = function(key) {

        // Return false if Key + Value is not defined
        if(!key) {
            return false;
        }

        // Returning the key
        return this.attributes[key];

    };

    // Fn: Method to set attributes
    Model.prototype.set = function(key, value) {

        // Return false if Key + Value is not defined
        if(!key || !value) {
            return false;
        }

        // Setting the key
        this.attributes[key] = value;

        // Returning the key
        return this.attributes[key];

    };

    // Fn: Method to set attributes
    Model.prototype.override = function(key, value) {

        // Return false if Key + Value is not defined
        if(!key || !value) {
            return false;
        }

        // Setting the key
        this[key] = value;

        // Returning the key
        return this[key];

    };

    return Model;

});