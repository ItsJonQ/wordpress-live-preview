(function($) {

    'use strict';

    // Defining the config for RequireJS
    require.config({
        packages: [
            {
                name: 'underscore',
                location: 'vendor/',
                main: 'underscore'
            }
        ]
    });

    // Execute the modulated App after jQuery and Document is ready
    $(document).on('ready', function() {
        require(['underscore', 'app'], function(_, App) {

            // Initializing the App
            App.init();

        });
    });

})(jQuery);