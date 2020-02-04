module.exports = (sequelize, dataTypes) => {
	const Country = sequelize.define('Countries', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	});

	
Country.associate = (models) => {
    Country.hasMany(models.Users, {
        as: 'users',
        foreignKey: 'country_id'
    });
}
return Country;
}
