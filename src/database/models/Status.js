module.exports = (sequelize, dataTypes) => {
	const Status = sequelize.define('Status', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	},
	{
		tableName: 'status'
	});
	
	Status.associate = (models) => {
		Status.hasMany(models.Products, {
			as: 'products',
			foreignKey: 'status_id'
			
		});
	}

	return Status;
}

