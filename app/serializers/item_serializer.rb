class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :category_id
  belongs_to :category, serializer: CategorySerializer
  has_many :tags
end
