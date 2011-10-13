class CreateMockups < ActiveRecord::Migration
  def self.up
    create_table :mockups do |t|
      t.string :name
      t.text :description
      t.integer :project_id
      t.timestamps
    end
  end

  def self.down
    drop_table :mockups
  end
end
