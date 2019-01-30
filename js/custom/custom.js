"use strict";
var ajaxRevslider;
jQuery(document).ready(function() {
  // CUSTOM AJAX CONTENT LOADING FUNCTION
  ajaxRevslider = function(obj) {
    // obj.type : Post Type
    // obj.id : ID of Content to Load
    // obj.aspectratio : The Aspect Ratio of the Container / Media
    // obj.selector : The Container Selector where the Content of Ajax will be injected. It is done via the Essential Grid on Return of Content
    var content = "";
    data = {};
    data.action = 'revslider_ajax_call_front';
    data.client_action = 'get_slider_html';
    data.token = 'b2d84ac4f5';
    data.type = obj.type;
    data.id = obj.id;
    data.aspectratio = obj.aspectratio;
    // SYNC AJAX REQUEST
    jQuery.ajax({
      type: "post",
      url: "http://melody.ancorathemes.com/wp-admin/admin-ajax.php",
      dataType: 'json',
      data: data,
      async: false,
      success: function(ret, textStatus, XMLHttpRequest) {
        if (ret.success == true)
          content = ret.data;
      },
      error: function(e) {
        console.log(e);
      }
    });
    // FIRST RETURN THE CONTENT WHEN IT IS LOADED !!
    return content;
  };
  // CUSTOM AJAX FUNCTION TO REMOVE THE SLIDER
  var ajaxRemoveRevslider = function(obj) {
    return jQuery(obj.selector + " .rev_slider").revkill();
  };
  // EXTEND THE AJAX CONTENT LOADING TYPES WITH TYPE AND FUNCTION
  var extendessential = setInterval(function() {
    if (jQuery.fn.tpessential != undefined) {
      clearInterval(extendessential);
      if (typeof(jQuery.fn.tpessential.defaults) !== 'undefined') {
        jQuery.fn.tpessential.defaults.ajaxTypes.push({
          type: "revslider",
          func: ajaxRevslider,
          killfunc: ajaxRemoveRevslider,
          openAnimationSpeed: 0.3
        });
        // type:  Name of the Post to load via Ajax into the Essential Grid Ajax Container
        // func: the Function Name which is Called once the Item with the Post Type has been clicked
        // killfunc: function to kill in case the Ajax Window going to be removed (before Remove function !
        // openAnimationSpeed: how quick the Ajax Content window should be animated (default is 0.3)
      }
    }
  }, 30);
});

if (typeof MELODYSCHOOL_STORAGE == 'undefined') var MELODYSCHOOL_STORAGE = {};
if (MELODYSCHOOL_STORAGE['theme_font'] == '') MELODYSCHOOL_STORAGE['theme_font'] = 'Open Sans';
MELODYSCHOOL_STORAGE['theme_color'] = '#333745';
MELODYSCHOOL_STORAGE['theme_bg_color'] = '#ffffff';

if (typeof MELODYSCHOOL_STORAGE == 'undefined') var MELODYSCHOOL_STORAGE = {};
MELODYSCHOOL_STORAGE["strings"] = {
  ajax_error: "Invalid server answer",
  bookmark_add: "Add the bookmark",
  bookmark_added: "Current page has been successfully added to the bookmarks. You can see it in the right panel on the tab &#039;Bookmarks&#039;",
  bookmark_del: "Delete this bookmark",
  bookmark_title: "Enter bookmark title",
  bookmark_exists: "Current page already exists in the bookmarks list",
  search_error: "Error occurs in AJAX search! Please, type your query and press search icon for the traditional search way.",
  email_confirm: "On the e-mail address &quot;%s&quot; we sent a confirmation email. Please, open it and click on the link.",
  reviews_vote: "Thanks for your vote! New average rating is:",
  reviews_error: "Error saving your vote! Please, try again later.",
  error_like: "Error saving your like! Please, try again later.",
  error_global: "Global error text",
  name_empty: "The name can&#039;t be empty",
  name_long: "Too long name",
  email_empty: "Too short (or empty) email address",
  email_long: "Too long email address",
  email_not_valid: "Invalid email address",
  subject_empty: "The subject can&#039;t be empty",
  subject_long: "Too long subject",
  text_empty: "The message text can&#039;t be empty",
  text_long: "Too long message text",
  send_complete: "Send message complete!",
  send_error: "Transmit failed!",
  login_empty: "The Login field can&#039;t be empty",
  login_long: "Too long login field",
  login_success: "Login success! The page will be reloaded in 3 sec.",
  login_failed: "Login failed!",
  password_empty: "The password can&#039;t be empty and shorter then 4 characters",
  password_long: "Too long password",
  password_not_equal: "The passwords in both fields are not equal",
  registration_success: "Registration success! Please log in!",
  registration_failed: "Registration failed!",
  geocode_error: "Geocode was not successful for the following reason:",
  googlemap_not_avail: "Google map API not available!",
  editor_save_success: "Post content saved!",
  editor_save_error: "Error saving post data!",
  editor_delete_post: "You really want to delete the current post?",
  editor_delete_post_header: "Delete post",
  editor_delete_success: "Post deleted!",
  editor_delete_error: "Error deleting post!",
  editor_caption_cancel: "Cancel",
  editor_caption_close: "Close"
};

if (typeof MELODYSCHOOL_STORAGE == 'undefined') var MELODYSCHOOL_STORAGE = {};
MELODYSCHOOL_STORAGE['ajax_url'] = 'wp-admin/admin-ajax.html';
MELODYSCHOOL_STORAGE['ajax_nonce'] = '6e71242af2';
MELODYSCHOOL_STORAGE['site_url'] = 'index.html';
MELODYSCHOOL_STORAGE['vc_edit_mode'] = false;
MELODYSCHOOL_STORAGE['theme_font'] = 'Open Sans';
MELODYSCHOOL_STORAGE['theme_color'] = '#333745';
MELODYSCHOOL_STORAGE['theme_bg_color'] = '#ffffff';
MELODYSCHOOL_STORAGE['slider_height'] = 100;
MELODYSCHOOL_STORAGE['system_message'] = {
  message: '',
  status: '',
  header: ''
};
MELODYSCHOOL_STORAGE['user_logged_in'] = false;
MELODYSCHOOL_STORAGE['toc_menu'] = 'float';
MELODYSCHOOL_STORAGE['toc_menu_home'] = true;
MELODYSCHOOL_STORAGE['toc_menu_top'] = true;
MELODYSCHOOL_STORAGE['menu_fixed'] = true;
MELODYSCHOOL_STORAGE['menu_mobile'] = 1140;
MELODYSCHOOL_STORAGE['menu_slider'] = true;
MELODYSCHOOL_STORAGE['menu_cache'] = false;
MELODYSCHOOL_STORAGE['demo_time'] = 0;
MELODYSCHOOL_STORAGE['media_elements_enabled'] = true;
MELODYSCHOOL_STORAGE['ajax_search_enabled'] = true;
MELODYSCHOOL_STORAGE['ajax_search_min_length'] = 3;
MELODYSCHOOL_STORAGE['ajax_search_delay'] = 200;
MELODYSCHOOL_STORAGE['css_animation'] = true;
MELODYSCHOOL_STORAGE['menu_animation_in'] = 'fadeInUp';
MELODYSCHOOL_STORAGE['menu_animation_out'] = 'fadeOutDown';
MELODYSCHOOL_STORAGE['popup_engine'] = 'pretty';
MELODYSCHOOL_STORAGE['email_mask'] = '^([a-zA-Z0-9_\-]+\.)*[a-zA-Z0-9_\-]+@[a-z0-9_\-]+(\.[a-z0-9_\-]+)*\.[a-z]{2,6}$';
MELODYSCHOOL_STORAGE['contacts_maxlength'] = 1000;
MELODYSCHOOL_STORAGE['comments_maxlength'] = 1000;
MELODYSCHOOL_STORAGE['remember_visitors_settings'] = false;
MELODYSCHOOL_STORAGE['admin_mode'] = false;
MELODYSCHOOL_STORAGE['isotope_resize_delta'] = 0.3;
MELODYSCHOOL_STORAGE['error_message_box'] = null;
MELODYSCHOOL_STORAGE['viewmore_busy'] = false;
MELODYSCHOOL_STORAGE['video_resize_inited'] = false;
MELODYSCHOOL_STORAGE['top_panel_height'] = 0;

function revslider_showDoubleJqueryError(sliderID) {
  var errorMessage = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
  errorMessage += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
  errorMessage += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
  errorMessage += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
  errorMessage = "<span style='font-size:16px;color:#BC0C06;'>" + errorMessage + "</span>";
  jQuery(sliderID).show().html(errorMessage);
}

/* <![CDATA[ */
var mejsL10n = {
  "language": "en-US",
  "strings": {
    "Close": "Close",
    "Fullscreen": "Fullscreen",
    "Turn off Fullscreen": "Turn off Fullscreen",
    "Go Fullscreen": "Go Fullscreen",
    "Download File": "Download File",
    "Download Video": "Download Video",
    "Play": "Play",
    "Pause": "Pause",
    "Captions\/Subtitles": "Captions\/Subtitles",
    "None": "None",
    "Time Slider": "Time Slider",
    "Skip back %1 seconds": "Skip back %1 seconds",
    "Video Player": "Video Player",
    "Audio Player": "Audio Player",
    "Volume Slider": "Volume Slider",
    "Mute Toggle": "Mute Toggle",
    "Unmute": "Unmute",
    "Mute": "Mute",
    "Use Up\/Down Arrow keys to increase or decrease volume.": "Use Up\/Down Arrow keys to increase or decrease volume.",
    "Use Left\/Right Arrow keys to advance one second, Up\/Down arrows to advance ten seconds.": "Use Left\/Right Arrow keys to advance one second, Up\/Down arrows to advance ten seconds."
  }
};
var _wpmejsSettings = {
  "pluginPath": "\/wp-includes\/js\/mediaelement\/"
};
/* ]]> */
/* <![CDATA[ */
var woocommerce_price_slider_params = {
  "currency_symbol": "$",
  "currency_pos": "left",
  "min_price": "",
  "max_price": ""
};
/* ]]> */
/* <![CDATA[ */
var wc_single_product_params = {
  "i18n_required_rating_text": "Please select a rating",
  "review_rating_required": "yes"
};
/* ]]> */
