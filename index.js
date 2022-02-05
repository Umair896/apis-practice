import express from "express";
import bodyParser from "body-parser";

const app = express();

const todos = [
  {
    id: 1,
    text: "Learnig Node",
    completed: false,
  },
  {
    id: 2,
    text: "Learnig Redux",
    completed: true,
  },
  {
    id: 3,
    text: "Learnig TS",
    completed: true,
  },
];

//Middleware function
function logger(req, res, next) {
  console.log(`Middleware - ${req.method} ${req.path}`);
  next();
}
app.use(logger);
app.use(bodyParser.json());

// Routing Layer
// instance.httpMethod(path, callback(req, res, next))
app.get("/hello", (req, res, next) => {
  res.json({ message: "Hello World" });
});

app.get("/api/todos", (req, res, next) => {
  return res.status(200).json({
    success: true,
    error: null,
    data: {
      todos: todos,
    },
  });
});

// POST API
app.post("/api/todos", (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json({
      success: false,
      error: "Please provide the todo",
      data: null,
    });
  }

  const newTodo = {
    id: todos.length + 1,
    text: text,
    completed: false,
  };

  todos.push(newTodo);

  return res.status(201).json({
    success: true,
    error: null,
    data: {
      todo: newTodo,
    },
  });
});

// Delete API
app.delete("/api/todos", (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(500).json({
      success: false,
      error: "Please provide id",
      data: null,
    });
  }
  if (todos.length === 0) {
    return res.status(500).json({
      success: false,
      error: "No todo with this id exists",
      data: null,
    });
  }

  const findTodo = todos.findIndex((todo) => todo.id === id);
  if (findTodo === -1) {
    return res.status(500).json({
      success: false,
      error: "Please provide correct id",
      data: null,
    });
  }

  todos.splice(findTodo, 1);

  return res.status(202).json({
    success: true,
    error: null,
    data: null,
  });
});

app.listen(4000, () => console.log("Server started on port 4000"));
