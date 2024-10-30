class QrCodesController < ApplicationController
  before_action :set_qr_code, only: [:show, :edit, :update, :destroy]

  def index
    @qr_codes = QrCode.all.order(created_at: :desc)
  end

  def show
  end

  def new
    @qr_code = QrCode.new
  end

  def create
    @qr_code = QrCode.new(qr_code_params)
    if @qr_code.save
      redirect_to @qr_code, notice: 'QR Code was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @qr_code.update(qr_code_params)
      redirect_to @qr_code, notice: 'QR Code was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @qr_code.destroy
    redirect_to qr_codes_url, notice: 'QR Code was successfully destroyed.'
  end

  private

    def set_qr_code
      @qr_code = QrCode.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to qr_codes_path, alert: 'QR Code not found.'
    end

    def qr_code_params
      params.require(:qr_code).permit(:data, :price)
    end
end
