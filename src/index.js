import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//gewone functie component voor de modalbox, moet met hoofdletter beginnen
function ModalBox(props) {
    // props show, restart, komen van de state component Timer
    // als show:false niet tonen en functie verlaten (return)
    if (!props.show) {
        return null;
    }
    // als show:true wel tonen
    return (
        <div className="modal">
            <h3>Time to take a break!</h3>
            <button className="close" onClick={props.close}>X</button>
            <button className="restart" onClick={props.restart}>Restart timer</button>
        </div> 

    );
}
//state component
class Timer extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {  
            //seconde geven we een string mee om zo op de display te verschijnen          
            seconds: '00',
            minutes: 20,                    
            isRunning: false,
            showModal: false
        };

        //binding is necessary to make `this` work in the callback
        //OF arrowfuncties gebruiken vb hieronder handleRestart()
        this.startTimer = this.startTimer.bind(this);
        this.plusTimer = this.plusTimer.bind(this);
        this.minTimer = this.minTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.tick = this.tick.bind(this);
    }

//functie tick
    tick() {
        //deze eerst zetten dan begint hij iets sneller
        this.secondsLeft--
        //0 en slice toegevoegd om altijd 2 cijfers te krijgen
        let min = ("0" + Math.floor(this.secondsLeft / 60)).slice(-2);
        let sec = ("0" + Math.ceil(this.secondsLeft % 60)).slice(-2);

        this.setState({
            minutes: min,
            seconds: sec
        })
        console.log(this.state.minutes, this.state.seconds)
        // opgepast niet gewoon 0 zetten ipv '00' want timer staat op 00 ipv 0!!!
        if (min === '00' && sec === '00') {            
            clearInterval(this.intervalHandle);
            console.log('time to take a break');
            this.setState({
                showModal: true,
                isRunning: false
            })
        }
        
    }
 
//functies voor de knoppen
    startTimer() {
        //start - reset timer
        console.log("timer is gestart");
        this.setState({ isRunning: true });
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.minutes;
        this.secondsLeft = time * 60;
        console.log(this.secondsLeft)

    }
    plusTimer() {
        //1 min erbij als de timer niet loopt
        if (!this.state.isRunning) {
        console.log("een minuut erbij");
        // this.setState({ seconds: this.state.seconds + 60 }) niet ok omdat je state direct verandert
        // een andere vorm van setState die een arrowftie gebruikt in de plaats van een object en met als argument de vorige state
        this.setState((prevState) => ({ minutes: prevState.minutes + 1 }));
        console.log(this.state.minutes)
        }
        else {console.log('werkt niet als de timer loopt')}
    }
    minTimer() {
        //1 min eraf als de timer niet loopt
        if (!this.state.isRunning) {
        console.log("een minuut eraf")
        this.setState ((prevState)=> ({ minutes: prevState.minutes - 1 }));
        console.log(this.state.minutes)}
        else {console.log('werkt niet als de timer loopt')}
    }
    resetTimer() {
        //zet de timer terug in startpositie
        clearInterval(this.intervalHandle);
        this.setState ({ 
            minutes: 20,
            seconds: '00',
            isRunning: false 
         });
    }
//functie voor de knoppen van de modalbox
    //deze binden we in de render methode met een arrowfunctie!
    handleRestart() {
        this.setState({
            minutes: 20,
            seconds: '00',
            showModal: false
        });
        console.log(this.state)
    }
    handleCloseBox() {
        this.setState({showModal: false})
    }

//wat de timer zal doorgeven aan de DOM
    render() {
        return (
        <div className="container">
            <div className="start" onClick={this.state.isRunning ? this.resetTimer : this.startTimer}>
                { this.state.isRunning ? 'reset' : 'start'}
                </div>
            <div className="display">{this.state.minutes} : {this.state.seconds}</div>
            <div className="plusmin">
                <button onClick={this.plusTimer}>+</button>
                <button onClick={this.minTimer}>-</button> 
                </div>            
                       
            <ModalBox 
            // geef de props door aan de functie ModalBox
                show={this.state.showModal} 
                restart={ () => this.handleRestart() }
                close={ () => this.handleCloseBox() }/>
        </div>
        );
    }
}
  
  ReactDOM.render(
    <Timer />,
    document.getElementById('root')
  );