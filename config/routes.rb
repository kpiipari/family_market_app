Rails.application.routes.draw do
  resources :item_users
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  resources :users, :only => [:show]
  resources :item_tags
  resources :items
  resources :reserved_items
  
  resources :categories, only: [:show, :index] do
      resources :items, only: [:show, :index, :new]
  end
  
  root 'market#index'

end
