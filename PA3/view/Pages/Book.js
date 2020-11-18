const rootElement = document.getElementById('root');

class BookPage extends React.Component {
  state = {
    creating: false,
    editing: false,
    books: [],
    isLoading: false,
    selectedBook: null,
    viewDetails: false
  }

  constructor(props) {
    super(props)
    this.titleEl = React.createRef()
    this.priceEl = React.createRef()
    this.quantityEl = React.createRef()
    this.discontinuedEl = React.createRef()
  }

  componentDidMount() {
    this.fetchBooks()
  }

  startCreateBookHandler = () => {
    this.setState({ creating: true })
  }

  modalCreateConfirmHandler = () => {
    this.setState({ creating: false })
    const title = this.titleEl.current.value
    const price = this.priceEl.current.value
    const quantity = this.quantityEl.current.value

    if (title.trim().length === 0 || price <= 0 || quantity < 0) return

    const book = { title, price, quantity }
    const body = {
      action: "addBook",
      title: book.title,
      price: book.price,
      quantity: book.quantity
    }
    fetch('http://localhost/isp/pa3/controller/Controller.php', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.error) {
          console.log(resData.err)
          return
        }
        this.setState(prevState => {
          const updatedBook = [...prevState.books]
          updatedBook.push({
            id: resData.id,
            title: resData.title,
            price: resData.price,
            quantity: resData.quantity,
            discontinued: resData.discontinued
          })
          return { books: updatedBook }
        })
      })
      .catch(err => console.log(err))

  }

  modalCreateCancelHandler = () => {
    this.setState({ creating: false, selectedBook: null })
  }

  startEditBookHandler = bookid => {
    console.log(bookid)
    this.setState(prevState => {
      const selectedBook = prevState.books.find(e => e.id == bookid)
      return { creating: false, editing: true, selectedBook: selectedBook }
    })
  }

  modalEditConfirmHandler = () => {
    const title = this.titleEl.current.value
    const price = this.priceEl.current.value
    const quantity = this.quantityEl.current.value
    const discontinued = this.discontinuedEl.current.checked

    console.log(discontinued)

    if (title.trim().length === 0 || price <= 0 || quantity < 0) return

    const body = {
      action: "updateBook",
      bookid: this.state.selectedBook.id,
      title: title,
      price: price,
      quantity: quantity,
      discontinued: discontinued ? 1 : 0
    }
    fetch('http://localhost/isp/pa3/controller/Controller.php', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.error) {
          console.log(resData.error)
          return
        }
        this.setState(prevState => {
          const updatedBook = [...prevState.books]
          updatedBook[updatedBook.indexOf(updatedBook.find(e => e.id === prevState.selectedBook.id))] = {
            id: resData.id,
            title: resData.title,
            price: resData.price,
            quantity: resData.quantity,
            discontinued: resData.discontinued
          }
          return { books: updatedBook, editing: false, selectedBook: null }
        })
      })
      .catch(err => console.log(err))
  }

  modalEditCancelHandler = () => {
    this.setState({ editing: false, viewDetails: false, selectedBook: null })
  }

  showDetailHandler = bookid => {
    this.setState(prevState => {
      const selectedBook = prevState.books.find(e => e.id == bookid)
      return { selectedBook: selectedBook, viewDetails: true }
    })
  }

  deleteBookHandler = bookid => {
    const selectedBook = this.state.books.find(e => e.id == bookid)
    fetch('http://localhost/isp/pa3/controller/Controller.php', {
      method: 'POST',
      body: JSON.stringify({
        action: "deleteBook",
        bookid: selectedBook.id
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json()).then(json => {
      if (json.success) {
        this.setState(prevState => {
          const updatedBook = prevState.books.filter(item => item.id !== bookid)
          return { books: updatedBook, editing: false, creating: false, selectedBook: null }
        })
      }
    })
  }

  switchToEdit = () => {
    this.setState({ editing: true })
  }

  fetchBooks() {
    this.setState({ isLoading: true })
    fetch('http://localhost/isp/pa3/controller/Controller.php', {
      method: 'POST',
      body: JSON.stringify({
        action: "getBooks",
        options: {}
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json()).then(json => {
      this.setState({ books: json, isLoading: false })
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="books-control">
          <h1>Book Manager</h1>
          <button className="btn" onClick={this.startCreateBookHandler}>Add Book</button>
        </div>
        {(this.state.creating || this.state.editing || this.state.selectedBook) && <Backdrop />}
        {
          this.state.creating &&
          <Modal
            title="Add Book"
            canCancel
            canConfirm
            onCancel={this.modalCreateCancelHandler}
            onConfirm={this.modalCreateConfirmHandler}
            ConfirmText="Save"
            CancelText="Cancel"
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleEl}></input>
              </div>
              <div className="form-control">
                <label htmlFor="title">Price</label>
                <input type="number" id="price" ref={this.priceEl}></input>
              </div>
              <div className="form-control">
                <label htmlFor="title">Quantity</label>
                <input type="text" id="quantity" ref={this.quantityEl}></input>
              </div>
            </form>
          </Modal>
        }
        {
          (this.state.editing && this.state.selectedBook) &&
          <Modal
            title="Edit Book"
            canCancel
            canConfirm
            onCancel={this.modalEditCancelHandler}
            onConfirm={this.modalEditConfirmHandler}
            ConfirmText="Save"
            CancelText="Cancel"
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleEl} defaultValue={this.state.selectedBook.title}></input>
              </div>
              <div className="form-control">
                <label htmlFor="title">Price</label>
                <input type="number" id="price" ref={this.priceEl} defaultValue={this.state.selectedBook.price}></input>
              </div>
              <div className="form-control">
                <label htmlFor="title">Quantity</label>
                <input type="text" id="quantity" ref={this.quantityEl} defaultValue={this.state.selectedBook.quantity}></input>
              </div>
              <div className="form-control">
                <label htmlFor="title">Discontinued</label>
                <input type="checkbox" id="discontinued" ref={this.discontinuedEl} defaultChecked={this.state.selectedBook.discontinued}></input>
              </div>
            </form>
          </Modal>
        }
        {(this.state.selectedBook && this.state.viewDetails) &&
          <Modal
            title="Book Details"
            canCancel
            onCancel={this.modalEditCancelHandler}
            CancelText="X"
          >
            <BookDetails isEditing={this.state.isEditing} selectedBook={this.state.selectedBook} editHandler={this.startEditBookHandler} update={this.editBookHandler} />
          </Modal>
        }
        {
          this.state.isLoading ?
            <Spinner />
            :
            <BookList books={this.state.books} onDelete={this.deleteBookHandler} onEdit={this.startEditBookHandler} onViewDetail={this.showDetailHandler} />
        }
      </React.Fragment>
    )
  }
}

function App() {
  return (
    <div>
      <Test />
    </div>
  )
}