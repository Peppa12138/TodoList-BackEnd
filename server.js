const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 5002;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/', taskRoutes);

app.listen(port, () => {
    console.log(`服务器正在监听 http://localhost:${port}`);
});
