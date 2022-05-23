<?php

function gb_sidebar_sanitize_check_boolean( $checked ) {
    return ( isset( $checked ) && $checked === true ) ? true : false;
};

function gb_sidebar_sanitize_check_number( $number, $setting ) {
	$number = absint( $number );
	return ( $number ? $number : $setting -> default );
}

function gb_sidebar_register_meta() {
    register_meta( 'post', '_gb_sidebar_footer_widgets', array(
        'object_subtype' => '',
        'single' => true,
        'type' => 'boolean',
        'default' => true,
        'show_in_rest' => true,
        'sanitize_callback' => 'gb_sidebar_sanitize_check_boolean',
        'auth_callback' => function() {
            return current_user_can( 'edit_posts' );
        }
    ));

    register_meta( 'post', '_gb_sidebar_media_id_meta', array(
        'object_subtype' => 'gutenberg_players',
        'single' => true,
        'type' => 'number',
        'default' => 0,
        'show_in_rest' => true,
        'sanitize_callback' => 'gb_sidebar_sanitize_check_number',
        'auth_callback' => function() {
            return current_user_can( 'edit_posts' );
        }
    ));

    register_meta( 'post', '_gb_sidebar_media_url_meta', array(
        'object_subtype' => 'gutenberg_players',
        'single' => true,
        'type' => 'string',
        'default' => '',
        'show_in_rest' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can( 'edit_posts' );
        }
    ));
}
add_action( 'init', 'gb_sidebar_register_meta' );