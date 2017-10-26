categories_list = ["bedding", "bathing & changing", "car seats", "carriers", "clothing", "feeding", "furniture", "maternity", "pushchairs", "toys"]

categories_list.each do |category|
    Category.find_or_create_by(name: category)
end