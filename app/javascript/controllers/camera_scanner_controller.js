// app/javascript/controllers/camera_scanner_controller.js

import { Controller } from "@hotwired/stimulus"
import jsQR from "jsqr"

export default class extends Controller {
  static targets = ["video", "scanResult", "progressBar", "scannerOverlay", "qrButton"]

  connect() {
    this.cameras = []
    this.currentCameraIndex = 0
    this.scanning = false
    this.darkMode = false

    // Create canvas for QR scanning
    this.canvas = document.createElement('canvas')
    this.canvasContext = this.canvas.getContext('2d', { willReadFrequently: true })

    this.startCamera()
  }

  async startCamera() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      this.cameras = devices.filter(device => device.kind === 'videoinput')

      if (this.cameras.length === 0) {
        throw new Error('No cameras found')
      }

      // Try to get back camera first
      const backCamera = this.cameras.find(camera =>
          camera.label.toLowerCase().includes('back') ||
          camera.label.toLowerCase().includes('rear')
      )

      if (backCamera) {
        this.currentCameraIndex = this.cameras.indexOf(backCamera)
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: this.cameras[this.currentCameraIndex].deviceId,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: { ideal: 'environment' }
        }
      })

      this.videoTarget.srcObject = stream
      await this.videoTarget.play()

      // Start scanning automatically
      this.enableScanning()
    } catch (error) {
      console.error("Camera error:", error)
      this.showMessage("Camera error - please check permissions", "error")
    }
  }

  toggleQRMode() {
    if (this.scanning) {
      this.disableScanning()
    } else {
      this.enableScanning()
    }
  }

  enableScanning() {
    this.scanning = true
    this.scannerOverlayTarget.classList.remove('hidden')
    this.qrButtonTarget.classList.add('bg-blue-500')
    this.showMessage("QR scanning active")
    this.scanQRCode()
  }

  disableScanning() {
    this.scanning = false
    this.scannerOverlayTarget.classList.add('hidden')
    this.qrButtonTarget.classList.remove('bg-blue-500')
    this.showMessage("QR scanning disabled")
  }

  async scanQRCode() {
    if (!this.scanning) return

    if (this.videoTarget.readyState === this.videoTarget.HAVE_ENOUGH_DATA) {
      this.canvas.height = this.videoTarget.videoHeight
      this.canvas.width = this.videoTarget.videoWidth

      this.canvasContext.drawImage(
          this.videoTarget,
          0,
          0,
          this.canvas.width,
          this.canvas.height
      )

      const imageData = this.canvasContext.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height
      )

      try {
        const qrCode = jsQR(
            imageData.data,
            imageData.width,
            imageData.height,
            {
              inversionAttempts: "dontInvert",
            }
        )

        if (qrCode) {
          console.log("Found QR code:", qrCode.data)
          await this.handleQRCode(qrCode.data)
          return
        }
      } catch (error) {
        console.error("QR scanning error:", error)
      }
    }

    // Continue scanning
    if (this.scanning) {
      requestAnimationFrame(() => this.scanQRCode())
    }
  }

  async handleQRCode(data) {
    // UUID validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(data)) {
      this.showMessage("Invalid QR code format", "error")
      return
    }

    this.showMessage("Processing...")
    this.progressBarTarget.style.width = '33%'

    // Pause scanning while loading
    this.disableScanning()

    try {
      const response = await fetch(`/scanner/lookup/${data}`, {
        headers: {
          'Accept': 'text/vnd.turbo-stream.html',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content
        }
      })

      if (!response.ok) {
        throw new Error('Product not found')
      }

      const html = await response.text()
      Turbo.renderStreamMessage(html)

      this.progressBarTarget.style.width = '100%'
      this.showMessage("Product found!", "success")

      // Add vibration feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(200)
      }

      // Play success sound
      const audio = new Audio('')
      audio.play().catch(() => {}) // Ignore if sound fails

    } catch (error) {
      console.error('Product lookup error:', error)
      this.showMessage(error.message || "Error loading product", "error")
      this.progressBarTarget.style.width = '0%'
    } finally {
      // Resume scanning after delay
      setTimeout(() => {
        this.enableScanning()
      }, 2000)
    }
  }

  switchCamera() {
    if (this.videoTarget.srcObject) {
      this.videoTarget.srcObject.getTracks().forEach(track => track.stop())
    }
    this.currentCameraIndex = (this.currentCameraIndex + 1) % this.cameras.length
    this.startCamera()
  }

  showMessage(message, type = 'info') {
    this.scanResultTarget.textContent = message
    this.scanResultTarget.className = `fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm z-50 ${
        type === 'error' ? 'bg-red-500 text-white' :
            type === 'success' ? 'bg-green-500 text-white' :
                'bg-blue-500 text-white'
    }`

    this.scanResultTarget.classList.remove('hidden')

    if (type !== 'error') {
      setTimeout(() => {
        this.scanResultTarget.classList.add('hidden')
      }, 3000)
    }
  }

  disconnect() {
    this.scanning = false
    if (this.videoTarget.srcObject) {
      this.videoTarget.srcObject.getTracks().forEach(track => track.stop())
    }
  }
}