const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.config');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/v1/users', require('./src/routes/user.routes'));
app.use('/api/v1/articles', require('./src/routes/article.routes'));
app.use('/api/v1/slider', require('./src/routes/slider.routes'));

app.listen(3030, async() => {
    try {
        console.clear();
        await sequelize.authenticate();
        console.log("API started on port 3030.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
})