# app/jobs/qr_code_generation_job.rb
class QrCodeGenerationJob < ApplicationJob
  queue_as :default

  def perform(record_id, type = :product)
    case type.to_sym
      when :product
        record = ThnkProduct.find(record_id)
        data = record.uuid
      when :variant
        record = ThnkVariant.find(record_id)
        data = record.uuid
      else
        raise ArgumentError, "Invalid type: #{type}"
    end

    # Generate QR code
    qr_image = QrCodeGenerator.generate(data: data)

    # Attach QR code
    record.qr_code_image.attach(
      io: StringIO.new(qr_image.to_blob),
      filename: "qr_code_#{record_id}.png",
      content_type: 'image/png'
    )

  rescue ActiveRecord::RecordNotFound => e
    Rails.logger.error "QR Code Generation Failed: Record not found - #{e.message}"
  rescue StandardError => e
    Rails.logger.error "QR Code Generation Failed: #{e.message}"
    raise e
  end
end
