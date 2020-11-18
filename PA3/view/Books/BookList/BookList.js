const BookList = props => {
  const books = props.books.map(book => {
    return <BookItem
      key={book.id}
      bookid={book.id}
      title={book.title}
      price={book.price}
      quantity={book.quantity}
      discontinued={book.discontinued}
      onDetail={props.onViewDetail}
      onDelete={props.onDelete}
      onEdit={props.onEdit}
    />
  })

  return (<ul className="books__list">{books}</ul>)
}