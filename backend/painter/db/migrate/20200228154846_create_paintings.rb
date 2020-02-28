class CreatePaintings < ActiveRecord::Migration[6.0]
  def change
    create_table :paintings do |t|
      t.string :name
      t.string :svgInner
      t.integer :user_id

      t.timestamps
    end
  end
end
