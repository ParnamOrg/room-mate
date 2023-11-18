Rails.application.routes.draw do
  devise_for :users, controllers: { passwords: 'passwords' }

  root 'dashboard#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # user authentication
      post "users/sign_up", to: "registrations#create"
      post "users/sign_in", to: "sessions#create"
      delete "users/sign_out", to: "sessions#destroy"

      get '/authentication_status', to: 'authentication#status'

      # password reset
      post "users/password/new", to: "passwords#new"
      put "users/reset_password", to: "passwords#update"
    end
  end

  get '/forgot_password', to: 'passwords#new'
end
