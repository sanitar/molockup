class CreateBlocks < ActiveRecord::Migration
  def change
    create_table :blocks do |t|
      t.string :name
      t.text :description
      t.string :title
      t.text :action
      t.text :extra

      t.timestamps
    end
  end
end
