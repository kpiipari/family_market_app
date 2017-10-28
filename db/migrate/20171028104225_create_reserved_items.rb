class CreateReservedItems < ActiveRecord::Migration[5.1]
  def change
    create_table :reserved_items do |t|
      t.integer :user_id
      t.integer :item_id
      
      t.timestamps
    end
  end
end
