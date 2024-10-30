# config/routes.rb

Rails.application.routes.draw do
  # Root path
  root 'home#index'

  # Namespace for Thnk-related resources
  namespace :thnk do
    resources :products, only: [:index, :show] do
      collection do
        get :bulk_print
      end

      # Nested resources for variants if needed
      resources :variants, only: [:index, :show]
    end

    # Custom route for variant details by UUID
    get 'variants/:uuid/details', to: 'variants#details', as: 'variant_details'
  end

  # Namespace for Ecomm-related resources
  namespace :ecomm do
    get 'dashboard' => 'dashboard#index'
  end

  # Namespace for Scanner functionality
  namespace :scanner do
    get 'camera' => 'camera#index'
    post 'camera/scan' => 'camera#scan'          # Route for scanning QR codes via API
    get 'lookup/:uuid' => 'scanner#lookup', as: 'lookup'  # Route for looking up products by UUID
  end

  # Resourceful routes for QR Codes management
  resources :qr_codes, only: [:index, :show, :new, :create, :edit, :update, :destroy]

  # Health Check Routes
  get "up" => "rails/health#show", as: :rails_health_check

  # Progressive Web App (PWA) Routes
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Optional: Additional routes can be added here
end
