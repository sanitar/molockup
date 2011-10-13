class Project < ActiveRecord::Base
  attr_accessible :name, :description, :owner_id, :owner_type
  belongs_to :owner, :class_name => 'User', :foreign_key => :owner_id
  has_many :mockups
end
