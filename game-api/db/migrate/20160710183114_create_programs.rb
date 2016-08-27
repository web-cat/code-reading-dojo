class CreatePrograms < ActiveRecord::Migration[5.0]
  def change
    create_table :programs do |t|
      t.string :code
      t.string :difficulty
      t.string :level
      t.string :errorindexes

      t.timestamps
    end
  end
end
