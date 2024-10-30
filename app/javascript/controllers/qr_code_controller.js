// app/javascript/controllers/qr_code_controller.js

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["container"]

    connect() {
        // Check if QR code is still generating after 30 seconds
        this.timeout = setTimeout(() => {
            if (!this.hasQrCode()) {
                this.showError()
            }
        }, 30000)
    }

    disconnect() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    }

    hasQrCode() {
        return this.element.querySelector('img') !== null
    }

    showError() {
        const container = this.element.querySelector('.qr-code-container')
        if (container) {
            container.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div class="text-center text-red-500">
            <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
            <p class="text-sm">QR Code generation failed.</p>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    onclick="location.reload()">
              Retry
            </button>
          </div>
        </div>
      `
        }
    }
}