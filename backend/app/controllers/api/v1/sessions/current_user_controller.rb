class Api::V1::Sessions::CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: UserSerializer.new(current_user).serializable_hash.as_json, status: :ok
  end
end
