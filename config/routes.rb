Rails.application.routes.draw do
  root 'dashboard#index'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # user authentication
      post "users/sign_up", to: "registrations#create"
      post "users/sign_in", to: "sessions#create"
      delete "users/sign_out", to: "sessions#destroy"

      # password reset
      post "users/password/new", to: "passwords#new"
    end
  end
end
