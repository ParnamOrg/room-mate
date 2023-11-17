class Api::V1::PasswordsController < ApiController
  skip_before_action :verify_token
  before_action :ensure_params_exist, only: :create

  def new
      user = User.find_by(email: params[:email])

      if user.present? && user.send_reset_password_instructions
        render json: {
          messages: "Please check your email to verify your account.",
          is_success: true,
        }, status: :ok
      else
        handle_error('Invalid email', :unprocessable_entity)
      end
  end
end
