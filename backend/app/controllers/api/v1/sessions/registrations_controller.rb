class Api::V1::Sessions::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  before_action :auth_basic_auth, only: [:create, :destroy]
  respond_to :json

  private

  def user_params
    params.require(:user).permit(:nickname, :discriminator)
  end

  def auth_basic_auth
    if request.method == "POST"
      credentials = ActionController::HttpAuthentication::Basic.decode_credentials(request)
      email, password = credentials.split(":")
      create_user(email, password)
    elsif request.method == "DELETE"
      destroy_user
    end
  end

  def create_user(email, password)
    puts user_params
    @user = User.new(email: email, password: password, **user_params)

    if @user.save
      sign_in(@user)
      render json: {
        status: { code: 200, message: "Signed up successfully." },
        data: UserSerializer.new(@user).serializable_hash,
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" },
      }, status: :unprocessable_entity
    end
  end

  def destroy_user
    if current_user
      current_user.destroy
      render json: {
        status: { code: 200, message: "Account deleted successfully." },
      }, status: :ok
    else
      render json: {
        status: { code: 404, message: "User not found." },
      }, status: :not_found
    end
  end
end
