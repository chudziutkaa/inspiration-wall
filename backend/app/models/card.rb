class Card < ActiveRecord::Base
  validates :title, presence: true
  validates :description, length: {in: 5 .. 50}, allow_blank: true
  belongs_to :list
end
