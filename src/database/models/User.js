module.exports = (sequelize, dataTypes) => {
	const User = sequelize.define('Users', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: dataTypes.STRING,
		last_name: dataTypes.STRING,
        email: dataTypes.STRING,
        date:dataTypes.DATE,
        city: dataTypes.STRING,
        avatar: dataTypes.STRING,
        country_id: dataTypes.INTEGER,
		password: dataTypes.STRING,
		role: dataTypes.STRING
		
	});
    User.associate = (models) => {
        User.belongsTo(models.Countries, {
			as: 'country',
			foreignKey: 'country_id'
        });
        
	}


	return User;
}