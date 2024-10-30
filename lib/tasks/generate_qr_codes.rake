namespace :variants do
  desc "Generate missing QR codes for variants"
  task generate_missing_qr_codes: :environment do
    variants = ThnkVariant.includes(:qr_code_image_attachment)
                          .where(active_storage_attachments: { id: nil })

    total = variants.count
    puts "Found #{total} variants needing QR codes"

    success = 0
    errors = []

    variants.find_each.with_index do |variant, index|
      print "\rProcessing #{index + 1}/#{total} (#{((index + 1).to_f / total * 100).round(1)}%)"

      begin
        variant.generate_qr_code
        success += 1
      rescue => e
        errors << { sku: variant.variant_sku, error: e.message }
        print "E" # Error indicator
      end
    end

    puts "\n\nGeneration Complete!"
    puts "Successfully generated: #{success}"
    puts "Errors: #{errors.size}"

    if errors.any?
      puts "\nErrors encountered:"
      errors.each do |e|
        puts "SKU: #{e[:sku]} - #{e[:error]}"
      end
    end
  end
end
