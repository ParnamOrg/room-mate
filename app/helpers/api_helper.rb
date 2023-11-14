module ApiHelper
  def current_user
    @current_user ||= User.find_by(token: request.headers[:authorization].to_s)
  end
end
