class ThnkProduct < ApplicationRecord
  has_many :thnk_variants, dependent: :destroy
  has_many_attached :images
  has_one_attached :qr_code_image

  validates :uuid, presence: true, uniqueness: true

  before_validation :set_uuid, on: :create
  after_commit :attach_qr_code, on: :create

  private

    def set_uuid
      self.uuid ||= SecureRandom.uuid
    end

    def attach_qr_code
      return if qr_code_image.attached?

      require 'rqrcode'

      qr = RQRCode::QRCode.new(
        uuid,
        size: 7,
        level: :q,
        mode: :alphanumeric
      )

      png = qr.as_png(
        size: 400,
        border_modules: 2
      )

      temp_file = Tempfile.new(['qr', '.png'])
      temp_file.binmode
      temp_file.write(png.to_s)
      temp_file.rewind

      qr_code_image.attach(
        io: temp_file,
        filename: "qr_#{handle || id}.png",
        content_type: 'image/png',
        identify: false
      )
    rescue RQRCode::QRCodeRunTimeError => e
      Rails.logger.error "QR Code generation failed for product #{id}: #{e.message}"
      false
    ensure
      temp_file&.close
      temp_file&.unlink
    end
end