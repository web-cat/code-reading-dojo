# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
t=""
l=1
Dir['/Users/zahra/Documents/workspace/Final/*'].each do |fname|
  s = ""
  File.open(fname, "r") do |f|
    f.each_line do |line|
      s += line
      s += " "
    end
  end
  Program.create(code: s, difficulty:"beginner", level:l.to_s, errorindexes:"1 2 3")
  l += 1
end

user = User.create(username:"zahra", levelcompleted:"1")
