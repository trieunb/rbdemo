require_relative 'boot'
require 'rails/all'
require 'carrierwave'
require 'carrierwave/orm/activerecord'
Bundler.require(*Rails.groups)
module BrseSchool
  class Application < Rails::Application
    config.middleware.use Rack::Deflater
    config.load_defaults 5.1
    # config for router
    config.paths['config/routes.rb'] = Dir[Rails.root.join('config/routes/*.rb')]
    config.exceptions_app = self.routes
    # config timezone
    config.time_zone = 'Hanoi'
    #config.active_record.default_timezone = :local
    # config mutilanguage
    I18n.available_locales = [:en, :ja, :vi]
    I18n.default_locale = :vi
    # config for send email
    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.perform_deliveries = true 
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
        address:              'smtp.gmail.com',
        port:                 587,
        user_name:            'nguyenxuandao123456@gmail.com',
        password:             'nguyenitdao',
        authentication:       'plain',
        enable_starttls_auto: true  
    }
    ActionMailer::Base.default :content_type => "text/html"
  end
end
