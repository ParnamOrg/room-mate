module JwtHelper
  SECRET_KEY = Rails.application.credentials.secret_key_base

  def encode_token(payload)
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  def decode_token(token)
    JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256')
  end
end
