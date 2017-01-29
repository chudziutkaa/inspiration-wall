class BoardsController < ApplicationController
  before_action :set_board, only: [:show, :edit, :destroy]

  def index
    @boards = Board.all
    render json: @boards
  end

  # def new
  #   @board = Board.new
  # end

  def create
    @board = Board.new(board_params)
    if @board.save
      # redirect_to boards_path
      render json: @board
    else
      render new_board_path
    end
  end

  def show
    render json: @board
  end

  def edit
  end

  def update
    if @board.update(board_params)
      redirect_to boards_path
    else
      render edit_board_path
    end
  end

  def destroy
    @board.destroy
    redirect_to boards_path
  end

  private
  def board_params
    params.require(:board).permit(:title)
  end

  def set_board
    @board = Board.find(params[:id])
  end
end
