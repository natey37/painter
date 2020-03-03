class User < ApplicationRecord
    has_many :favorites

    def my_paintings 
        Painting.all.select do |p|
            p.user_id == self.id
        end 
    end 
   
end
