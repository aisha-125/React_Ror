class CreateSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :settings do |t|
      t.string :font_size
      t.boolean :light_mode
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
