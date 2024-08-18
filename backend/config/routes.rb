Rails.application.routes.draw do
  get "api/v1/current_user", to: "api/v1/sessions/current_user#index"

  devise_for :users, path: "", path_names: { sign_in: "api/v1/login", sign_out: "api/v1/logout", registration: "api/v1/signup" }, controllers: { sessions: "api/v1/sessions/sessions", registrations: "api/v1/sessions/registrations" }

  namespace :api do
    namespace :v1 do
      namespace :users, path: "" do
        resources :users do
          put "update_password", on: :member
          put "update_image", on: :member
        end
        resources :settings
        resources :employees
        resources :clients
      end
      namespace :activities, path: "" do
        resources :activities do
          post "add_clients", on: :member
        end
        resources :locations
      end
    end
  end
end
