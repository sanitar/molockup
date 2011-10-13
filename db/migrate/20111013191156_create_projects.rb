class CreateProjects < ActiveRecord::Migration
  def self.up
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.integer :owner_id
      t.string :owner_type
      t.timestamps
    end
  end

  def self.down
    drop_table :projects
  end
end
