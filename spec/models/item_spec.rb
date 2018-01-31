require 'rails_helper'

RSpec.describe Item, :type => :model do
    before do
        @item = Item.new(title: "Night lamp", description: "White night shade")
        Category.first.items << @item
    end

    it 'belongs to a category' do
        expect(@item.category).to eq(Category.first)
    end
end