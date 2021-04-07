import React, { Component } from "react"
import Book from "./Book"
import { Link } from "react-router-dom"

class Main extends Component {
  render() {
    const { allBooks, onBookShelfUpdate } = this.props

    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {allBooks
                    .filter((book) => book.shelf === "currentlyReading")
                    .map((b) => {
                      return (
                        <li key={b.id}>
                          <Book myInfo={b} moveTo={onBookShelfUpdate} />
                        </li>
                      )
                    })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {allBooks
                    .filter((book) => book.shelf === "wantToRead")
                    .map((b) => {
                      return (
                        <li key={b.id}>
                          <Book myInfo={b} moveTo={onBookShelfUpdate} />
                        </li>
                      )
                    })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {allBooks
                    .filter((book) => book.shelf === "read")
                    .map((b) => {
                      return (
                        <li key={b.id}>
                          <Book myInfo={b} moveTo={onBookShelfUpdate} />
                        </li>
                      )
                    })}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Main
