class List < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 20, too_long: "%{count} characters is the maximum name's length" }
  has_many :cards
  belongs_to :board
end
