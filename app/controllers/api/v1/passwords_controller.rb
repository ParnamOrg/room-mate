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

  def update
    user = User.find_by(email: params[:email])

    if user.present?
      user.update({
        password: params[:password],
        password_confirmation: params[:password]
      })

      if user.errors.empty?
        render json: {
          messages: "Reset password successfully!",
          is_success: true,
        }, status: :ok
      else
        handle_error(user.errors.full_messages, :unprocessable_entity)
      end
    else
      handle_error('User not found', :not_found)
    end
  end
end
