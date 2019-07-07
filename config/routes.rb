Rails.application.routes.draw do
  root to: 'messages#index'
  devise_for :users
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
end
