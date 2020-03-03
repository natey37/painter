class AddColumnToPaintings < ActiveRecord::Migration[6.0]
  def change
    add_column :paintings, :background_color, :string
  end
end
