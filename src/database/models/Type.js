module.exports = (sequelize, dataTypes) => {
	const Type = sequelize.define('Types', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	});


Type.associate = (models) => {
    Type.hasMany(models.Products, {
        as: 'products',
        foreignKey: 'type_id'
    });
}

return Type;
}