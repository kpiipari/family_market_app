class MarketController < ApplicationController

    def index
        @categories = Category.all
    end
end
