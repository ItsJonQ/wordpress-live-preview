define([
    'api',
    'helper/eachModel'
    ], function(Api, eachModel) {

    'use strict';

    var eventNavigation;

    // Fn: Event to go to the previous / next post
    eventNavigation = function(direction) {

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

        var postToRender = Api.Data.posts.collection.models[index];

        // Rendering the next/previous post
        postToRender.render();

        // Returning the next/previous post
        return postToRender;

    };

    return eventNavigation;

});