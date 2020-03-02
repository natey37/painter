# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all 
Painting.destroy_all

u1 = User.create(name: "Miles")


p1 = Painting.create(name: "The Calling", svgInner: ' <svg x="3.444427490234375" y="12.381942749023438" data-id="0"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg><svg x="12.444427490234375" y="12.381942749023438" data-id="1"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg><svg x="62.444427490234375" y="26.381942749023438" data-id="2"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg><svg x="157.44442749023438" y="29.381942749023438" data-id="3"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg><svg x="61.444427490234375" y="113.38194274902344" data-id="4"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg>', user_id: u1.id)


# " <svg x="290.33331298828125" y="273" data-id="0"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg><svg x="127.33331298828125" y="72" data-id="1"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg><svg x="502.33331298828125" y="84" data-id="2"><circle cx="50" cy="50" r="50" fill="red" data-color="rgb(255, 0, 0)"></circle></svg><svg x="96.90431994523124" y="112.57100695694999" data-id="3"><circle cx="290.42899304305" cy="290.42899304305" r="290.42899304305" fill="rgb(100, 200, 0)" data-color="rgb(100, 200, 0)"></circle></svg>"