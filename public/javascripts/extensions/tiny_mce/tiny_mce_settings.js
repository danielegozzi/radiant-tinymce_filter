tinyMCE.init({   
  editor_selector : "mceEditor",
  editor_deselector : "noMceEditor",
	mode : "textareas",
	theme : "advanced",
  extended_valid_elements: "r:*",
  plugins: "codeprotect",
  content_css: "/javascripts/extensions/tiny_mce/tiny_mce_content.css",
	theme_advanced_toolbar_location : "top",
	theme_advanced_toolbar_align : "left",
	theme_advanced_statusbar_location : "bottom",
	apply_source_formatting : true
});
