/* Import plugin specific language pack */
tinyMCE.importPluginLanguagePack('codeprotect', 'en'); // <- Add a comma separated list of all supported languages

/****
 * 
 * I'm not even gonna copyright this, that's just silly.
 *
 * Feel free to improve on this code and re-upload it.
 * 
 * Tijmen Schep, Holland, 9-10-2005
 * 
 * 
 ****/



/**
 * Gets executed when contents is inserted / retrived.
 */
function TinyMCE_codeprotect_cleanup(type, content) {
	switch (type) {
		case "get_from_editor":
			var regex = new RegExp('<hr rel="([^"]*)?" class="mceItemRadiantCode" title="(.*?)" />', 'g');
			var m = content.match(regex);
			if (!(m == null)) {
				for (i=0; i<m.length; i++) {
					var match = unescape(m[i].replace(regex, '$1'));
					var content = content.replace(m[i], match);
				}
			}
			return content;
      break;

    case "insert_to_editor":
			var m = content.match(/(<r:([^\/><]*)?\/?>)|(<\/r:([^>]*)?>)/g);
			if (!(m == null)) {
				for (i=0; i < m.length; i++) {
          var title = m[i].replace(/"/g, "'");
					var match = escape(m[i]);
					var regex = new RegExp('(' + m[i] + ')', 'i');
					var content = content.replace(regex, '<hr rel="' + match + '" class="mceItemRadiantCode" title="' + title + '" />');
				}
			}
			return content;

    break;

    case "get_from_editor_dom":
			// Do custom cleanup code here. THIS PLUGIN DOESN'T USE THIS
			break;
		case "insert_to_editor_dom":
			// Do custom cleanup code here. BUT I LEFT IT IN ANYWAY..
			break;
	}
	return content;
}

