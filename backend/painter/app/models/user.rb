class User < ApplicationRecord
    has_many :favorites
    has_many :paintings, through: :favorites
end
