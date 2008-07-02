var TinymceFilterPartObserver = Class.create({
  
  initialize: function(element) {
    this.element = element;
    this.part_element = element.down('.part');
    this.part_id = this.part_element.id.match(/part\-(.+)/)[1];
    this.filter_select_menu = this.element.down('select');
    this.textarea = this.element.down('textarea');
    this.setup();
  },
  
  setup: function() {
    this.filter_select_menu.observe('change', this.handleFilterChanged.bind(this));
    this.updateTextArea();
  },
  
  handleFilterChanged: function(event) {
    this.updateTextArea();
  },
  
  isTinymceFilterSelected: function() {
    return this.filter_select_menu.options[this.filter_select_menu.selectedIndex].value == 'TinyMce';
  },
  
  updateTextArea: function() {
    if(this.isTinymceFilterSelected() && tinyMCE.get(this.textarea.id) == null) {
      this.setEditor();
    } else if (!this.isTinymceFilterSelected() && tinyMCE.get(this.textarea.id) != null) {
      this.unsetEditor();
    }
  },
  
  setEditor: function() {
    tinyMCE.execCommand('mceAddControl', false, this.textarea.id);
  },
  
  unsetEditor: function() {
    tinyMCE.execCommand('mceRemoveControl', false, this.textarea.id);
  }
  
});

TinymceFilterPartObserver.pages = new Array();

TinymceFilterPartObserver.init = function() {
  tab_control = $('tab-control');
  if (tab_control) {
    tab_control.select('.page').each(function(element) {
      if(!TinymceFilterPartObserver.pages.include(element.id)) {
        TinymceFilterPartObserver.pages.push(element.id);
        new TinymceFilterPartObserver(element);
      }
    });
  }
}

var TinymceSnippetPartObserver = Class.create(TinymceFilterPartObserver, {
  initialize: function(snippet_textarea, select_filter) {
    this.filter_select_menu = select_filter;
    this.textarea = snippet_textarea;
    this.setup();
  },
});

TinymceSnippetPartObserver.init = function() {
  snippet_content = $('snippet_content');
  snippet_filter = $('snippet_filter');
  if (snippet_content && snippet_filter) {
    new TinymceSnippetPartObserver(snippet_content, snippet_filter);
  }
}

Ajax.Responders.register({ onComplete: TinymceFilterPartObserver.init });

document.observe('dom:loaded', TinymceFilterPartObserver.init);
document.observe('dom:loaded', TinymceSnippetPartObserver.init);
