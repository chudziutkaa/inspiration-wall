class ApplicationController < ActionController::Base
  require 'json_web_token'

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

end
