require File.dirname(__FILE__) + '/../test_helper'

class TinymceFilterExtensionTest < Test::Unit::TestCase
  
  # Replace this with your real tests.
  def test_this_extension
    flunk
  end
  
  def test_initialization
    assert_equal RADIANT_ROOT + '/vendor/extensions/tinymce_filter', TinymceFilterExtension.root
    assert_equal 'Tinymce Filter', TinymceFilterExtension.extension_name
  end
  
end
