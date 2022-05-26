const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

pp.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
