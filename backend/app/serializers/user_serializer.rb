class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :nickname, :email, :discriminator, :image, :admin

  attribute :setting do |user|
    SettingSerializer.new(user.object.setting).as_json
  end

  attribute :created_date do |user|
    user.object.created_at && user.object.created_at.strftime("%m/%d/%Y")
  end

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image),
      }
    end
  end
end
