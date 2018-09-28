Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    scope module: :home do
        root 'home#index'
        get 'course-detail/:beauty_id'                         => 'home#courseDetail'
        get 'verify-regist-course/:beauty_id/:id/:token'       => 'home#verifyRegistCourse'
        get 'apply/:beauty_id'                                 => 'home#showApply'
        get 'apply'                                            => 'home#showApply'
        get 'regist-event/:beauty_id'                          => 'home#showRegistEvent'
        get 'event-detail/:beauty_id'                          => 'home#showEventDetail'
        get 'regist-event'                                     => 'home#index'
        get 'event-detail'                                     => 'home#index'
        get 'regist-advisory'                                  => 'home#showRegistAdvisory'
        get 'greeting'                                         => 'home#greeting'
        get 'vi'                                               => 'home#index'
        get 'en'                                               => 'home#indexEn'
        get 'ja'                                               => 'home#indexJa'
        get ':lang/course-detail/:beauty_id'                   => 'home#courseDetail'
        get ':lang/verify-regist-course/:beauty_id/:id/:token' => 'home#verifyRegistCourse'
        get ':lang/apply/:beauty_id'                           => 'home#showApply'
        get ':lang/apply'                                      => 'home#showApply'
        get ':lang/regist-event/:beauty_id'                    => 'home#showRegistEvent'
        get ':lang/event-detail/:beauty_id'                    => 'home#showEventDetail'
        get ':lang/regist-event'                               => 'home#index'
        get ':lang/event-detail'                               => 'home#index'
        get ':lang/regist-advisory'                            => 'home#showRegistAdvisory'
        get ':lang/greeting'                                   => 'home#greeting'
        get '/maintenance'                                     => 'home#maintenance'
    end
    namespace :home do
        root 'home#index'
        resources :home, only: [:index]
        post 'regist-course'            => 'home#registCourse'
        post 'refer-class'              => 'home#referClass'
        post 'regist-advisory'          => 'home#registAdvisory'
        post 'subscribe-email'          => 'home#subscribeEmail'
        post 'refer-event'              => 'home#referEvent'
        post 'regist-event'             => 'home#registEvent'
        post 'refer-event-detail'       => 'home#referEventDetail'
        post 'show-popup-event-nearest' => 'home#referPopupEventNearest'
    end
end