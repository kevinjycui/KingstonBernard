import React from "react"

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 44.2312, lng: -76.4860 }}
  >
    {<Marker position={{ lat: 44.2312, lng: -76.4860 }} />}
    {<Marker position={{ lat: 44.2502931774, lng: -76.5120968535 }} />}
  </GoogleMap>
))

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
        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvO2Y5_5LeasBlRwuApzbWLTCRqdsHfwo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >

        </MyMapComponent>
      </div>
    )
  }
}

export default Index
