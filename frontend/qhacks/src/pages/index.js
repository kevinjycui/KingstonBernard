import React from "react"
import Helmet from "react-helmet"
import axios from 'axios'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Image from '../components/Image';

const Icon = () => {
  return (
    <>
      <Image
        src="icon.png"
        className="mx-auto shadow-xl"
        alt="Icon"
        style={{
          display: "inline-block",
          width: "100px"
        }}
      />
    </>
  );
};

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 0,
  maxWidth: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center"
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  // fontSize: "1.25rem",
  borderRadius: 4,
}

const request = async (url, numberOfUnits, type) => {
  try {
    const response = await axios.get(url, {
      params: {number: numberOfUnits, type: type}
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
    this.state = { 
      markers: [],
      numberOfUnits: 1,
      type: 'Fire'
    };

    this.handleUnitsChange = this.handleUnitsChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleUnitsSubmit = this.handleUnitsSubmit.bind(this);
  }

  GetData = async(numberOfUnits, type) => {
    // GET request using fetch with async/await
    const url = 'http://localhost:4000/data';
    console.log("Asking for datas bro! -.-");

    const data = await request(url, numberOfUnits, type);
    console.log(data)
    this.setState({markers: data});

    //this.setState({ totalReactPackages: data.total })

  }

  HandleMarkerClick = () => {
    console.log("Marker click")
  }
  
  handleUnitsChange(event) {
    if (event.target.value < 100) 
      this.setState({numberOfUnits: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleUnitsSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    this.GetData(this.state.numberOfUnits, this.state.type);
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
      <main style={pageStyles}>
        <title>Kingston Bernard</title>
        <h1 style={headingStyles}>{Icon()} Bernard - Kingston Emergency Services Prediction Tool</h1>
      <div style={{
        padding: 20
      }}>
        <Helmet>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous" defer></script>
        </Helmet>

        
        <form onSubmit={this.handleUnitsSubmit}>
          <label>
            Number of Available Units: &nbsp;
            <input
                name="numberOfUnits"
                type="number"
                value={this.state.numberOfUnits}
                onChange={this.handleUnitsChange} />
        </label>
        <label>
            &nbsp;Call Type: &nbsp;
            <select value={this.state.type} onChange={this.handleTypeChange}>
                <option value="Fire">Fire</option>
                <option value="Medical">Medical</option>
                <option value="Motor Vehicle Accident">Motor Vehicle Accident</option>
                <option value="CO Alarm">CO Alarm</option>
                <option value="Structure Rescue">Structure Rescue</option>
                <option value="Water Rescue">Water Rescue</option>
            </select>
          </label>
          &nbsp;
          <input type="submit" value="Submit" />
        </form>

        <br/>

        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvO2Y5_5LeasBlRwuApzbWLTCRqdsHfwo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMarkerClick={this.HandleMarkerClick}
          markerProps={marker_props}
        >

        </MyMapComponent>
      </div>

      <p style={paragraphStyles}>See it on <a style={codeStyles} href='https://github.com/kevinjycui/KingstonBernard'>GitHub</a> or <a style={codeStyles} href='https://devpost.com/software/kingston-bernard'>Devpost</a></p>
    </main>
    )
  }
}

export default Index
