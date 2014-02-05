(function($) {

    'use strict';

    // Defining the config for RequireJS
    require.config({
        packages: []
    });

    // Execute the modulated App after jQuery and Document is ready
    $(document).on('ready', function() {
        require(['app'], function(App) {

            // Initializing the App
            App.init();

        });
    });

})(jQuery);