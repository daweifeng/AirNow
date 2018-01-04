import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayBoard extends Component {
  constructor(props) {
    super();

    this.state = { pm25Data: null, codition: null };
    this.updatePM25 = this.updatePM25.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.airData[0]) {
      const pm25 = nextProps.airData[0].data.iaqi.pm25.v;
      this.updatePM25(pm25);
    }
  }

  // Create the animation of counting
  updatePM25(pm25Data) {
    for (let i = 0; i < pm25Data; i++) {
      setTimeout(
        ((i) => {
          return () => {
            this.setState({ pm25Data: i});
            const pm25 = this.state.pm25Data;
            if (pm25 <= 50) {
              document.querySelector(".main-meter").style.color = "#70F1CE";
              document.querySelector('#bg-healthy').style.opacity = '1';
              this.setState({ codition: 'Healthy' });
            } else if (pm25 <= 100) {
              document.querySelector(".main-meter").style.color = "#EDC77A";
              document.querySelector('#bg-healthy').style.opacity = '0';
              this.setState({ codition: 'Moderate' });
            } else if (pm25 <= 150) {
              document.querySelector(".main-meter").style.color = "#EFA556";
              document.querySelector('#bg-moderate').style.opacity = '0';
              this.setState({ codition: 'Unhealthy for Sensitive Groups' });
            } else if (pm25 <= 200) {
              document.querySelector(".main-meter").style.color = "#FE7148";
              document.querySelector('#bg-sensitive').style.opacity = '0';
              this.setState({ codition: 'Unhealthy' });
            } else if (pm25 < 300) {
              document.querySelector(".main-meter").style.color = "#B093EF";
              document.querySelector('#bg-unhealthy').style.opacity = '0';
              this.setState({ codition: 'Very Unhealthy' });
            } else {
              document.querySelector(".main-meter").style.color = "#000000";
              document.querySelector('#bg-danger').style.opacity = '0';
              this.setState({ codition: 'Hazardous' });
            }
          };
        })(i), ((i) => {
          return i*60
        })(i)
      );
    }
    return pm25Data;
  }

  render() {
    // console.log('receive', this.props.airData[0]);
    if (this.props.airData[0]) {
      return (
        <div>
          <div>
            <div className="airnow">AirNow</div>
          </div>
          <h1 className="city">{this.props.airData[0].data.city.name}</h1>
          <div className="main-meter animated bounceIn">
            <h3 className="title">PM2.5</h3>
            <div className="pm25"> {this.state.pm25Data} </div>
            <h3 className="condition">{this.state.codition}</h3>
          </div>
        </div>
      );
    }
    return (<h2 className="loading">Loading data...</h2>);
  }
}

const mapStateToProps = (state) => {
  return { airData: state.airData };
};

export default connect(mapStateToProps)(DisplayBoard);
