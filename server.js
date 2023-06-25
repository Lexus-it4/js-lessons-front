
const cors = require('cors');
const express = require('express');
const port = 3100;
// Подключение к базе данных
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ToDo.db');
const app = express();
app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Метод - GET /sum
app.get('/sum', (req, res) => {
  if (typeof req.body.a == "number" && typeof req.body.b == "number") {
    let sum = req.body.a + req.body.b;
    res.json({sum});
  } else {
    res.json({message: 'error'});
  }
});


// Метод - POST /reverse-case
app.post('/reverse-case', (req, res) => {
  let string = req.body.string;
  let new_string = "";
  for (let i = 0; i < string.length; i++){
    if (string[i] === string[i].toUpperCase()) {
      new_string += string[i].toLowerCase();
    } else {
      new_string += string[i].toUpperCase();
    }
  }
  res.json({new_string});
})

// Метод - PUT /obj-to-array
app.put('/obj-to-array', (req, res) => {
  let object = req.body;
  let mas = Object.entries(object);
  res.json({mas});
})


// Метод - PATCH /reverse-array
app.patch('/reverse-array', (req, res) => {
  let mas = req.body;
  mas.reverse();
  res.json({mas});
})


// Метод - DELETE /duplicates
app.delete('/duplicates', (req, res) => {
  let mas = Array.from(new Set(req.body));
  res.json({mas});
})


//Блок кода с БД

// Создание таблицы ToDo
db.run(`CREATE TABLE IF NOT EXISTS ToDo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  isDone INTEGER DEFAULT 0
)`);

// Создание новой задачи
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  const sql = `INSERT INTO ToDo (title, description) VALUES (?, ?)`;
  db.run(sql, [title, description], (err) => {
    if (err) {
      console.log(JSON.stringify({error:err}));
    }else{
      console.log('Task added successfully');
      res.send('Task added successfully');
    }
    
  });
});

// Получение списка задач
app.get('/api/todos', (req, res) => {
  const sql = `SELECT * FROM ToDo`;
  db.all(sql, (err, rows) => {
    if (err){
      console.log(JSON.stringify({error:err}));
    }else{
      res.send(rows);
    }
  });
});

// Получение задачи по id
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM ToDo WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.log(JSON.stringify({error:err}));
    }else{
      res.send(row);
    }
  });
});

// Изменение задачи
app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, isDone } = req.body;
  const sql = `UPDATE ToDo SET title = ?, description = ?, isDone = ? WHERE id = ?`;
  db.run(sql, [title, description, isDone, id], (err) => {
    if (err) {
      console.log(JSON.stringify({error:err}));
    }else{
      console.log('Task updated successfully');
      res.send('Task updated successfully');
    }
  });
});

// Удаление задачи
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM ToDo WHERE id = ?`;
  db.run(sql, [id], (err) => {
    if (err) {
      console.log(JSON.stringify({error:err}));
    }else{
      console.log('Task added successfully');
      res.send('Task added successfully');
    }
    }); 
});

// Удалить все ToDo
app.delete('/api/todos/', (req, res) => {
  const sql = `DELETE FROM ToDo`;
  db.run(sql, (err) => {
    if (err) {
      console.log(JSON.stringify({error:err}));
    }else{
      console.log('Task deleted successfully');
      res.send('Task deleted successfully');
    }
  });
});
