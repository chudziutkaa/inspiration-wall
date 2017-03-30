class User < ActiveRecord::Base
  has_secure_password

  before_save :downcase

  validates_presence_of :username
  validates_uniqueness_of :username, case_sensitive:false
  
  validates_presence_of :email
  validates_uniqueness_of :email, case_sensitive: false
  validates_format_of :email, with: /@/

  has_many :boards

  private

  def downcase
    self.username = self.username.delete(' ').downcase
    self.email = self.email.delete(' ').downcase
  end
end
