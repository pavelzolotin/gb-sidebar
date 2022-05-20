<?php
/**
 * Plugin Name:       GB Sidebar
 * Description:       Plugin which display sidebar new features.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Author
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-sidebar
 *
 */

if( !defined( 'ABSPATH' ) ) {
    exit;
}

include_once( 'src/meta.php' );

function gb_sidebar_enqueue_assets() {
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );
    wp_enqueue_script(
        'gb_sidebar-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file[ 'dependencies' ],
        $asset_file[ 'version' ]
    );
    wp_enqueue_style( 'gb_sidebar-style', plugins_url('build/index.css', __FILE__) );
}

add_action( 'enqueue_block_editor_assets', 'gb_sidebar_enqueue_assets' );