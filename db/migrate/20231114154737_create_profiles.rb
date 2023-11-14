class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :enrollment_number
      t.integer :graduation_year
      t.integer :semester
      t.string :avatar

      t.timestamps
    end
  end
end
