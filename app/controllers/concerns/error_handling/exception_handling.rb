module ErrorHandling
	module ExceptionHandling
	  def handle_exceptions
	    begin
	      yield
	    rescue => e
	      handle_error(e, :unprocessable_entity)
	    end
	  end
	end
end
