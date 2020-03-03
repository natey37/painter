class UsersController < ApplicationController
  def index
    users = User.all 
    render json: users
  end

  def create 
    user = User.find_or_create_by(userParams)
    render json: user
  end 

  def userParams 
    params.require(:user).permit(:name)
  end
end
