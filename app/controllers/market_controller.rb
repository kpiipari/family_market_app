class MarketController < ApplicationController

    def index
        @categories = Category.all
        @items = Item.by_status('free')
    end
end
