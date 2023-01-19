import React from "react"
import AddAPI from "./AddAPI"
import ModAPI from "./ModAPI"

export class DiceRoller extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="dice-roller-wrapper" onClick={() => this.props.overlayHandleClick()}>
                <div className="dice-roller-circle">
                    <img src="/images/dice/d8icon.png"/>    
                </div>
            </div>
        )
    }
}

export class Overlay extends React.Component {
    constructor(props) {
        super(props)
        
    this.state = {
        bonus: 0, d8n0: 0, d8n1: 0, d8n2: 0,
        addstack: 0, vantaggio: 0, svantaggio: 0,
        active: [],
        nowshowing: "",
        prova: "",
    }
    }
  
    flush() {
        this.setState({
            addstack: 0,
            active: [],
            bonus: 0
        })
      }

    add(int) {
        this.setState({
            addstack: this.state.addstack + int
        })
      }

    setProva(s) {
        this.setState({prova: s})
    }

    bonusHandleClick(n) {
        this.setState({bonus: this.state.bonus + n})
    }

    bonusFlush() {
        this.setState({bonus: 0})
    }

    showroom(s) {
        this.setState({nowshowing: s})
    }

    rolld8(d8) {
        this.setState({[d8]: Math.floor(Math.random() * 8) + 1}) 
    }

    svantaggio(a, b, c) {
        let arr = [a, b, c]
        let max = Math.max(...arr)
        return arr.reduce((a,b) => a + b) - max
    }
    
    vantaggio(a, b, c) {
        let arr = [a, b, c]
        let min = Math.min(...arr)
        return arr.reduce((a,b) => a + b) - min
    }

    roll2d8() {
        this.rolld8("d8n0");
        this.rolld8("d8n1")
    }

    roll3d8() {
       this.rolld8("d8n0");
       this.rolld8("d8n1");
       this.rolld8("d8n2");
       this.setState({
        vantaggio: this.vantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2),
        svantaggio: this.svantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2)
        })
    }

    flushClick (e) {
        if (e.target.className.toString().substring(0, 16) !== "dicerandom") {
        if (this.state.nowshowing !== "") {
            this.setState ({nowshowing: ""})
        }  
    }
    }

    render() {

        let prova = this.state.prova

        return (
        <div className={"dice-roller-overlay open" + this.props.open} onClick={(event) => this.flushClick(event)}>
            <div className="overlay-header">
                {prova !== "" &&
                "Prova di "}
                {
                !prova.includes("_") &&
                prova.charAt(0).toUpperCase() + prova.slice(1)
                }
                {prova.includes("_") && prova !== "forza_di_volonta" &&
                prova.charAt(0).toUpperCase() + prova.slice(1).replace(/_/g, " ")
                }
                {prova === "forza_di_volonta" && 
                "Forza di volontà"}
            </div>
            <div className="overlay-content">
                <div>
                    <ModAPI prova={this.state.prova} setProva={this.setProva.bind(this)} modificatore={this.props.modificatoremod} data={this.props.data} mod={this.props.mod} flush={this.flush.bind(this)}/>
                </div>
                <div>
                    <AddAPI active={this.state.active} flush={this.state.flush} addstack={this.state.addstack} modificatore={this.props.modificatore} data={this.props.data} add={this.add.bind(this)}/>
                </div>
                <div id="dice-roller">
                    <div>
                        <div className="flex row modificatore-wrapper">
                            <p onClick={() => this.bonusHandleClick(-1)} style= {{
                                fontSize: '50px',
                                cursor: 'pointer',
                                filter: 'drop-shadow(0 0 2px whitesmoke) drop-shadow(0 0 2px whitesmoke)'
                            }}>-</p>
                            <div className={"green" + (this.state.bonus > 0) + " red" + (this.state.bonus < 0)}>
                                {this.props.modificatoremod + this.state.addstack + this.state.bonus >= 0 && 
                                <p style= {{ fontSize: '50px'}}> +{this.props.modificatoremod + this.state.addstack + this.state.bonus}</p>}
                                {this.props.modificatoremod + this.state.addstack + this.state.bonus < 0 && 
                                <p style= {{ fontSize: '50px'}}> {this.props.modificatoremod + this.state.addstack + this.state.bonus}</p>}
                            </div>
                            <p onClick={() => this.bonusHandleClick(1)} style= {{
                                fontSize: '50px',
                                cursor: 'pointer',
                                filter: 'drop-shadow(0 0 2px whitesmoke) drop-shadow(0 0 2px whitesmoke)'
                            }}>+</p>
                        </div>
                    </div>
                    <div className="flex row">
                        <div className="dicerandom-wrapper">
                            <img className="dicerandom" src="/images/dice/svantaggio.png" onClick={() => {this.roll3d8(); this.showroom("svantaggio")}} />
                            <p className={"svantaggioshow" + (this.state.nowshowing === "svantaggio") + " result" + this.svantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2)}>{this.svantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2)}</p>
                        </div>
                        <div className="dicerandom-wrapper d8dicerandom">
                            <img className="dicerandom" src="/images/dice/2d8.png" onClick={() => {this.roll2d8(); this.showroom("d8"); }} />
                            <p className={"d8show" + (this.state.nowshowing === "d8") + " result" + (this.state.d8n0 + this.state.d8n1)}>{this.state.d8n0 + this.state.d8n1}</p>
                        </div>
                        <div className="dicerandom-wrapper">
                            <img className="dicerandom" src="/images/dice/vantaggio.png" onClick={() => {this.roll3d8(); this.showroom("vantaggio"); }} />
                            <p className={"vantaggioshow" + (this.state.nowshowing === "vantaggio") + " result" + this.vantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2)}>{this.vantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2)}</p>
                        </div>
                    </div>
                    <div>
                        <p>Totale</p>
                        <div className="total-wrapper">
                            <p className={"d8show" + (this.state.nowshowing === "d8")}>{this.props.modificatoremod + this.state.addstack + this.state.bonus + this.state.d8n0 + this.state.d8n1}</p>
                            <p className={"vantaggioshow" + (this.state.nowshowing === "vantaggio")}>{this.props.modificatoremod + this.state.addstack + this.state.bonus + this.vantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2)}</p>
                            <p className={"svantaggioshow" + (this.state.nowshowing === "svantaggio")}>{this.props.modificatoremod + this.state.addstack + this.state.bonus + this.svantaggio(this.state.d8n0, this.state.d8n1, this.state.d8n2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}