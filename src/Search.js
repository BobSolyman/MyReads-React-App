import React, { Component } from "react"
import Book from "./Book"
import * as BooksAPI from "./BooksAPI"
import { Link } from "react-router-dom"

class Search extends Component {
  state = {
    query: "",
    showingBooks: [],
    searchError: false,
  }

  updateQuery = (event) => {
    const word = event.target.value
    if (word) {
      BooksAPI.search(word.trim()).then((res) => {
        new Promise((resolve) => setTimeout(resolve, 1000))
        if (res.length > 0) {
          for (var i = 0; i < res.length; i++) {
            var found = false
            for (var j = 0; j < this.props.currentRead.length; j++) {
              if (res[i].title === this.props.currentRead[j].title) {
                res[i].shelf = this.props.currentRead[j].shelf
                found = true
                break
              }
            }
            for (j = 0; j < this.props.wantRead.length; j++) {
              if (found) {
                break
              }
              if (res[i].title === this.props.wantRead[j].title) {
                res[i].shelf = this.props.wantRead[j].shelf
                found = true
              }
            }
            for (j = 0; j < this.props.read.length; j++) {
              if (found) {
                break
              }
              if (res[i].title === this.props.read[j].title) {
                res[i].shelf = this.props.read[j].shelf
                found = true
              }
            }
            if (!found) {
              res[i].shelf = "none"
            }
          }

          this.setState({ query: word, showingBooks: res, searchError: false })
        } else {
          this.setState({
            query: word,
            showingBooks: [],
            searchError: true,
          })
        }
      })
    } else {
      this.setState({
        query: word,
        showingBooks: [],
        searchError: true,
      })
    }
    //this.props.shelfing()
    // this.setState(() => ({
    //   query: query.trimStart(),
    // }))
    // this.props.search(query)
  }

  render() {
    const { query, showingBooks } = this.state

    // const myBooks =
    //   query === ""
    //     ? []
    //     : showingBooks.filter(
    //         (b) =>
    //           b.title.toLowerCase().includes(query.toLowerCase()) ||
    //           b.authors
    //             .join()
    //             .toLowerCase()
    //             .includes(query.toLowerCase())
    //       )

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={query}
              onChange={this.updateQuery}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {!this.state.searchError ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <li key={book.id}>
                  <Book myInfo={book} moveTo={this.props.onBookShelfUpdate} />
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <h2
            style={{
              paddingTop: "50px",
              textAlign: "center",
              color: "#2e7d32",
            }}
          >
            Sorry we couldn't find your book/author
          </h2>
        )}
      </div>
    )
  }
}

export default Search
