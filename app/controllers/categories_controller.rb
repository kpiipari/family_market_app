class CategoriesController < ApplicationController
    before_action :authenticate_user!, :except => [:show, :index]

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
        respond_to do |format|
            format.json { render json: @items }
            format.html { render :show }
        end
    end
end
