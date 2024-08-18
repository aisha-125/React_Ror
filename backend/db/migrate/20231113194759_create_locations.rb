class CreateLocations < ActiveRecord::Migration[7.1]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :direction, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.float :altitude

      t.timestamps
    end
  end
end
