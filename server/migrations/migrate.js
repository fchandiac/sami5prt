'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {unique: true, type: Sequelize.STRING},
      created_at: {type: Sequelize.DATE},
      updated_at: {type: Sequelize.DATE}

    },
    {
        underscored: true,
        initialAutoIncrement: 1001, 
    }
    );
  await queryInterface.createTable('taxes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {unique: true, type: Sequelize.STRING},
        value: {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        created_at: {type: Sequelize.DATE},
        updated_at: {type: Sequelize.DATE}
      },
      {
          underscored: true,
          initialAutoIncrement: 1001
        }
      );
    await queryInterface.createTable('prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tax_id: {
        allowNull: false,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'taxes',
          key: 'id'
        }},
        sale: {type: Sequelize.INTEGER},
        created_at: {type: Sequelize.DATE},
        updated_at: {type: Sequelize.DATE}
      },
      {
          underscored: true,
          initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
      }
    );
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {unique: true, type: Sequelize.STRING},
      code: {unique: false, type: Sequelize.STRING},
      favorite: {type: Sequelize.BOOLEAN, defaultValue: false},
      ticket: {type: Sequelize.BOOLEAN, defaultValue: true},
      category_id: {
        allowNull: false,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      price_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'prices',
          key: 'id'
      }
    },
      created_at: {type: Sequelize.DATE},
      updated_at: {type: Sequelize.DATE}
    },
      {
        underscored: true,
        initialAutoIncrement: 1001 // Aparentemente solo funciona para mysql
      }
    );
    await queryInterface.createTable('sales', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        amount: {type: Sequelize.INTEGER},
        payment_method: {type: Sequelize.STRING},
        created_at: {type: Sequelize.DATE},
        updated_at: {type: Sequelize.DATE}
      },
      {
        underscored: true,
        initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
    });

    await queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'products',
          key: 'id'
      }},
      room: {type: Sequelize.INTEGER, default: 0},
      warehouse: {type: Sequelize.INTEGER, default: 0},
      created_at: {type: Sequelize.DATE},
      updated_at: {type: Sequelize.DATE}
    },
    {
      underscored: true,
      initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
  });
    await queryInterface.createTable('salesdetails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        sale_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'sales',
            key: 'id'
        }},
        price_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'prices',
            key: 'id'
        }},
        product_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'products',
            key: 'id'
        }},
        category_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'categories',
            key: 'id'
          }
        },
        quanty: {type: Sequelize.FLOAT},
        subtotal: {type: Sequelize.INTEGER},
        created_at: {type: Sequelize.DATE},
        updated_at: {type: Sequelize.DATE}
      },
      {
        underscored: true,
        initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
      });

     

      await queryInterface.createTable('orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        delivery:{type: Sequelize.BOOLEAN, defaultValue: false},
        state: {type: Sequelize.BOOLEAN, defaultValue: false},
        printed: {type: Sequelize.BOOLEAN, defaultValue: false},
        table: {type: Sequelize.INTEGER},
        note: {type: Sequelize.STRING},
        created_at: {type: Sequelize.DATE},
        updated_at: {type: Sequelize.DATE}
      },
      {
        underscored: true,
        initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
    }),
    await queryInterface.createTable('deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'orders',
          key: 'id'
      }},
      phone: {type: Sequelize.STRING},
      transfer: {type: Sequelize.BOOLEAN},
      address: {type: Sequelize.STRING},
      created_at: {type: Sequelize.DATE},
      updated_at: {type: Sequelize.DATE}
    }),

      await queryInterface.createTable('ordersdetails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        order_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'orders',
            key: 'id'
        }},
        product_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'products',
            key: 'id'
        }},
        quanty: {type: Sequelize.FLOAT},
        created_at: {type: Sequelize.DATE},
        updated_at: {type: Sequelize.DATE}
      },

      {
        underscored: true,
        initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
    })

  },
  
//res.id, res.name, price, quanty, subtotal, tax_id
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables() 
  }
};



