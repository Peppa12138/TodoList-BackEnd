const bcrypt = require('bcrypt');
const db = require('../config/db');

// 登录
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: '用户名和密码都是必填的' });
    }

    try {
        const [users] = await db.promise().query('SELECT * FROM userMessage WHERE userName = ?', [username]);
        if (users.length === 0) {
            return res.json({ success: false, message: '用户名或密码错误' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.userPassword);
        if (isMatch) {
            res.json({ success: true, message: '登录成功', userId: user.id });
        } else {
            res.json({ success: false, message: '用户名或密码错误' });
        }
    } catch (error) {
        console.error('登录失败:', error);
        res.json({ success: false, message: '登录请求失败' });
    }
};

// 注册
exports.register = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.json({ success: false, message: '所有字段都是必填的' });
    }

    if (password !== confirmPassword) {
        return res.json({ success: false, message: '密码和确认密码不匹配' });
    }

    try {
        const [existingUser] = await db.promise().query('SELECT * FROM userMessage WHERE userName = ?', [username]);
        if (existingUser.length > 0) {
            return res.json({ success: false, message: '用户名已存在' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query('INSERT INTO userMessage (userName, userPassword) VALUES (?, ?)', [username, hashedPassword]);

        res.json({ success: true, message: '注册成功' });
    } catch (error) {
        console.error('注册失败:', error);
        res.json({ success: false, message: '注册请求失败' });
    }
};
