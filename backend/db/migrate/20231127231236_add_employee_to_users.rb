class AddEmployeeToUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users do |t|
      t.boolean :admin
      t.string :profession
    end
  end
end
