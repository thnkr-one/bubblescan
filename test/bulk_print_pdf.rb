# app/services/bulk_print_pdf.rb

require 'prawn'

class BulkPrintPdf
  def initialize(products)
    @products = products
  end

  def render
    Prawn::Document.new(page_size: 'LETTER', layout: :portrait) do |pdf|
      @products.each do |product|
        product.thnk_variants.each do |variant|
          if variant.qr_code_image.attached?
            pdf.image StringIO.new(variant.qr_code_image.download), width: 72, height: 72 # 1" x 1" at 72 DPI
            pdf.text "$#{variant.variant_price}", size: 8, align: :left
            pdf.move_down 20
          else
            pdf.text "QR Code not available for SKU: #{variant.variant_sku}", size: 8, color: 'red'
            pdf.move_down 20
          end
        end
        pdf.start_new_page unless product == @products.last
      end
    end
  end
end
