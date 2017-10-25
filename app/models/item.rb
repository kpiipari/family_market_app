class Item < ApplicationRecord
    has_many :item_tags
    has_many :tags, through: :item_tags
    has_many :users, through: :item_users
    has_many :item_users
    belongs_to :category
end
