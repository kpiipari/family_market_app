class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :category_id, :borrower_id
end
