class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.references :board
      t.string :name
    end

    create_table :cards do |t|
      t.references :list
      t.string :title
      t.text :description
    end
  end
end
