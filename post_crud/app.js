const express = require('express');
const app = express();
const router = require("./routes");
const { sequelize } = require("./models");
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use('/', router);

sequelize.sync({ force: false })
    .then(() => {
        console.log('db 연동 성공')
    })
    .catch((err) => {
        console.error(err)
    })

app.listen(PORT, () => {
    console.log(PORT, "번에서 대기 중")
})