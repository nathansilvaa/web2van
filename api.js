const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3030;

const db = new sqlite3.Database('./consultorio.db');


db.run(`
  CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY,
    paciente TEXT NOT NULL,
    medico TEXT NOT NULL,
    dataHora DATETIME NOT NULL
  )
`);

app.use(express.json());
app.use(cors());


app.get('/api/agendamentos', (req, res) => {
  db.all('SELECT * FROM agendamentos', (error, rows) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(rows);
  });
});


app.post('/api/agendamentos', (req, res) => {
  const { paciente, medico, dataHora } = req.body;
  if (!paciente || !medico || !dataHora) {
    return res.status(400).json({ error: "Paciente, médico e data/hora são obrigatórios." });
  }

  const stmt = db.prepare('INSERT INTO agendamentos (paciente, medico, dataHora) VALUES (?, ?, ?)');
  stmt.run(paciente, medico, dataHora, function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Agendamento criado com sucesso', id: this.lastID });
  });
});


app.delete('/api/agendamentos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM agendamentos WHERE id = ?', id, function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }
    res.json({ message: 'Agendamento cancelado com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

