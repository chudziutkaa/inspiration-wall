class ListsController < ApplicationController
  before_action :set_list, only: [:update, :destroy]

  def index
    @lists = List.where(board_id: params[:board_id])
    render json: @lists, include: [:cards]
  end

  def create
    @list = Board.find(params[:board_id]).lists.new(list_params)
    if @list.save
      render json: @list
    else
      render status: 422
    end
  end

  def update
    @list.update(list_params)
    render json: @list
  end

  def destroy
    @list.destroy
  end

  private
  def list_params
    params.require(:list).permit([:name, :board_id])
  end

  def set_list
    @list = List.find(params[:id])
  end
end
