    module.exports = function(sequelize, DataTypes) {
    const Wishlist = sequelize.define("Wishlist", {
      // The email cannot be null, and must be a proper email before creation
      card_img: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false
      },
      page_count: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    });
    Wishlist.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Wishlist.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Wishlist;
  };
  