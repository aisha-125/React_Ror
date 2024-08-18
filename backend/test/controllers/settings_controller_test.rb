require "test_helper"

class SettingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @setting = settings(:one)
  end

  test "should get index" do
    get settings_url, as: :json
    assert_response :success
  end

  test "should create setting" do
    assert_difference("Setting.count") do
      post settings_url, params: { setting: { font_size: @setting.font_size, light_mode: @setting.light_mode } }, as: :json
    end

    assert_response :created
  end

  test "should show setting" do
    get setting_url(@setting), as: :json
    assert_response :success
  end

  test "should update setting" do
    patch setting_url(@setting), params: { setting: { font_size: @setting.font_size, light_mode: @setting.light_mode } }, as: :json
    assert_response :success
  end

  test "should destroy setting" do
    assert_difference("Setting.count", -1) do
      delete setting_url(@setting), as: :json
    end

    assert_response :no_content
  end
end
