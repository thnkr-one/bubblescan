module Thnk
  class ProductsController < ApplicationController
    before_action :set_product, only: [:quickview]
    def quickview
      # Assuming you want to display a specific variant's details
      @product = ThnkProduct.find(params[:id])
      @variant = @product.thnk_variants.first # Modify as needed to select the correct variant

      render partial: 'quickview', locals: { product: @product, variant: @variant }
    end
    def show
    end

    def index
      @query = params[:query]
      @products = ThnkProduct.includes(:thnk_variants).all.order(:title)
      if @query.present?
        @products = @products.where('title ILIKE ?', "%#{@query}%")
      end
      @products = @products.page(params[:page]).per(10)
      @categories = @products.pluck(:product_category).compact.uniq
    end

    def bulk_print
      @category = params[:category]
      @products = ThnkProduct.includes(
        thnk_variants: {
          qr_code_image_attachment: :blob
        }
      ).joins(:thnk_variants).where(product_category: @category).distinct
      # Generate missing QR codes if needed
      @products.each do |product|
        product.thnk_variants.each do |variant|
          unless variant.qr_code_image.attached?
            #QrCodeGenerationJob.perform_later(variant.id, :variant)
            puts
          end
        end
      end

      respond_to do |format|
        format.html
        format.pdf do
          pdf = BulkPrintPdf.new(@products)
          send_data pdf.render,
                    filename: "bulk_qr_codes_#{@category.parameterize}.pdf",
                    type: 'application/pdf',
                    disposition: 'inline'
        end
      end
    end

    private

      def set_product
        @product = ThnkProduct.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        redirect_to thnk_products_path, alert: "Product not found."
      end
  end
end
