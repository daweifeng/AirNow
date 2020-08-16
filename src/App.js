import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DisplayBoard from './component/displayBoard';
import { getNewAirData } from './actions/index';
import Loader from './component/loader';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { location: null, counting:true };
    this.checkNowOnClick = this.checkNowOnClick.bind(this);
    this.getCountingFinished = this.getCountingFinished.bind(this);
  }
  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ location: position });
        this.props.ge(this.state.location.coords);
      });
    }
    // console.log('nothing');
  }
  // componentDidMount() {
  //   let height = window.outerHeight.toString();
    
  //   document.querySelector("body").style.height = height+"px"
  // }
  checkNowOnClick(e) {
    if (navigator.geolocation) {
      this.setState({ location: null, counting: true });
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ location: position });
        this.props.ge(this.state.location.coords);
      });
    }
  }
  getCountingFinished(flag) {
    if (flag){
      this.setState({counting: false});
    }
  }
  render() {
      if (this.state.location) {
        // const location = this.state.location.coords;
        // console.log(location)
        return (
          <div>
            <DisplayBoard getCountingFinished={this.getCountingFinished} />
            {this.state.counting  
            ? <button onClick={this.checkNowOnClick} className="check-button diable" disabled>Checking</button>
            : <button onClick={this.checkNowOnClick} className="check-button">Update</button>
            }
            <div className={`global-bg ${this.props.background}`}></div>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ ge: getNewAirData }, dispatch);

const mapStateToProps = (state) => {
  return {
    background: state.indexLevel.background
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
