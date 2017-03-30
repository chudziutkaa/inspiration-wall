class ApplicationController < ActionController::Base
  require 'json_web_token'

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  protected

  def authenticate_request!
    if !payload
      return invalid_authentication
    end

    load_current_user!
    invalid_authentication unless @current_user
  end

  def invalid_authentication
    render json: {error: 'Invalid Request'}, status: :unauthorized
  end

  private

  def payload
    auth_header = request.headers['Authorization']
    token = auth_header.split(' ').last
    JsonWebToken.decode(token)
  rescue
    nil
  end

  def load_current_user!
    @current_user = User.find_by(id: payload['user_id'])
  end
end
