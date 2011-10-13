require 'test_helper'

class MockupsControllerTest < ActionController::TestCase
  def test_index
    get :index
    assert_template 'index'
  end

  def test_show
    get :show, :id => Mockup.first
    assert_template 'show'
  end

  def test_new
    get :new
    assert_template 'new'
  end

  def test_create_invalid
    Mockup.any_instance.stubs(:valid?).returns(false)
    post :create
    assert_template 'new'
  end

  def test_create_valid
    Mockup.any_instance.stubs(:valid?).returns(true)
    post :create
    assert_redirected_to mockup_url(assigns(:mockup))
  end

  def test_edit
    get :edit, :id => Mockup.first
    assert_template 'edit'
  end

  def test_update_invalid
    Mockup.any_instance.stubs(:valid?).returns(false)
    put :update, :id => Mockup.first
    assert_template 'edit'
  end

  def test_update_valid
    Mockup.any_instance.stubs(:valid?).returns(true)
    put :update, :id => Mockup.first
    assert_redirected_to mockup_url(assigns(:mockup))
  end

  def test_destroy
    mockup = Mockup.first
    delete :destroy, :id => mockup
    assert_redirected_to mockups_url
    assert !Mockup.exists?(mockup.id)
  end
end
