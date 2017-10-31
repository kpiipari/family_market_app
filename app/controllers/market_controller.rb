class MarketController < ApplicationController

    def index
        @categories = Category.all
        @items = Item.by_status('free')
        @tags = Tag.all.uniq
    end
end
