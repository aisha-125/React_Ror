class Api::V1::Users::UsersController < ApplicationController
  before_action :auth_basic_auth, only: [:update_password]
  before_action :set_user, only: [:update_image]

  def update_image
    if @user.update(user_image)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def auth_basic_auth
    set_user
    credentials = ActionController::HttpAuthentication::Basic.decode_credentials(request)
    oldPassword, newPassword = credentials.split(":")
    update_password(oldPassword, newPassword)
  end

  def index
    @users = User.all
    render json: @users
  end

  def update_password(oldPassword, newPassword)
    if @user.valid_password?(oldPassword)
      if @user.update(password: newPassword)
        render json: {
                 status: { code: 200, message: "Contraseña cambiada correctamente" },
               }, status: :ok
      else
        render json: { error: "Algo a fallado" }, status: :unprocessable_entity
      end
    else
      render json: {
               status: 401,
               message: "La contraseña no es correcta",
             }, status: :unauthorized
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:nickname, :discriminator, :admin)
  end

  def user_image
    params.require(:user).permit(:image)
  end
end

# def set_user
#   auth_data = Base64.decode64(params[:key]).split(":", 2)
#   @user = User.find_by(email: auth_data[0])
# end

# def update_img(newImage)
#   if @user.update(img: newImage)
#     render json: {
#              status: { code: 200, message: "Imagén actualizada correctamente" },
#              data: @user.as_json,
#            }, status: :ok
#   else
#     render json: { error: "Actualizacion no permitida" }, status: :unprocessable_entity
#   end
# end

# def show
#   if @user
#     auth_data = Base64.decode64(params[:key]).split(":", 2)
#     auth_password = auth_data[1]
#     if @user.password == auth_password
#       render json: @user, status: :ok
#     else
#       render json: { error: "Autenticación fallida" }, status: :unauthorized
#     end
#   else
#     render json: { error: "Usuario no encontrado" }, status: :not_found
#   end
# end

# def create
#   emailExists = User.find_by(email: user_params[:email])
#   if !emailExists
#     nicknameExists = User.find_by(nickname: user_params[:nickname])
#     if !nicknameExists
#       @user = User.new(user_params)
#       if @user.save
#         render json: @user, status: :created
#       else
#         render json: { error: @user.errors.full.messages }, status: :unprocessable_entity
#       end
#     else
#       render json: { error: "Nickname ya en uso" }, status: :unprocessable_entity
#     end
#   else
#     render json: { error: "Usuario ya existente" }, status: :unprocessable_entity
#   end
# end

# def destroy
#   if @user
#     auth_data = params[:key].split(":", 2)
#     auth_password = auth_data[1]
#     if @user.password == auth_password
#       if @user.destroy
#         render json: @user, status: :ok
#       else
#         render json: { error: @user.errors.full.messages }, status: :unprocessable_entity
#       end
#     else
#       render json: { error: "Autenticación fallida" }, status: :unauthorized
#     end
#   else
#     render json: { error: "Usuario no encontrado" }, status: :not_found
#   end
# end
