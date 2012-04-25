source 'http://rubygems.org'

gem 'rails', '3.2.2'

# Main gems
gem 'devise', '1.5.3'
gem 'cancan', '1.6.7'
gem 'will_paginate', '3.0.2'
gem 'paperclip', '2.5.0'
gem 'nokogiri', '1.5.0'
gem 'jquery-rails'

# search gems
gem 'sunspot_rails'
gem 'sunspot_solr'
gem 'resque', :require => "resque/server"
gem 'god'

# databases
gem 'mysql2', '>=0.3'
gem 'sqlite3'
gem 'redis'

# misc
gem 'rubyzip'
gem 'russian', '~> 0.6.0'
gem 'execjs'
gem 'therubyracer'
gem 'progress_bar'

gem 'haml'
gem 'haml-rails', :group => :development

#assets
group :assets do
  gem 'sass-rails', "  ~> 3.2.4"
  gem 'coffee-rails', "~> 3.2.2"
  gem 'uglifier', '>= 1.2.3'
end

#host and deploy
gem 'unicorn'
gem 'capistrano', '2.9.0'


group :test, :development do
  gem "rspec-rails", "~> 2.6"
  gem "annotate", "~> 2.4.1.beta1"
end

group :test do
  # Pretty printed test output
  gem 'turn', '0.8.2', :require => false
end
