class Api::V1::RegistrationsController < ApiController
  skip_before_action :verify_token, :only => :create
  before_action :ensure_params_exist, only: :create
  before_action :check_password, only: :create
  before_action :validate_email, only: :create

  def create
    if params[:user][:email].nil?
      render :status => 400,
      :json => {:message => 'User request must contain the user email.'}
      return
    elsif params[:user][:password].nil?
      render :status => 400,
      :json => {:message => 'User request must contain the user password.'}
      return
    end
    
    if params[:user][:email]
      duplicate_user = User.find_by_email(params[:user][:email])
      unless duplicate_user.nil?
        render :status => 409,
        :json => {:message => 'Duplicate email. A user already exists with that email address.'}
        return
      end
    end
    
    @user = User.new(user_params)
    # if user_params.fetch(:height, {}).present?
    #   user_height = User.get_height(user_params[:height])
    #   @user.height = user_height.to_f
    # end

    @user.generate_auth_token
    @user.add_role (:patient)

    if @user.save && @user.token.present?
      tdee_data = fetch_tdee_data
      calorie_need_data = tdee_data.fetch("CALORIE_NEEDS", {})
      macros_data = tdee_data.fetch("MACROS", {})
      bdp = macros_data.fetch("balancedDietPlan", {})
      lcdp = macros_data.fetch("lowCarbDietPlan", {})
      hcdp = macros_data.fetch("highCarbDietPlan", {})
      hpdp = macros_data.fetch("highProteinDietPlan", {})
      lsdp = macros_data.fetch("lowSugarDietPlan", {})
      @tdee = Tdee.new(
                  user: @user,
                  bmr: tdee_data.fetch("BMR", 0),
                  bmi: tdee_data.fetch("BMI", 0),
                  ideal: tdee_data.fetch("IDEAL_BODY_WEIGHT", 0),
                  balance: calorie_need_data.fetch("balance", 0),
                  mild_weight_gain: calorie_need_data.fetch("mildWeightGain", 0),
                  mild_weight_loss: calorie_need_data.fetch("mildWeightLoss", 0),
                  heavy_weight_gain: calorie_need_data.fetch("heavyWeightGain", 0),
                  heavy_weight_loss: calorie_need_data.fetch("heavyWeightLoss", 0),
                  tdee: tdee_data["TDEE"],
                  bdp_carb: bdp.fetch("carb", 0),
                  bdp_protein: bdp.fetch("protein", 0),
                  bdp_fat: bdp.fetch("fat", 0),
                  bdp_sugar: bdp.fetch("sugar", 0),
                  lcdp_carb: lcdp.fetch("carb", 0),
                  lcdp_protein: lcdp.fetch("protein", 0),
                  lcdp_fat: lcdp.fetch("fat", 0),
                  lcdp_sugar: lcdp.fetch("sugar", 0),
                  hcdp_carb: hcdp.fetch("carb", 0),
                  hcdp_protein: hcdp.fetch("protein", 0),
                  hcdp_fat: hcdp.fetch("fat", 0),
                  hcdp_sugar: hcdp.fetch("sugar", 0),
                  hpdp_carb: hpdp.fetch("carb", 0),
                  hpdp_protein: hpdp.fetch("protein", 0),
                  hpdp_fat: hpdp.fetch("fat", 0),
                  hpdp_sugar: hpdp.fetch("sugar", 0),
                  lsdp_carb: lsdp.fetch("carb", 0),
                  lsdp_protein: lsdp.fetch("protein", 0),
                  lsdp_fat: lsdp.fetch("fat", 0),
                  lsdp_sugar: lsdp.fetch("sugar", 0))
      if @tdee.save!
        render json: {
          messages: "Please check your email to verify your account.",
          is_success: true,
          data: {user: @user}
        }, status: :ok
        UserMailer.welcome_user(@user).deliver_now!
      else
        handle_error(@tdee.errors.full_messages, :unprocessable_entity)
      end
    else
      handle_error(@user.errors.full_messages, :unprocessable_entity)
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :birth_date, :zip_code, :weight, :biography, :email, :password, :password_confirmation, :activity, :occupation, :sex, :goal, :height)
  end

  def ensure_params_exist
    if params[:user].blank?
      handle_error('Missing Params', :not_found)
    else
      if user_params.fetch(:height, {}).blank?
      #   if user_params[:height].fetch(:feet, {}).blank? || user_params[:height].fetch(:inches,{}).blank?
      #     handle_error('Height must be present in feet and inches', :bad_request)
      #     return
      #   end
      # else
        handle_error('Height must be present', :bad_request)
        return
      elsif user_params.fetch(:height, {}).present? && user_params.fetch(:height, {}) < 24
        handle_error('Height must be greater than 24 inches', :bad_request)
        return
      end

      if user_params.fetch(:sex, {}).present? && !(user_params[:sex].downcase != "m" || user_params[:sex].downcase != "f")
        handle_error("Sex must be present as 'm' for male and 'f' for female", :bad_request)
        return
      elsif user_params.fetch(:sex, {}).blank?
        handle_error("Sex can't be blank", :bad_request)
        return
      end

      if user_params.fetch(:birth_date, {}).blank?
        handle_error('Date of Birth must be present', :bad_request)
        return
      end

      if user_params.fetch(:weight, {}).blank?
        handle_error('Weight must be present', :bad_request)
        return
      end

      if user_params.fetch(:activity, {}).blank?
        handle_error("activity must be present", :bad_request)
        return
      elsif user_params.fetch(:activity, {}).present? && !ACTIVITY.include?(user_params.fetch(:activity, {}))
        handle_error("Invalid activity value", :bad_request)
        return
      end
    end
  end

  def check_password
    return if user_params[:password] == user_params[:password_confirmation]
    handle_error('Passwords does not match', :unprocessable_entity)
  end

  def validate_email
    r = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/
    unless user_params[:email].match(r)
      handle_error('Enter a valid email address', :bad_request)
    end
  end
end
