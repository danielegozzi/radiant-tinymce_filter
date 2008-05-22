require File.dirname(__FILE__) + "/../../../../test/test_helper" unless defined? TEST_ROOT

class Test::Unit::TestCase
  test_helper :extension_fixtures, :extension_tags
  self.extension_fixture_path = File.dirname(__FILE__) + "/fixtures"
end