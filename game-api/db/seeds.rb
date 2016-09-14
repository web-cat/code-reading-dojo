# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
t=""
l=1
error=""
Dir['/Users/zahra/Documents/workspace/Final/1/*'].each do |fname|
  s = ""
  File.open(fname, "r") do |f|
    lineNum=1
    f.each_line do |line|
      if (lineNum==1)
        error+=line
      else
        s += line
        s += " "
      end
      lineNum+=1
    end
  end
  Program.create(code: s, difficulty:"beginner", level:l.to_s, errorindexes:error)
  l += 1
end

t=""
l=1
error = ""
Dir['/Users/zahra/Documents/workspace/Final/2/*'].each do |fname|
  s = ""
  File.open(fname, "r") do |f|
    lineNum=1
    f.each_line do |line|
      if (lineNum==1)
        error+=line
      else
        s += line
        s += " "
      end
      lineNum+=1
    end
  end
  Program.create(code: s, difficulty:"intermediate", level:l.to_s, errorindexes:error)
  l += 1
end

t=""
l=1
error = ""
Dir['/Users/zahra/Documents/workspace/Final/3/*'].each do |fname|
  s = ""
  File.open(fname, "r") do |f|
    lineNum=1
    f.each_line do |line|
      if (lineNum==1)
        error+=line
      else
        s += line
        s += " "
      end
      lineNum+=1
    end
  end
  Program.create(code: s, difficulty:"advanced", level:l.to_s, errorindexes:error)
  l += 1
end

user = User.create(username:"zahra", levelcompleted:"1")
