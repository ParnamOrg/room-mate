module ErrorHandling
	module ErrorResponse
	  def handle_error(message, status)
	    render json: {
	        messages: message,
	        is_success: true,
	        data: {}
	      }, status: status
	  end
	end
end
