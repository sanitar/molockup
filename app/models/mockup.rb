class Mockup < ActiveRecord::Base
  attr_accessible :name, :description, :project_id
  belongs_to :project
end
