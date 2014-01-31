<?php
/*
Plugin Name: Q: Live Preview
Description: Provides the ability to see a "Live" preview of the post
Version: 0.1
Author: Q
Author URI: Q
*/


// Fn: Registering the JS templates
function q_live_preview_templates() {
    $root = plugin_dir_path( __FILE__ ) . 'templates/';

    include($root . 'header.php');
    include($root . 'featured.php');
    include($root . 'blog.php');
    include($root . 'mobile.php');
    include($root . 'list.php');

}

// Fn: Registering and enqueing the plugin's styles
function q_live_preview_scripts() {

    wp_register_style( 'q-live-preview-style-css', plugins_url('styles/main.css', __FILE__) );

    wp_register_style( 'q-live-preview-template-css', plugins_url('styles/template.css', __FILE__) );

    wp_enqueue_style( 'q-live-preview-style-css' );
    wp_enqueue_style( 'q-live-preview-template-css' );

    $root = plugins_url('/scripts/', __FILE__);
    // Defining the Require.js source

    // Defining the script
    $script = '<script data-main="'.$root.'main" type="text/javascript" src="'.$root.'require.js"></script>' . "\n";

    // Returning the script tag with Echo
    echo $script;

}


// Fn: Setting a new length for the exceprt
function q_live_preview_excerpt_length( $length ) {
    return 40;
}

// Fn: Setting a new ... for the excerpt
function q_live_preview_excerpt_more($more) {
    return '...';
}

// Fn: Ajax: Returning a post preview
function get_post_preview() {
    global $post;
    // Check to make sure it is a valid XHR jQuery request
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

        // Define the post ID of the post preview request
        $post_id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : false;
        $post_type = isset($_REQUEST['post_type']) ? $_REQUEST['post_type'] : false;

        // Return false if the Post ID isn't defined
        if(!$post_id) {
            echo false;
            return false;
        }

        $response = array(
            'status' => false
        );

        ob_start();

        $posts_query = new WP_Query(array('post__in' => array($post_id), 'post_type' => 'any'));
        // $posts_query->query($query_string);

        if ($posts_query->have_posts()) {

            while ( $posts_query->have_posts() ) : $posts_query->the_post();

            $entry_id = get_the_ID();

            $image_id = get_post_thumbnail_id();
            $thumb_large = wp_get_attachment_image_src($image_id,'large', true);
            $thumb_medium = wp_get_attachment_image_src($image_id,'medium', true);
            $thumb_thumb = wp_get_attachment_image_src($image_id,'thumbnail', true);
            $thumb_homepage = wp_get_attachment_image_src($image_id,'homepage', true);

            // Creating the array for the JSON return
            $post_data = new stdClass;
            $post_data = array(
                'author' => array(
                    'profile' => esc_url_raw(get_author_posts_url(get_the_author_meta('ID'))),
                    'user' => get_the_author()
                ),
                'categories' => get_the_category($entry_id),
                'content' => array(
                    'excerpt' => get_the_excerpt()
                    // 'full' => get_the_content($entry_id)
                ),
                'id' => $entry_id,
                'permalink' => esc_url_raw(get_permalink($entry_id)),
                'post-type' => get_post_type($entry_id),
                'publish' => array(
                    'date' => get_the_time('M j, Y'),
                    'time' => get_the_time(),
                ),
                'slug' => $post->post_name,
                'title' => get_the_title($entry_id),
                'thumbnail' => array(
                    'large' => array(
                        'height' => $thumb_large[2],
                        'width' => $thumb_large[1],
                        'url' => $thumb_large[0]
                    ),
                    'medium' => array(
                        'height' => $thumb_medium[2],
                        'width' => $thumb_medium[1],
                        'url' => $thumb_medium[0]
                    ),
                    'thumbnail' => array(
                        'height' => $thumb_thumb[2],
                        'width' => $thumb_thumb[1],
                        'url' => $thumb_thumb[0]
                    ),
                    'homepage' => array(
                        'height' => $thumb_homepage[2],
                        'width' => $thumb_homepage[1],
                        'url' => $thumb_homepage[0]
                    ),
                )
            );

            endwhile;


            $response['post'] = $post_data;
            $response['status'] = true;
        }

        $response['debug'] = $posts_query;

        wp_reset_postdata();

        $response = json_encode($response);
        echo $response;

    } else {
        // Exit if it is invalid
        exit();
    }
    // die() to end the WP ajax method
    die();
}

// JS: Loading the JS templates into the footer
    add_action('admin_footer', 'q_live_preview_templates');

// CSS: Adding the plugin's CSS into admin head
    add_filter('admin_head', 'q_live_preview_scripts');

// Ajax: Adding the ajax function for post previews
    add_action('wp_ajax_get_post_preview', 'get_post_preview');

// Filter: Applying the filter to the excerpts
    add_filter( 'excerpt_length', 'q_live_preview_excerpt_length', 999 );
    add_filter( 'excerpt_more', 'q_live_preview_excerpt_more' );

?>