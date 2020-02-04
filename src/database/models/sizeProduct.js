module.exports = (sequelize, dataTypes) => {
    const sizeProduct = sequelize.define('SizeProducts', {
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
      size_id: {
              type: dataTypes.INTEGER,
              references: {
                model: 'Size', // 'Movies' would also work
                key: 'id'
          }}
          
          
      })
         
  
    sizeProduct.associate = (models) => {
      sizeProduct.belongsTo(models.Products, {
        foreignKey: 'product_id',
        
          }),
          sizeProduct.belongsTo(models.Sizes, {
        foreignKey: 'size_id',
        
          });
    }
  
    return sizeProduct;
  }
  
  