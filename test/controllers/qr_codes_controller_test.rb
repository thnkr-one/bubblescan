require "test_helper"

class QrCodesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get qr_codes_index_url
    assert_response :success
  end

  test "should get show" do
    get qr_codes_show_url
    assert_response :success
  end

  test "should get new" do
    get qr_codes_new_url
    assert_response :success
  end

  test "should get create" do
    get qr_codes_create_url
    assert_response :success
  end

  test "should get edit" do
    get qr_codes_edit_url
    assert_response :success
  end

  test "should get update" do
    get qr_codes_update_url
    assert_response :success
  end

  test "should get destroy" do
    get qr_codes_destroy_url
    assert_response :success
  end
end
