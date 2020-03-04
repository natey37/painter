class PaintingsController < ApplicationController
  
  def index
    paintings = Painting.all 
    render json: paintings.to_json(include: [:favorites, :user])
  end

  def create 
    painting = Painting.create(paintingParams)
    render json: painting
  end 

  def show 
    painting = Painting.find(params[:id])
    render json: painting
  end 

  def destroy 
    painting = Painting.find(params[:id])
    painting.delete()
  end 

  private 

  def paintingParams 
    params.require(:painting).permit(:name, :svgInner, :background_color, :user_id)
  end 

end
