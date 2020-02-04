module.exports = (sequelize, dataTypes) => {
	const Product = sequelize.define('Products', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
        price: dataTypes.INTEGER,
        description: dataTypes.STRING,
        avatar: dataTypes.STRING,
        category_id: dataTypes.INTEGER,
        status_id: dataTypes.INTEGER,
        type_id: dataTypes.INTEGER,
		brand_id: dataTypes.INTEGER,
	});

	Product.associate = (models) => {
        Product.belongsTo(models.Categories, {
			as: 'category',
			foreignKey: 'category_id'
        });
        Product.belongsTo(models.Status, {
			as: 'status',
			foreignKey: 'status_id'
        });
        Product.belongsTo(models.Types, {
			as: 'type',
			foreignKey: 'type_id'
		});
		Product.belongsTo(models.Brands, {
			as: 'brand',
			foreignKey: 'brand_id'
		});
		Product.belongsToMany(models.Colors, {
			as: 'colors',
			through: 'colorProducts',
			foreignKey: 'product_id',
			otherKey: 'color_id'
        });
        Product.belongsToMany(models.Sizes, {
			as: 'sizes',
			through: 'sizeProducts',
			foreignKey: 'product_id',
			otherKey: 'size_id'
		});
	}

	return Product;
}