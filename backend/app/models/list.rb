class List < ActiveRecord::Base
  validates :name, presence: true, length: { in: 1 .. 20 }
  has_many :cards
  belongs_to :board
end
