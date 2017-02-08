class CardsController < ApplicationController
  before_action :set_card, only: [:update, :destroy]

  def create
    @card = Card.new(card_params)
    if @card.save
      render json: @card
    else
      render status: 422
    end
  end

  def update
    @card.update
    render json: @card
  end

  def destroy
    @card.destroy
    head :no_content
  end

  private

  def card_params
    params.require(:card).permit([:title, :description, :list_id])
  end

  def set_card
    @card = Card.find(params[:id])
  end
end
