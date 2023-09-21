const express = require("express")
let books = require("./booksdb.js")
let isValid = require("./auth_users.js").isValid
let users = require("./auth_users.js").users
const public_users = express.Router()

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username
    const password = req.body.password

    if (username && password) {
        users.push({ username: username, password: password })
        return res.status(200).json({ message: "User successfully registred. Now you can login" })
    }
    return res.status(404).json({ message: "Unable to register user.", data: req.body })
})

const get_all_books = async () => {
    return books
}

public_users.get("/", async function (req, res) {
    //Write your code here
    const books = await get_all_books()
    return res.status(300).json(books)
})

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    //Write your code here

    const book = books[req.params.isbn] ?? null

    return res.status(300).json(book ? book : "Not found.")
})

const get_by_author = async (author) => {
    return Object.values(books).find((book) => book.author == author) ?? null
}

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
    //Write your code here

    const book = await get_by_author(req.params.author)

    return book ? res.status(200).json(book) : res.status(200).json("Book not found.")
})

const get_by_title = async (title) => {
    return Object.values(books).find((book) => book.title == title) ?? null
}

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
    //Write your code here
    const book = await get_by_title(req.params.title)
    return book ? res.status(200).json(book) : res.status(200).json("Book not found.")
})

const get_by_isbn = async (isbn) => {
    return books[isbn] ?? null
}

//  Get book review
public_users.get("/review/:isbn", async function (req, reDs) {
    //Write your code here

    //const book = Object.values(books).find((book) => book.title == req.params.title)

    const book = await get_by_isbn(req.params.isbn)
    return res.status(300).json(book ? book.reviews : "Book not found.")
})

module.exports.general = public_users