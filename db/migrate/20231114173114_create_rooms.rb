class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.string :room_number
      t.text :description
      t.integer :floor_number
      t.integer :seater
      t.boolean :booked, default: false
      t.integer :type

      t.timestamps
    end
  end
end
