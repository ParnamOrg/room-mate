class Api::V1::SessionsController < ApiController
  include JwtHelper

  skip_before_action :verify_token, :only => [:create]
  before_action :load_user, only: :create
  before_action :check_email_confirmation, only: :create
  before_action :verify_admin_user, :only => [:create]

  def create
    if @user.valid_password?(sign_in_params[:password])
      @user.generate_auth_token
      if @user.save && @user.token.present?
        render json: {
          messages: "You\'re signed in.",
          is_success: true,
          logged_in: true,
          user: @user
        }, status: :ok
      else
        handle_error('Signed In Failed - Unauthorized', :unauthorized)
      end
    else
      handle_error('Signed In Failed - Unauthorized', :unauthorized)
    end
  end

  def destroy
    @user = current_user
    @user.destroy_auth_token
    if @user.save && @user.token.blank?
      render json: {
        messages: "You\'re signed out.",
        is_success: true,
        user: @user
      }, status: :ok
    else
      handle_error('Unsuccessful logout', :bad_request)
    end
  end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

  def check_email_confirmation
    unless @user.confirmed?
      handle_error('Please confirm email before sign_in', :unauthorized)
    end
  end

  def load_user
    @user = User.find_for_database_authentication(email: sign_in_params[:email])

    unless @user
      handle_error('Your user cannot be found.', :bad_request)
    end
  end

  def verify_admin_user
    if @user.present? && @user.has_role?(:admin)
      handle_error('Admin role unauthorized', :unauthorized)
    end
  end

  def set_default_response_format
    request.format = :json
  end
end
