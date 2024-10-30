class QrCode < ApplicationRecord
  has_one_attached :image

  validates :data, presence: true, uniqueness: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }

  after_create_commit :generate_qr_code_image

  private

    def generate_qr_code_image
      qr_image = QrCodeGenerator.generate(
        data: self.data,
        price: self.price,
        size_px: 300
      )

      self.image.attach(
        io: StringIO.new(qr_image.to_blob),
        filename: "qr_code_#{self.id}.png",
        content_type: 'image/png'
      )
    rescue => e
      Rails.logger.error "Failed to generate QR code image for QRCode #{self.id}: #{e.message}"
    end
end
