import React from 'react';
import { ReactDOM } from 'react-dom';

class Gauges extends React.Component {
    constructor(props) {
        super(props)
    }
        
    render() {

        return(
        <div className={"gauges-wrapper open" + this.props.gaugeOn}>
            <div className={'gauge-wrapper'}>
                <Gauge nome="pf" callback={this.callback} gaugeCallback={this.props.gaugeCallback} gaugeHandleClick={this.props.gaugeHandleClick} qty={this.props.pf} max={this.props.maxpf} />
                <Gauge nome="mana" callback={this.callback} gaugeCallback={this.props.gaugeCallback} gaugeHandleClick={this.props.gaugeHandleClick} qty={this.props.mana} max={this.props.maxmana} />
                <Gauge nome="luc" callback={this.callback} gaugeCallback={this.props.gaugeCallback} gaugeHandleClick={this.props.gaugeHandleClick} qty={this.props.luc} max={this.props.maxluc}/>
            </div>
            <div className={'dial-wrapper'}>
                <Dial nome="CA" int={this.props.CA}/>
                <Dial nome="prestanza" int={this.props.prestanza}/>
                <Dial nome="precisione" int={this.props.precisione}/>
            </div>
        </div>
        
    )
}
}

function Gauge(props) {
    
    const [counter, setCounter] = React.useState(props.qty);
    const intervalRef = React.useRef(null);

    React.useEffect(() => {
        return () => stopCounter();
    }, []);

  const upCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1)
      this.setState({counter: counter});
    }, 50);
  };

  const downCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1)
      this.setState({counter: counter});
    }, 50);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return props.gaugeCallback(props.nome, counter) 
    }
  };
  
  function downMouse (direction){
    
    if (direction === "up") {
        upCounter();
    } else { downCounter() }

        }

  const upMouse = () => {
    stopCounter()
  };
    
    var percent = (counter / props.max * 100)
    
    return (
        <div className="outer-gauge">
            <div className="inner-gauge gauge">
                <button className='left btn' onMouseDown={() => downMouse("down")} 
                onMouseUp={() => upMouse()} onMouseLeave={() => upMouse()}
                onTouchStart={() => downMouse("down")} onTouchEnd={() => upMouse()}
                >&lt;</button>
                <p className="gauge-text">{props.nome.toUpperCase()}:  {counter} / {props.max}</p>
                <button className='right btn' 
                onMouseDown={() => downMouse("up")} onMouseUp={() => upMouse()} onMouseLeave={() => upMouse()}
                onTouchStart={() => downMouse("up")} onTouchEnd={() => upMouse()}
                >&gt;</button>
                <div className={props.nome + " bar"} style={{'width': percent+'%'}} />
            </div>
        </div>
    )
}

class Dial extends React.Component {
    render() {
        return (
            <div className='inner-dial'>
                <img src={"/images/" + this.props.nome + ".png"} className="dial"/>
                <p className="gauge-text dial-text">{this.props.int}</p>
            </div>
        )
    }
}

export default Gauges