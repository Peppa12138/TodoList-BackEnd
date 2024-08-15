// // server.js
// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');

// const app = express();
// const port = 5002;
// app.use(cors());
// // 设置中间件
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // 创建数据库连接
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin123',
//     database: 'todo-user'
// });

// db.connect(err => {
//     if (err) {
//         console.error('数据库连接失败:', err);
//         process.exit(1);
//     }
//     console.log('数据库连接成功');
// });


// // 登录接口
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.json({ success: false, message: '用户名和密码都是必填的' });
//     }

//     try {
//         // 查找用户
//         const [users] = await db.promise().query('SELECT * FROM userMessage WHERE userName = ?', [username]);
//         if (users.length === 0) {
//             return res.json({ success: false, message: '用户名或密码错误' });
//         }

//         const user = users[0];
//         // 比较密码
//         const isMatch = await bcrypt.compare(password, user.userPassword);
//         if (isMatch) {
//             res.json({ success: true, message: '登录成功', userId: user.id });
//         } else {
//             res.json({ success: false, message: '用户名或密码错误' });
//         }
//     } catch (error) {
//         console.error('登录失败:', error);
//         res.json({ success: false, message: '登录请求失败' });
//     }
// });


// app.post('/register', async (req, res) => {
//     const { username, password, confirmPassword } = req.body;

//     if (!username || !password || !confirmPassword) {
//         return res.json({ success: false, message: '所有字段都是必填的' });
//     }

//     if (password !== confirmPassword) {
//         return res.json({ success: false, message: '密码和确认密码不匹配' });
//     }

//     try {
//         // 检查用户是否已存在
//         const [existingUser] = await db.promise().query('SELECT * FROM userMessage WHERE userName = ?', [username]);
//         if (existingUser.length > 0) {
//             return res.json({ success: false, message: '用户名已存在' });
//         }

//         // 加密密码
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // 插入新用户
//         await db.promise().query('INSERT INTO userMessage (userName, userPassword) VALUES (?, ?)', [username, hashedPassword]);

//         res.json({ success: true, message: '注册成功' });
//     } catch (error) {
//         console.error('注册失败:', error);
//         res.json({ success: false, message: '注册请求失败' });
//     }
// });


// // 获取任务
// app.get('/tasks', (req, res) => {
//     const userId = req.query.userId;
//     db.query('SELECT * FROM tasklist WHERE userId = ?', [userId], (err, results) => {
//         if (err) return res.status(500).json({ success: false, message: '服务器错误' });
//         res.json({ success: true, tasks: results });
//     });
// });

// // 添加任务
// app.post('/tasks', (req, res) => {
//     const { task, deadline, finished, userId } = req.body;
//     const query = 'INSERT INTO tasklist (task, deadline, finished, userId) VALUES (?, ?, ?, ?)';
//     db.query(query, [task, deadline, finished, userId], (err, result) => {
//         if (err) {
//             console.error('Error message:', err.message);
//             return res.status(500).json({ success: false, message: '服务器错误' });
//         }
//         const newTaskId = result.insertId; // 获取新任务的 id
//         res.json({ success: true, task: { id: newTaskId, task, deadline, finished } });
//         // res.json({ success: true });
//     });
// });

// // 删除任务
// app.delete('/tasks/:id', (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     const userId = req.query.userId;
//     db.query('DELETE FROM tasklist WHERE id = ? AND userId = ?', [id, userId], (err, result) => {
//         if (err) {
//             console.error('删除任务失败:', err);
//             return res.status(500).json({ success: false, message: '服务器错误' });
//         }
//         res.json({ success: true });
//     });
// });

// // 更新任务状态
// app.put('/tasks/:id', (req, res) => {
//     const id = req.params.id;
//     // const userId = req.query.userId;
//     const { finished } = req.body;
//     db.query('UPDATE tasklist SET finished = ? WHERE id = ?', [finished, id], (err, result) => {

//         if (err) return res.status(500).json({ success: false, message: '服务器错误' });
//         res.json({ success: true });
//     });
// });

// // 启动服务器
// app.listen(port, () => {
//     console.log(`服务器正在监听 http://localhost:${port}`);
// });


// server/server.js
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
