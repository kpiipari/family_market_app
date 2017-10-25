Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  resources :item_tags
  resources :items
  
  resources :categories do
      resources :items
  end
  
  root 'market#index'

end
