Rails.application.routes.draw do
  resources :item_users
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  resources :users, :only => [:show]
  resources :item_tags
  resources :items
  resources :reserved_items
  
  resources :categories do
      resources :items
  end
  
  root 'market#index'

end
