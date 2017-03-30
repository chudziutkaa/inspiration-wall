class BoardsController < ApplicationController
  before_action :set_board, only: [:show, :update, :destroy]

  before_action :authenticate_request!

  def index
    @boards = Board.where(user_id: @current_user.id)
    render json: @boards
  end

  def create
    @board = User.find(params[:user_id]).boards.new(board_params)
    if @board.save
      render json: @board
    else
      render status: 422
    end
  end

  def show
    render json: @board
  end

  def update
    @board.update(board_params)
    render json: @board
  end

  def destroy
    @board.destroy
    head :no_content
  end

  private
  def board_params
    params.require(:board).permit([:title, :user_id])
  end

  def set_board
    @board = Board.find(params[:id])
  end
end
