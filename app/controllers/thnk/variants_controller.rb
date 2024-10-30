module Thnk
  class VariantsController < ApplicationController
    # GET /variants/:uuid/details
    # GET /variants/:uuid/details
    def details
      respond_to do |format|
        format.html { render partial: 'details', locals: { variant: @variant } }
      end
      @variant = ThnkVariant.find_by(uuid: params[:uuid])
      if @variant
        @product = @variant.thnk_product
        log_scan(@variant)
        render :details
      else
        redirect_to thnk_products_path, alert: "Variant not found."
      end
    end

    def show
      @variant = ThnkVariant.find(params[:id])
    end

    def create
      @variant = Thnk::Variant.new(variant_params)
      if @variant.save
        QrCodeGenerationJob.perform_later(@variant.id, :variant)
        redirect_to @variant, notice: 'Variant was successfully created.'
      else
        render :new
      end
    end

    private

      def set_variant
        @variant = ThnkVariant.find_by(uuid: params[:uuid])
        unless @variant
          render plain: "Variant not found", status: :not_found
        end
      end

      def log_scan(variant)
        Scan.create!(
          thnk_variant: variant,
          ip_address: request.remote_ip,
          user_agent: request.user_agent
        )
      rescue => e
        Rails.logger.error "Failed to log scan for variant '#{variant.variant_sku}': #{e.message}"
      end
  end
end