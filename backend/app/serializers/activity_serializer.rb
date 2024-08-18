class ActivitySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :date, :image, :places

  attribute :coordinator do |activity|
    EmployeeSerializer.new(activity.object.user).as_json
  end

  attribute :assistants do |activity|
    ActiveModel::SerializableResource.new(activity.object.employees, each_serializer: EmployeeSerializer).as_json
  end

  attribute :clients do |activity|
    ActiveModel::SerializableResource.new(activity.object.clients, each_serializer: ClientSerializer).as_json
  end

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image),
      }
    end
  end
end
