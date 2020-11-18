class BookDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.selectedBook)
    return (
      <React.Fragment>
        <h1>{this.props.selectedBook.title}</h1>
        <h3>Price: {this.props.selectedBook.price}</h3>
        <h3>Quantity: {this.props.selectedBook.quantity}</h3>
        <h3>{this.props.selectedBook.discontinued ? "Discontinued" : ""}</h3>
      </React.Fragment>
    )
  }
}