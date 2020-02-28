class PaintingsController < ApplicationController
  
  def index
    paintings = Painting.all 
    render json: paintings
  end

  def create 
    painting = Painting.create(paintingParams)
    render json: painting
  end 

  def paintingParams 
    params.require(:painting).permit(:name, :svgInner, :user_id)
  end 

end
