class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable

  has_many :room_preferences, class_name: 'Preference', foreign_key: 'user_id'

  SECRET_KEY = Rails.application.credentials.config[:secret_key_base]

  ENCODING = 'HS256'

  def generate_auth_token(exp = 24.hours.from_now)
    token = JWT.encode({ exp: exp.to_i, password: self.password }, SECRET_KEY, ENCODING)
    self.token = token
  end

  def destroy_auth_token
    self.token = nil
  end
end
