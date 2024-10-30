# lib/tasks/qr_code_generation.rake

namespace :qr_code do
  desc "Generate and attach QR codes for ThnkVariants or ThnkProducts"
  task generate: :environment do
    require 'logger'

    # Initialize Logger
    logger = Logger.new(Rails.root.join('log', 'qr_code_generation.log'))
    logger.level = Logger::INFO

    # Specify the type of records to process
    # Options: 'variant' or 'product'
    type = ENV['TYPE'] || 'variant'

    # Fetch records based on type without an attached QR code
    records = case type.downcase
                when 'product'
                  ThnkProduct.left_outer_joins(:qr_code_image_attachment).where(active_storage_attachments: { id: nil })
                when 'variant'
                  ThnkVariant.left_outer_joins(:qr_code_image_attachment).where(active_storage_attachments: { id: nil })
                else
                  puts "Invalid TYPE specified. Use 'variant' or 'product'."
                  logger.error "Invalid TYPE specified: #{type}"
                  exit
              end

    if records.empty?
      puts "No #{type.pluralize} found without QR codes."
      logger.info "No #{type.pluralize} found without QR codes."
      exit
    end

    records.find_each do |record|
      begin
        data = record.uuid

        # **Update this line to use `variant_price` instead of `price`**
        price = record.respond_to?(:variant_price) ? record.variant_price : nil

        unless price
          logger.warn "Skipping #{type.capitalize} ID #{record.id}: Missing price."
          puts "Skipping #{type.capitalize} ID #{record.id}: Missing price."
          next
        end

        # Generate QR code with both data and price
        qr_image = QrCodeGenerator.generate(data: data, price: price)

        # Attach QR code to the record using Active Storage
        record.qr_code_image.attach(
          io: StringIO.new(qr_image.to_blob),
          filename: "qr_code_#{record.id}.png",
          content_type: 'image/png'
        )

        logger.info "QR code generated and attached to #{type.capitalize} ID: #{record.id}"
        puts "QR code generated and attached to #{type.capitalize} ID: #{record.id}"
      rescue ActiveRecord::RecordNotFound => e
        logger.error "Record not found: #{e.message}"
        puts "Record not found: #{e.message}"
      rescue ArgumentError => e
        logger.error "QR Code Generation Failed for #{type.capitalize} ID #{record.id}: #{e.message}"
        puts "QR Code Generation Failed for #{type.capitalize} ID #{record.id}: #{e.message}"
      rescue StandardError => e
        logger.error "An unexpected error occurred for #{type.capitalize} ID #{record.id}: #{e.message}"
        puts "An unexpected error occurred for #{type.capitalize} ID #{record.id}: #{e.message}"
      end
    end

    logger.info "QR code generation task completed."
    puts "QR code generation task completed."
  end
end
