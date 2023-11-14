class Api::V1::AuthenticationController < ApiController
  # skip_before_action :verify_token

  def status
    render json: {
      messages: "Authentication verified",
      authentication_status: current_user.present?
    }, status: :ok
  end
end