class Employee < User
  before_create :set_admin_flag

  private

  def set_admin_flag
    puts "//////////////////////////////////////////7"
    puts Employee.count.zero?
    self.admin = Employee.count.zero? if admin.nil?

    puts self.admin
    puts "--------------------------------------"
    self.admin = true if admin.nil?
    puts self.admin
  end
end
