# app/controllers/scanner/camera_controller.rb
class ScannerController < ApplicationController
  include ActionController::Live

  def index
    # This action renders the camera interface view
  end

  def scan
    @variant = ThnkVariant.find_by(uuid: params[:uuid])

    if @variant
      # Log the scan
      log_scan(@variant)

      respond_to do |format|
        format.json {
          render json: {
            success: true,
            product: product_response(@variant)
          }
        }
        format.html {
          @product = @variant.thnk_product
          render partial: 'thnk/products/product_details',
                 locals: { product: @product, variant: @variant }
        }
      end
    else
      render_error('Product not found', :not_found)
    end
  rescue => e
    Rails.logger.error("Scan error: #{e.message}")
    render_error('Scanner error occurred', :internal_server_error)
  end

  private

    def log_scan(variant)
      Rails.logger.info(
        {
          event: 'product_scan',
          variant_id: variant.id,
          variant_sku: variant.variant_sku,
          product_id: variant.thnk_product_id,
          timestamp: Time.current,
          user_agent: request.user_agent,
          ip: request.remote_ip
        }.to_json
      )
    end

    def product_response(variant)
      {
        id: variant.thnk_product.id,
        variant_id: variant.id,
        title: variant.thnk_product.title,
        sku: variant.variant_sku,
        price: variant.variant_price,
        description: variant.thnk_product.body,
        images: variant_images(variant),
        metadata: {
          vendor: variant.thnk_product.vendor,
          category: variant.thnk_product.product_category,
          collection: variant.product_collection,
          barcode: variant.variant_barcode
        }
      }
    end

    def variant_images(variant)
      {
        primary: variant.images.first&.url || 'placeholder.png',
        all: variant.images.map { |image| image.url }
      }
    end

    def render_error(message, status)
      respond_to do |format|
        format.json {
          render json: {
            success: false,
            error: message
          }, status: status
        }
        format.html {
          render html: "<div class='error'>#{message}</div>".html_safe,
                 status: status
        }
      end
    end
end