const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');


sequelize.sync({ 
  force: true,
})
.then(() => {
  server.listen(3001, () => {
    console.log('servidor correctamente activo y sincronizado con la DB');
  });
});
