# app/services/qr_code_generator.rb

class QrCodeGenerator
  def self.generate(data:, price:)
    require 'rqrcode'
    require 'chunky_png'

    # Use a compact JSON format
    qr_content = { uuid: data, price: price }.to_json

    # Generate QR code with optimized content
    qr = RQRCode::QRCode.new(qr_content, size: 8, level: :m) # Adjusted size and level based on new content

    # Convert QR code to PNG
    png = qr.as_png(
      bit_depth: 1,
      border_modules: 4,
      color_mode: ChunkyPNG::COLOR_GRAYSCALE,
      color: 'black',
      file: nil,
      fill: 'white',
      module_px_size: 6,
      resize_exactly_to: false,
      resize_greater_to: false
    )

    png
  end
end
