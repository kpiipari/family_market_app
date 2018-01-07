class CategoriesController < ApplicationController

    def index
        @categories = Category.all 
        respond_to do |format|
            format.json { render json: @categories, each_serializer: CategorySerializer }
            format.html 
        end
    end
    
    def show
        @category = Category.find(params[:id])
        @items = @category.items
    end
end
