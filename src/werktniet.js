import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            // een leeg timeObj dat later wordt opgevuld 
            time: {},
            // het aantal seconden dat de timer moet lopen
            seconds: 20*60,
            isRunning: false
        };

        
        //binding is necessary to make `this` work in the callback
        this.startTimer = this.startTimer.bind(this);
        this.plusTimer = this.plusTimer.bind(this);
        this.minTimer = this.minTimer.bind(this);
    }
//functie om tijd om te zetten van seconden in een object met minuten en seconden
    secondsToTime(secs) {
        //0 en slice toegevoegd om altijd 2 cijfers te krijgen
        let minutes = ("0" + Math.floor(secs / 60)).slice(-2);
        let seconds = ("0" + Math.ceil(secs % 60)).slice(-2);
        let timeObj = {
            "m" : minutes,
            "s" : seconds
        };
        return timeObj;
    }

 
//functies voor de knoppen
    startTimer() {
        //start - reset timer
        console.log("timer is gestart");
    }
    plusTimer() {
        //1 min erbij
        console.log("een minuut erbij");
        // this.setState({ seconds: this.state.seconds + 60 }) niet ok omdat je state direct verandert
        // een andere vorm van setState die een arrowftie gebruikt in de plaats van een object en met als argument de vorige state
        this.setState((prevState) => ({ seconds: prevState.seconds + 60 }));
        console.log(this.state.seconds)
        //hieronder zou moeten wegvallen!!!
        // let timeLeft = this.secondsToTime(this.state.seconds);
        // this.setState({ time: timeLeft });
        // console.log(timeLeft)
        // console.log(this.state.time)
    }
    minTimer() {
        //1 min eraf
        console.log("een minuut eraf")
        this.setState ((prevState)=> ({ seconds: prevState.seconds - 60 }));
        console.log(this.state.seconds)
        //hieronder zou moeten wegvallen!!!
        // let timeLeft = this.secondsToTime(this.state.seconds);
        // this.setState({ time: timeLeft });
        // console.log(timeLeft)
        // console.log(this.state.time)
    }

//wat de timer zal doorgeven aan de DOM
    render() {
        return (
        <div>
            <div className ="Display">{this.state.time.m} : {this.state.time.s}</div>
            <button onClick={this.startTimer}>start</button>
            <button onClick={this.plusTimer}>+</button>
            <button onClick={this.minTimer}>-</button>
        </div>
        );
    }
}
  
  ReactDOM.render(
    <Timer />,
    document.getElementById('root')
  );