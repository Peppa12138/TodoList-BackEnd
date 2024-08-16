# ToDoList Backend

这是一个用于 ToDoList 应用程序的后端项目，提供了任务管理的 API 接口，包括用户注册、登录、任务的增加删除等功能。该项目使用了 Node.js 和 Express 框架，并通过 MySQL 数据库来存储数据。

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [安装与运行](#安装与运行)
- [贡献](#贡献)
- [许可证](#许可证)

## 项目概述

ToDoList Backend 是一个 RESTful API 服务，支持以下功能：

- 任务的创建、读取、更新和删除（CRUD 操作）
- 每个用户的任务列表是私密的，只有登录用户可以查看和管理自己的任务

## 技术栈

- **Node.js**: JavaScript 运行时环境
- **Express**: 基于 Node.js 的 Web 应用框架
- **MySQL**: 关系型数据库管理系统

## 环境要求

在运行此项目之前，请确保您的系统已安装以下环境：

- Node.js (>=14.x)
- MySQL (>=8.x)

## 安装与运行

1. **克隆仓库**

   ```bash
   git clone https://github.com/Peppa12138/TodoList-BackEnd.git
   cd TodoList-BackEnd
   ```

2. **安装依赖**

   使用 npm 或 yarn 安装项目所需的依赖：

   ```bash
   npm install
   ```

3. **启动服务器**

   ```bash
   node server.js
   ```

## 贡献

欢迎贡献者提交 pull request。如果你发现了问题或有改进建议，请在 GitHub 上创建 issue。

## 许可证

此项目使用 MIT 许可证。详情请参阅 [LICENSE 文件](LICENSE)。
