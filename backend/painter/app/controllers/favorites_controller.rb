class FavoritesController < ApplicationController

    def index
        favorites = Favorite.all 
        render json: favorites
      end
    
      def create 
        favorite = Favorite.create(favoritesParams)
        render json: favorite
      end 
    
      def show 
        favorite = Favorite.find(params[:id])
        render json: favorite
      end 
    
      def destroy 
        favorite = Favorite.find(params[:id])
        favorite.delete()
      end 
    
      private 
    
      def favoritesParams 
        params.require(:favorite).permit(:user_id, :painting_id)
      end 

end
