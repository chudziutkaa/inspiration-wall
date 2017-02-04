class Board < ActiveRecord::Base
  validates :title, presence: true, length: { in: 1 .. 10 }
  has_many :lists
end
