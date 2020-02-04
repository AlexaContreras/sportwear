module.exports = (sequelize, dataTypes) => {
	const Brand = sequelize.define('Brands', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	});


Brand.associate = (models) => {
    Brand.hasMany(models.Products, {
        as: 'products',
        foreignKey: 'brand_id'
    });
}

return Brand;
}