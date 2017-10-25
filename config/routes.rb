Rails.application.routes.draw do
  resources :item_tags
  resources :items
  
  resources :categories do
      resources :items
  end
  
  root 'market#index'

end
