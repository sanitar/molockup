require 'test_helper'

class MockupTest < ActiveSupport::TestCase
  def test_should_be_valid
    assert Mockup.new.valid?
  end
end
