Rails.application.routes.draw do
  resources :item_users
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  resources :item_tags
  resources :items
  get '/users/:id', to: 'users#show'
  
  resources :categories do
      resources :items
  end
  
  root 'market#index'

end
