var express = require('express');
var router = express.Router();

function genId(num) {
  const source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let index = 0; index < num; index++) {
    const rand = parseInt(Math.random() * 61)
    result += source[rand]
  }
  return result
}

router.get('/aaa', function (req, res, next) {
  res.status(200).send(genId(6))
});

const books = [
  {
    id: 1,
    name: "Toán lớp 1"
  },
  {
    id: 2,
    name: "Tiếng Việt lớp 1"
  },
  {
    id: 3,
    name: "Đạo đức lớp 1"
  }
]

/* GET books listing. */
router.get('/', function (req, res, next) {
  res.status(200).send(books.filter(book => !book.isDeleted))
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const book = books.filter(x => x.id == id)[0];
  if (book)
    res.status(200).send(book)
  else
    res.status(404).send({
      isSuccess: false,
      message: 'Not found'
    })
});

router.post('/', function (req, res, next) {
  if (req.body.id) {
    const book = books.find(x => req.body.id == x.id)
    if (book) {
      res.status(400).send({
        isSuccess: false,
        message: 'Id already exists'
      })
    } else {
      const newBook = {
        id: req.body.id,
        name: req.body.name
      }
      books.push(newBook)
      res.send(newBook)
    }
  }
  else {
    res.status(400).send({
      isSuccess: false,
      message: 'Data invalid'
    })
  }
})

router.put('/:id', function (req, res, next) {
  const book = books.find(x => x.id == req.params.id)
  if (book) {
    book.name = req.body.name;
    res.send()
  }
  else {
    res.status(404).send({
      isSuccess: false,
      message: 'Not found'
    })
  }
})

router.delete('/:id', function (req, res, next) {
  const book = books.find(x => x.id == req.params.id)
  if (book) {
    // const index = books.indexOf(book)
    // books.splice(index, 1)
    book.isDeleted = true
    res.send(book)
  }
  else {
    res.status(404).send({
      isSuccess: false,
      message: 'Not found'
    })
  }
})

// router.use('/users', require('./users'));

module.exports = router;
