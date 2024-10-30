# app/jobs/image_attachment_job.rb

require 'open-uri'

class ImageAttachmentJob < ApplicationJob
  queue_as :default

  # Performs the job to attach an image to a specified record.
  #
  # @param class_name [String] The name of the model class (e.g., 'ThnkVariant').
  # @param record_id [Integer] The ID of the record to which the image will be attached.
  # @param image_url [String] The URL of the image to be downloaded and attached.
  def perform(class_name, record_id, image_url)
    unless class_name.present? && record_id.present? && image_url.present?
      Rails.logger.error "Invalid parameters: class_name=#{class_name}, record_id=#{record_id}, image_url=#{image_url}"
      return
    end

    begin
      # Fetch the record from the database
      record = class_name.constantize.find(record_id)
      raise ActiveRecord::RecordNotFound, "Record not found" unless record

      # Download the image with timeout options
      downloaded_image = URI.open(image_url, open_timeout: 10, read_timeout: 10)

      # Attach the image to the record using Active Storage
      record.images.attach(
        io: downloaded_image,
        filename: File.basename(URI.parse(image_url).path),
        content_type: downloaded_image.content_type
      )

      Rails.logger.info("Image attached successfully to #{class_name} ID: #{record_id} with image URL: #{image_url}")

      # Enqueue QR code generation job if the image was attached successfully
      QrCodeGenerationJob.perform_later(record.id, :variant)
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error("#{class_name} with ID #{record_id} not found: #{e.message}")
    rescue OpenURI::HTTPError => e
      Rails.logger.error("Failed to open image URL for #{class_name} ID #{record_id}: #{e.message}")
    rescue Net::OpenTimeout, Net::ReadTimeout => e
      Rails.logger.error("Timeout when accessing image URL for #{class_name} ID #{record_id}: #{e.message}")
    rescue URI::InvalidURIError => e
      Rails.logger.error("Invalid image URL provided for #{class_name} ID #{record_id}: #{e.message}")
    rescue => e
      Rails.logger.error("Failed to attach image to #{class_name} ID #{record_id}: #{e.message}")
      raise e
    end
  end
end
