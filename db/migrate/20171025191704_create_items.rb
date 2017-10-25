class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :title
      t.text :description
      t.string :status, default: 'free'
      t.integer :category_id

      t.timestamps
    end
  end
end
