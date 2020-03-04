class UsersController < ApplicationController
  def index
    users = User.all 
    render json: users.to_json(include: [:favorites])
  end

  def create 
    user = User.find_or_create_by(userParams)
    render json: user
  end 

  def show 
    user = User.find(params[:id])
    render json: user.my_paintings
  end 

  private 

  def userParams 
    params.require(:user).permit(:name)
  end

end
