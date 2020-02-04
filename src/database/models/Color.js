module.exports = (sequelize, dataTypes) => {
	const Color = sequelize.define('Colors', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	});

	Color.associate = (models) => {
		Color.belongsToMany(models.Products, {
			as: 'products',
			through: 'colorProducts',
			foreignKey: 'color_id',
			otherKey: 'product_id'
		});
	}

	return Color;
}