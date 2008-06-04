function part_added() {
  var partNameField = $('part-name-field');
  var partIndexField = $('part-index-field');
  var index = parseInt(partIndexField.value || 0) + 1;
  var tab = 'tab-' + index;
  var caption = partNameField.value;
  var page = 'page-' + index;
  tabControl.addTab(tab, caption, page);
  Element.hide('add-part-popup');
  Element.hide('busy');
  partNameField.value = '';
  partIndexField.value = (index + 1).toString();
  $('add-part-button').disabled = false;
  Field.focus(partNameField);
  tabControl.select(tab);
  new TinymceFilterPartObserver($('page-' + index));
}

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

document.observe('dom:loaded', function() {
  $('tab-control').select('.page').each(function(element) {
    new TinymceFilterPartObserver(element);
  });
});