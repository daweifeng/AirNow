import React, { Component } from 'react';
import { bindActionCreators } from "redux"
import Loader from './loader';
import { connect } from 'react-redux';
import { setIndexLevel } from "../actions"

class DisplayBoard extends Component {
  constructor(props) {
    super();

    this.state = { pm25Data: null };
    this.updatePM25 = this.updatePM25.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.airData[0] !== this.props.airData[0]) {
      const pm25 = this.props.airData[0].data.iaqi.pm25.v;
      this.updatePM25(pm25);
    }
  }

  // Create the animation of counting
  updatePM25(pm25Data) {
    let speed;
    if (pm25Data < 100) {
      speed = 60;
    } else if (pm25Data < 200) {
      speed = 40;
    } else if (pm25Data < 300) {
      speed = 38;
    } else {
      speed = 35;
    }
    for (let i = 0; i <= pm25Data; i++) {
      setTimeout(
        ((i) => {
          return () => {
            this.setState({ pm25Data: i});
            const pm25 = this.state.pm25Data;
            if (i === pm25Data) {
              this.props.getCountingFinished(true);
            }
            this.props.setIndexLevel(i);
          };
        })(i), ((i) => {
          return i*speed
        })(i)
      );
    }
  }

  render() {
    if (this.props.airData[0]) {
      return (
        <div>
          <div>
            <div className="airnow">AirNow</div>
          </div>
          <div className="center-block">
          <h1 className="city">{this.props.airData[0].data.city.name}</h1>
          <div className="main-meter animated bounceIn" style={{color: `${this.props.color}`}}>
            <h3 className="title">PM2.5</h3>
            <div className="pm25"> {this.state.pm25Data} </div>
            <h3 className="condition">{this.props.condition}</h3>
          </div>
          </div>
        </div>
      );
    }
    return (
      <div className="vertical-center"> 
        <div className="loader-container">
          <Loader />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    airData: state.airData,
    color: state.indexLevel.color,
    condition: state.indexLevel.condition
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ setIndexLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DisplayBoard);
