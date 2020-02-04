module.exports = (sequelize, dataTypes) => {
	const Category = sequelize.define('Categories', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	});

	
Category.associate = (models) => {
    Category.hasMany(models.Products, {
        as: 'products',
        foreignKey: 'category_id'
    });
}
return Category;
}
