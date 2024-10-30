// app/javascript/controllers/modal_controller.js

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["title", "content"]

  open(event) {
    event.preventDefault()
    const variantUuid = event.currentTarget.dataset.variantUuid

    // Show the modal
    this.element.classList.remove("hidden")
    this.element.classList.add("flex")
    document.body.classList.add("overflow-hidden") // Prevent background scrolling

    // Set default title
    this.titleTarget.textContent = "Product Details"

    // Show loading state
    this.contentTarget.innerHTML = '<p class="text-center">Loading...</p>'

    // Fetch variant details via AJAX
    fetch(`/thnk/variants/${variantUuid}/details`, {
      headers: {
        'Accept': 'text/html'
      }
    })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.text()
        })
        .then(html => {
          this.contentTarget.innerHTML = html
        })
        .catch(error => {
          this.contentTarget.innerHTML = '<p class="text-center text-red-500">Error loading product details.</p>'
          console.error("Error fetching product details:", error)
        })
  }

  close() {
    // Hide the modal
    this.element.classList.remove("flex")
    this.element.classList.add("hidden")
    document.body.classList.remove("overflow-hidden")
    // Optionally, reset the content
    this.contentTarget.innerHTML = '<p class="text-center">Loading...</p>'
  }

  print() {
    const qrCodeImage = this.contentTarget.querySelector('img[alt^="QR Code"]')
    const priceElement = this.contentTarget.querySelector('[data-price]')
    const price = priceElement ? `$${priceElement.dataset.price}` : 'N/A'

    if (qrCodeImage && priceElement) {
      const productName = qrCodeImage.alt.replace('QR Code for ', '')
      const printWindow = window.open('', '_blank')

      // Sanitize dynamic content to prevent XSS
      const sanitizedProductName = productName.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      const sanitizedPrice = price.replace(/</g, "&lt;").replace(/>/g, "&gt;")

      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { text-align: center; font-family: Arial, sans-serif; }
              .qr-code { width: 300px; height: 300px; position: relative; margin: 0 auto; }
              .price { position: absolute; bottom: 10px; left: 10px; font-size: 24px; color: black; }
              .container { position: relative; display: inline-block; }
              button { margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #4F46E5; color: white; border: none; border-radius: 5px; cursor: pointer; }
              button:hover { background-color: #4338CA; }
            </style>
          </head>
          <body>
            <h2>${sanitizedProductName}</h2>
            <div class="container">
              ${qrCodeImage.outerHTML}
              <div class="price">${sanitizedPrice}</div>
            </div>
            <button onclick="window.print()">Print</button>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
    } else {
      alert("QR Code or Price information not found.")
    }
  }
}
