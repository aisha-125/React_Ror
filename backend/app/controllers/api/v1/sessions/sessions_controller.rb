class Api::V1::Sessions::SessionsController < Devise::SessionsController
  include RackSessionFix
  before_action :auth_basic_auth, only: [:create]
  respond_to :json

  def auth_basic_auth
    credentials = ActionController::HttpAuthentication::Basic.decode_credentials(request)
    email, password = credentials.split(":")
    create_session(email, password)
  end

  private

  def create_session(email, password)
    self.resource = resource_class.find_for_database_authentication(email: email)
    if resource && resource.valid_password?(password)
      sign_in(resource)
      render json: {
        status: { code: 200, message: "Logged in successfully." },
        data: UserSerializer.new(resource).serializable_hash,
        token: request.env["warden-jwt_auth.token"],
      }, status: :ok
    else
      render json: {
        status: { code: 401, message: "Invalid email or password." },
      }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    if current_user
      sign_out(current_user)
      render json: {
        status: 200,
        message: "logged out successfully",
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session.",
      }, status: :unauthorized
    end
  end
end
