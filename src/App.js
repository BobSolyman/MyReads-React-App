import React from "react"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import Search from "./Search"
import Main from "./Main"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    currentRead: [],
    wantRead: [],
    read: [],
    none: [],
  }

  shelfing = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    this.setState({
      currentRead: this.state.books.filter(
        (book) => book.shelf === "currentlyReading"
      ),
    })
    this.setState({
      wantRead: this.state.books.filter((book) => book.shelf === "wantToRead"),
    })
    this.setState({
      read: this.state.books.filter((book) => book.shelf === "read"),
    })
    this.setState({
      none: this.state.books.filter((book) => book.shelf === "none"),
    })
  }

  componentDidMount() {
    this.shelfing()
  }

  updateBook = (b, s) => {
    BooksAPI.update(b, s).then((books) => {
      this.shelfing()
    })
  }

  // search = (query) => {
  //   BooksAPI.search(query).then((res) => {
  //     this.shelfing()
  //   })
  //   console.log(this.state.none)
  // }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Main
                  allBooks={this.state.books}
                  onBookShelfUpdate={this.updateBook}
                />
              )}
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  allBooks={this.state.books}
                  currentRead={this.state.currentRead}
                  wantRead={this.state.wantRead}
                  read={this.state.read}
                  search={this.search}
                  onBookShelfUpdate={this.updateBook}
                  shelfing={this.shelfing}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
