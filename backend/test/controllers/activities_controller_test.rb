require "test_helper"

class ActivitiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @activity = activities(:one)
    @activity2 = activities(:two)
  end

  # test "should get index" do
  #   get activities_url, as: :json
  #   assert_response :success
  # end

  test "should create activity" do
    assert_difference("Activity.count") do
      post api_v1_activities_activities_url, params: { activity: { description: @activity.description, name: @activity.name, places: @activity.places, date: @activity.date } }, as: :json
    end

    assert_response :created
  end

  # test "should create activity with image" do
  #   assert_difference("Activity.count") do
  #     debugger
  #     post activities_url, params: {
  #                            activity: {
  #                              name: @activity.name,
  #                              description: @activity.description,
  #                              image: image_file,
  #                              date: @activity.date,
  #                              places: @activity.places,
  #                            },
  #                          }
  #   end

  #   # assert_redirected_to activity_url(Activity.last)
  #   # assert_equal "Image successfully attached", flash[:notice]
  #   assert_response :created

  #   # Puedes agregar más aserciones según sea necesario
  # end

  # test "should show activity" do
  #   get activity_url(@activity), as: :json
  #   assert_response :success
  # end

  # test "should update activity" do
  #   patch activity_url(@activity), params: { activity: { description: @activity.description, name: @activity.name, places: @activity.places } }, as: :json
  #   assert_response :success
  # end

  # test "should destroy activity" do
  #   assert_difference("Activity.count", -1) do
  #     delete activity_url(@activity), as: :json
  #   end

  #   assert_response :no_content
  # end
end
