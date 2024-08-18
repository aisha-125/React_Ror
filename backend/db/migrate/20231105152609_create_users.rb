class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :nickname, null: false
      t.string :image, null: false, default: "default_user.png"
      t.string :discriminator, null: false, default: "Client"
      t.string :name
      t.string :surname
      t.string :dni

      t.timestamps null: false
    end
    add_index :users, :nickname, unique: true
  end
end
