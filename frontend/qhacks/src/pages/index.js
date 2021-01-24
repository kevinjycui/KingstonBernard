import React from "react"

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  SendData = () => {
    // GET request using fetch with async/await
    const endPoint = 'localhost:4000/data';

    //this.setState({ totalReactPackages: data.total })
    console.log("Sending the dataE bro! -.-");
  }

  render() {
    return (
      <div style={{
        padding: 20
      }}>
        <form onSubmit={this.SendData}>
          <label >The data, bro: &nbsp; </label>
          <input type="text" id="lname" name="lname" />
          <br />
          <button style={{
            margin: 20
          }} type="submit">
            Send the data
          </button>
        </form>
      </div>
    )
  }
}

export default Index
