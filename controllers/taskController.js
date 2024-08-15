const db = require('../config/db');

// 获取任务
exports.getTasks = (req, res) => {
    const userId = req.query.userId;
    db.query('SELECT * FROM tasklist WHERE userId = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: '服务器错误' });
        res.json({ success: true, tasks: results });
    });
};

// 添加任务
exports.addTask = (req, res) => {
    const { task, deadline, finished, userId } = req.body;
    const query = 'INSERT INTO tasklist (task, deadline, finished, userId) VALUES (?, ?, ?, ?)';
    db.query(query, [task, deadline, finished, userId], (err, result) => {
        if (err) {
            console.error('Error message:', err.message);
            return res.status(500).json({ success: false, message: '服务器错误' });
        }
        const newTaskId = result.insertId;
        res.json({ success: true, task: { id: newTaskId, task, deadline, finished } });
    });
};

// 删除任务
exports.deleteTask = (req, res) => {
    const id = req.params.id;
    const userId = req.query.userId;
    db.query('DELETE FROM tasklist WHERE id = ? AND userId = ?', [id, userId], (err, result) => {
        if (err) {
            console.error('删除任务失败:', err);
            return res.status(500).json({ success: false, message: '服务器错误' });
        }
        res.json({ success: true });
    });
};

// 更新任务状态
exports.updateTask = (req, res) => {
    const id = req.params.id;
    const { finished } = req.body;
    db.query('UPDATE tasklist SET finished = ? WHERE id = ?', [finished, id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: '服务器错误' });
        res.json({ success: true });
    });
};
