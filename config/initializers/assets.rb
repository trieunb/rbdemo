Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.paths << Rails.root.join('public')
Rails.application.config.assets.precompile  += %w(*.js *.css **/*.css **/*.js **/**/*.css **/**/*.js *.png *.jpg *.jpeg *.gif *.ico **/*.png **/*.jpg **/*.jpeg **/*.gif **/*.ico)
# Rails.application.config.assets.compress = true
# Rails.application.config.assets.js_compressor = :uglifier
# Rails.application.config.assets.css_compressor = :yui

=begin
    rails assets:precompile
    Test compress
    1. Run rails console: rails c -e production
    2. Enter code
        a. Test js
            JS_PATH = "app/assets/javascripts/**/*.js"; 
            Dir[JS_PATH].each do |file_name|
                puts "\n#{file_name}"
                puts Uglifier.compile(File.read(file_name))
            end
        a. Test scss
            JS_PATH = "app/assets/stylesheets/**/*.scss"; 
            Dir[JS_PATH].each do |file_name|
                puts "\n#{file_name}"
                puts Sass.compile(File.read(file_name))
            end
=end