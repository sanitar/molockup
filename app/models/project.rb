class Project < ActiveRecord::Base
  attr_accessible :name, :description, :owner_id, :owner_type
end
