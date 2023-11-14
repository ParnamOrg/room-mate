class Profile < ApplicationRecord
	VALID_YEARS = [2022, 2023, 2024, 2025].freeze

	validates :year, presence: true, inclusion: { in: VALID_YEARS, message: 'is not a valid year' }
end
