class UsersController < ApplicationController
  def register
    @user = User.new( user_params )

    if @user.save
      render json: { status: "User successfully registered" }
    else
      render json: { error: "Bad request" }
    end
  end

  def login
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      auth_token = JsonWebToken.encode({ user_id: @user.id, username: @user.username })
      render json: { auth_token: auth_token }
    else
      render json: { error: "Invalid username/password" }
    end
  end

  private

  def user_params
    params.require( :user ).permit( :username, :email, :password, :password_confirmation )
  end
end