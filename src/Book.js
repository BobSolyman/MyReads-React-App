import React, { Component } from "react"

class Book extends Component {
  render() {
    const { moveTo, myInfo } = this.props
    return (
      <div className="book">
        <div className="book-top">
          {myInfo.imageLinks ? (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${myInfo.imageLinks.thumbnail})`,
              }}
            />
          ) : (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                  "https://books.google.com.eg/googlebooks/images/no_cover_thumb.gif",
              }}
            />
          )}
          <div className="book-shelf-changer">
            <select
              value={myInfo.shelf}
              onChange={(e) => moveTo(myInfo, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{myInfo.title}</div>
        <div className="book-authors">{myInfo.authors || "unknown"}</div>
      </div>
    )
  }
}

export default Book
