# API - Gerenciador de Tarefas

## Instalação

Baixar o repositório do Git
```
git clone https://github.com/vaneves/webdev-2023-2-api-task.git backend
```

Acessar a pasta do backend
```
cd backend
```

Instalar as dependências
```
npm install
```

Iniciar o servidor
```
npm start
```


## Rotas


| Verbo | Rota                                  | Descrição                        | Payload                       |
|-------|---------------------------------------|----------------------------------|-------------------------------|
| GET   | http://localhost:3030/api/tarefas     | Lista todas as tarefas           | Sem                           |
| POST  | http://localhost:3030/api/tarefas     | Adiciona uma nova tarefas        | `{"nome": "nome da tarefas"}` |
| PATCH | http://localhost:3030/api/tarefas/:id | Marcar uma tarefa como concluída | `{"concluida": 1}`            |