class CreateQrCodes < ActiveRecord::Migration[7.2]
  def change
    create_table :qr_codes do |t|
      t.string :data
      t.decimal :price

      t.timestamps
    end
  end
end
