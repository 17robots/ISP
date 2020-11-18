const BookItem = props => (
  <li key={props.id} className="books__list-item">
    <h1>{props.title}</h1>
    <button className="btn" onClick={props.onDetail.bind(this, props.bookid)}>View Details</button>
    <button className="btn" onClick={props.onDelete.bind(this, props.bookid)}>Delete</button>
    <button className="btn" onClick={props.onEdit.bind(this, props.bookid)}>Edit</button>
  </li>
)