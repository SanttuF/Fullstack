const Notification = ({ message }) => {
    if (!message) {
      return
    }
  
    const style = {
      color: 'black',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
  
  export default Notification