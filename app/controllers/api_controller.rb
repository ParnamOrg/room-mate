class ApiController < ApplicationController
  include ErrorHandling::ErrorResponse
  include ErrorHandling::ExceptionHandling
  include ApiHelper

  # rescue_from Apipie::ParamError do |e|
  #   render json: {
  #           messages: e.message,
  #         }, status: :unprocessable_entity
  # end

  rescue_from JSON::ParserError do |e|
    render json: {
            messages: 'Error occurred while parsing request parameters.',
          }, status: :unprocessable_entity
  end

  # skip_before_action :verify_authenticity_token
  # skip_before_action :authenticate_user!
  # skip_before_action :check_for_authentication
  # around_action :handle_exceptions
  before_action :set_default_response_format
  # before_action :verify_token
  helper_method :current_user

  def verify_token
    if request.headers[:authorization].present?
      @current_user = User.find_by(token: request.headers[:authorization])
      if @current_user.present?
        if @current_user.has_role?(:admin)
          handle_error("Admin user not allowed", :unauthorized)
        else
          if @current_user.confirmed?
            @current_user
          else
            handle_error("Please confirm your account first", :unauthorized)
          end
        end
      else
        handle_error("Invalid auth token", :unauthorized)
      end
    else
      handle_error("Invalid auth token", :unauthorized)
    end
  end

  def is_authenticated?
    @current_user.present?
  end

  protected

  def set_default_response_format
    request.format = :json
  end
end