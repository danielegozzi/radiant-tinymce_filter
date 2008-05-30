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
  $('tab-control').select('.page').each(function(element) {
    if(!TinymceFilterPartObserver.pages.include(element.id)) {
      TinymceFilterPartObserver.pages.push(element.id);
      new TinymceFilterPartObserver(element);
    }
  });
}

Ajax.Responders.register({ onComplete: TinymceFilterPartObserver.init });

document.observe('dom:loaded', TinymceFilterPartObserver.init);