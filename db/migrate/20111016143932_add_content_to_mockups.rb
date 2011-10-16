class AddContentToMockups < ActiveRecord::Migration
  def change
    add_column :mockups, :content, :text
  end
end
