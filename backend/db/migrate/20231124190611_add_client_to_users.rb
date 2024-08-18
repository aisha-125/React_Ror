class AddClientToUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users do |t|
      t.date :birthdate
      t.integer :cardnumber
    end
  end
end
