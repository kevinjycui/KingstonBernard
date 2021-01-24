import React from "react"
import Helmet from "react-helmet"
import axios from 'axios'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const request = async (url) => {
  try {
    const response = await axios.get(url, {
      params: {number: 8, type: 'Fire'}
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 44.2312, lng: -76.4860 }}
  >
    {props.markerProps}
  </GoogleMap>
))

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = { markers: [
    ] };
  }

  GetData = async() => {
    // GET request using fetch with async/await
    const url = 'http://localhost:4000/data';
    console.log("Asking for datas bro! -.-");

    const data = await request(url);
    console.log(data)
    this.setState({markers: data});

    //this.setState({ totalReactPackages: data.total })

  }

  HandleMarkerClick = () => {
    console.log("Marker click")
  }

  render() {

    // here we generate the marker props
    var marker_props = [];

    for (var i = 0; i < this.state.markers.length; i++)
    {
      var marker = this.state.markers[i];
      marker_props.push(<Marker key={i} position={{ lat: marker[0], lng: marker[1] }} onClick={this.HandleMarkerClick} />);
    }

    return (
      <div style={{
        padding: 20
      }}>
        <Helmet>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous" defer></script>
        </Helmet>
        <form>
          <label>
            # of Data Points: &nbsp;
            <input type="text" name="name" />
          </label>
          <button style={{
            margin: 20
          }} onClick={this.GetData}>
            Get the data
          </button>
        </form>

        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvO2Y5_5LeasBlRwuApzbWLTCRqdsHfwo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMarkerClick={this.HandleMarkerClick}
          markerProps={marker_props}
        >

        </MyMapComponent>
      </div>
    )
  }
}

export default Index
