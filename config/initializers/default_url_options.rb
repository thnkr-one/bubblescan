# # config/initializers/default_url_options.rb
#
# # Set default options for URL generation
# if Rails.env.development?
#   Rails.application.routes.default_url_options = {
#     host: 'localhost',
#     port: 3000
#   }
# else
#   Rails.application.routes.default_url_options = {
#     host: ENV.fetch('HOST') { 'bubblescan.fly.dev' },
#     protocol: 'https'
#   }
# end
#
# # Also set these for ActionMailer and ActiveStorage
# Rails.application.config.action_mailer.default_url_options = Rails.application.routes.default_url_options
# Rails.application.config.active_storage.default_url_options = Rails.application.routes.default_url_options