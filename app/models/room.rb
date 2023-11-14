class Room < ApplicationRecord
	enum seater: { single_seater: 0, double_seater: 1 }
	enum type: { with_balcony: 0, without_balcony: 1 }
end
