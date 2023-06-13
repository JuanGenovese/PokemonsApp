require("dotenv").config();
const { getTypes } = require('./src/constrollers/typeControllers');
const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');
const port = process.env.PORT || 3001;

sequelize.sync({ 
  force: true,
  alter: false
})
.then(() => {
  server.listen(port, "0.0.0.0", () => {
    console.log('servidor correctamente activo y sincronizado con la DB');
  });
  getTypes()
});
