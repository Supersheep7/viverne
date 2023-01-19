import React from 'react';
import Buttons from './Buttons'
import Gauges from './Gauges'

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gaugeOn: false
        }
    }
    
    render() {
    
        return (
            <div id="header">
                <div id="navigator-wrapper">
                    <div>
                        <a href={process.env.REACT_APP_URL}><img id="home" src="/images/Home.png" /></a>
                        <nav>
                            <Buttons className="navigator"/>
                        </nav>
                    </div>
                </div>
                <div id="avatar">
                    <img id="face" className={"transleft" + this.props.visible} onClick={() => {this.props.gauge(); this.setState({gaugeOn: !this.state.gaugeOn})}} src={"/images/" + this.props.nome + ".png"} />
                    <img id="bg" className={"blur" + this.state.gaugeOn} src={"/images/" + this.props.nome + (" bg.jpg")} />
                    <div className="gauges">
                        <Gauges gaugeHandleClick={this.props.gaugeHandleClick} gaugeCallback={this.props.gaugeCallback} gaugeOn={this.props.gaugeOn} 
                        CA={this.props.CA}
                        prestanza={this.props.data.skills.forskills.prestanza + this.props.data.stats.forza}
                        precisione={this.props.data.skills.motskills.precisione + this.props.data.stats.motorics}
                        pf={this.props.pf}
                        mana={this.props.mana}
                        luc={this.props.luc}
                        maxpf={this.props.maxpf}
                        maxmana={this.props.maxmana}
                        maxluc={this.props.maxluc}
                        />
                    </div>
                    <div className={"infowrapper transright" + this.props.visible}>
                        <p className="infos">{this.props.eta} anni, {(this.props.altezza).toString().charAt(0)}.{(this.props.altezza).toString().substring(1, 3)} m{this.props.magia !== "nessuna" && ", Magia " + this.props.magia.charAt(0).toUpperCase() + this.props.magia.slice(1)}</p>
                        <h1 className="infoname">{this.props.nome}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Avatar