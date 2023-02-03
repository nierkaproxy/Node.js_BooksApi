const express = require("express");
const app = express();

app.use(express.json());

console.log("Starting..");

const books = [
  {
    id: 1,
    title: "12 Rules for life",
    description:
      " 12 Rules For Life is a story-based, stern yet entertaining self-help manual for young people laying out a set of simple rules to help us become more disciplined, behave better, act with integrity, and balance our lives while enjoying them as much as we can.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    description:
      "Atomic Habits is the definitive guide to breaking bad behaviors and adopting good ones in four steps, showing you how small, incremental, everyday routines compound into massive, positive change over time",
  },
  {
    id: 3,
    title: "The Art of War",
    description:
      "The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu, is composed of 13 chapters.",
  },
];

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const my_book = books.find(book => book.id === parseInt(req.params.id));
  if (!my_book) res.status(404).send("not found");
  res.send(my_book);
});

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.post("/api/books", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  books.push(book);
  res.send(books);
});

app.put("/api/books/:id", (req, res) => {
  const my_book = books.find(book => book.id === parseInt(req.params.id));
  if (!my_book) res.status(404).send("not found");

  my_book.title = req.body.title;
  my_book.description = req.body.description;
  res.send(my_book);
});

app.delete("/api/books/:id", (req, res) => {
  const my_book = books.find(book => book.id === parseInt(req.params.id));
  if (!my_book) res.status(404).send("not found");

  const book_index = books.indexOf(my_book);
  books.splice(book_index, 1);

  res.send(my_book);
});
