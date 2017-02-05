class BoardsController < ApplicationController
  before_action :set_board, only: [:show, :update, :destroy]

  def index
    @boards = Board.all
    render json: @boards
  end

  def create
    @board = Board.new(board_params)
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
  end

  private
  def board_params
    params.require(:board).permit(:title)
  end

  def set_board
    @board = Board.find(params[:id])
  end
end
