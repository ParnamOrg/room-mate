class Api::V1::AuthenticationController < ApiController
  skip_before_action :verify_token

  def status
    user = User.find_by(token: params[:token])

    render json: {
      messages: "Authentication verified",
      authorized: user.present?
    }, status: :ok
  end
end
