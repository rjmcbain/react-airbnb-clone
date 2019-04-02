import React from "react";
import { Cacher } from "../../services/cacher";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  // Marker,
  Circle,
  InfoWindow
} from "react-google-maps";

function MapComponent(props) {
  const { coordinates, isError } = props;
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
    >
      {<Circle center={coordinates} radius={500} />}{" "}
      <InfoWindow position={coordinates}>
        <div>
          Oops, there is a problem finding your location on the map. We are
          trying to resolve this problem as fast as possible. Contact host for
          additional information if you are still interested in booking this
          place. We are sorry for any inconiviance.
        </div>
      </InfoWindow>
    </GoogleMap>
  );
}

function withGeocode(WrappedComponent) {
  return class extends React.Component {
    cacher = new Cacher();
    state = {
      coordinates: {
        lat: 0,
        lng: 0
      },
      isError: false
    };

    componentWillMount() {
      this.getGeocodedLocation();
    }
    geocodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === "OK") {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
            this.cacher.cacheValue(location, coordinates);
            resolve(coordinates);
          } else {
            reject("ERROR");
          }
        });
      });
    }
    getGeocodedLocation() {
      // const location = this.props.location;
      const location = "123gfjhgf";

      // If location is cached return cached values
      if (this.cacher.isValueCached(location)) {
        this.setState({ coordinates: this.cacher.getCachedValue(location) });
      } else {
        this.geocodeLocation(location).then(
          coordinates => {
            this.setState({
              coordinates
            });
          },
          error => {
            this.setState({ isError: true });
          }
        );
      }
    }
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}

export const MapWithGeocode = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
