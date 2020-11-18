class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal">
        <header className="modal__header">
          <h1>{this.props.title}</h1>
        </header>
        <section className="modal__content">
          {this.props.children}
        </section>
        <section className="modal__actions">
          {this.props.canCancel && <button className="btn" onClick={this.props.onCancel}>{this.props.CancelText}</button>}
          {this.props.canConfirm && <button className="btn" onClick={this.props.onConfirm}>{this.props.ConfirmText}</button>}
        </section>
      </div>
    )
  }
}