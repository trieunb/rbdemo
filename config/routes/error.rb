Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    scope module: :error do
        get '/404'         => 'errors#error_404'
        get '/403'         => 'errors#error_403'
        get '/500'         => 'errors#error_500'
        get '/error'       => 'errors#index'
    end
end