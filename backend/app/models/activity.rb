class Activity < ApplicationRecord
  has_one_attached :image
  belongs_to :user, class_name: "Employee"
  has_and_belongs_to_many :employees, join_table: :employees_activitiesAssisted, class_name: "User"
  has_and_belongs_to_many :clients, join_table: :clients_activitiesRegistered, class_name: "User"

  validates :name, presence: true
  validates :description, presence: true
  validates :date, presence: true
  validates :places, presence: true
  validates :image, presence: false
end
