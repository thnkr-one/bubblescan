// app/javascript/controllers/scanner_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["video", "scanResult"]

    connect() {
        this.startCamera()
    }

    startCamera() {
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
            .then(stream => {
                this.videoTarget.srcObject = stream
                this.videoTarget.setAttribute("playsinline", true)
                this.videoTarget.play()
                this.scanQRCode()
            })
            .catch(error => {
                console.error("Camera error:", error)
            })
    }

    scanQRCode() {
        if (this.videoTarget.readyState === this.videoTarget.HAVE_ENOUGH_DATA) {
            const canvas = document.createElement("canvas")
            canvas.width = this.videoTarget.videoWidth
            canvas.height = this.videoTarget.videoHeight
            const ctx = canvas.getContext("2d")
            ctx.drawImage(this.videoTarget, 0, 0, canvas.width, canvas.height)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

            try {
                const code = jsQR(imageData.data, imageData.width, imageData.height)
                if (code) {
                    const uuid = code.data
                    // Validate UUID format
                    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)) {
                        this.lookupProduct(uuid)
                        return
                    }
                }
            } catch (error) {
                console.error("QR scan error:", error)
            }
        }
        requestAnimationFrame(() => this.scanQRCode())
    }

    async lookupProduct(uuid) {
        try {
            const response = await fetch(`/scanner/lookup/${uuid}`, {
                headers: {
                    'Accept': 'text/vnd.turbo-stream.html',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                }
            })

            if (!response.ok) throw new Error('Lookup failed')

            const html = await response.text()
            Turbo.renderStreamMessage(html)
        } catch (error) {
            console.error('Lookup error:', error)
        }
    }

    disconnect() {
        if (this.videoTarget.srcObject) {
            this.videoTarget.srcObject.getTracks().forEach(track => track.stop())
        }
    }
}