module.exports = (sequelize, dataTypes) => {
  const ColorProduct = sequelize.define('ColorProducts', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: dataTypes.INTEGER,
        references: {
          model: 'Product', // 'Movies' would also work
          key: 'id'
    }},
    color_id: {
            type: dataTypes.INTEGER,
            references: {
              model: 'Color', // 'Movies' would also work
              key: 'id'
        }}
        
        
    })
       

  ColorProduct.associate = (models) => {
    ColorProduct.belongsTo(models.Products, {
      foreignKey: 'product_id',
      
        }),
        ColorProduct.belongsTo(models.Colors, {
      foreignKey: 'color_id',
      
        });
  }

  return ColorProduct;
}

