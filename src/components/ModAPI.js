import React from 'react';
import "./ModAPI.css"

export default class ModAPI extends React.Component {
    
    constructor(props)  {
        super(props)
        this.state = {
            show: 0
        }
    }

    turner(n) {

        this.setState ({show: (this.state.show + n) % 4})

        if (this.state.show === 0 && n === -1) {
            this.setState ({show: 3})
    }

    }


    render() {
        return (
                <div className="wheels">
                    <FullCircle nome="intelletto" setProva={this.props.setProva} data={this.props.data} turn={0} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                    <FullCircle nome="psiche" setProva={this.props.setProva} data={this.props.data} turn={1} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                    <FullCircle nome="forza" setProva={this.props.setProva} data={this.props.data} turn={2} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                    <FullCircle nome="motorics" setProva={this.props.setProva} data={this.props.data} turn={3} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                </div>
        )
    }
}

class FullCircle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const objSkills = Object.keys(this.props.data.skills).filter(d => {return d.slice(0,3) === this.props.nome.slice(0,3)});
        const skill = this.props.data.skills[objSkills];

        return (
        <div className={'wheel-wrapper wheelshow' + (this.props.show === this.props.turn)}>
            <div className="wheel">
                <Arc nome={Object.keys(skill)[0]} setProva={this.props.setProva} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                <Arc nome={Object.keys(skill)[1]} setProva={this.props.setProva} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                <Arc nome={Object.keys(skill)[2]} setProva={this.props.setProva} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                <Arc nome={Object.keys(skill)[3]} setProva={this.props.setProva} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                <Arc nome={Object.keys(skill)[4]} setProva={this.props.setProva} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/> 
                <div>
                    <Inner nome={this.props.nome} setProva={this.props.setProva} turner={this.props.turner} stat={this.props.nome} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                </div>
            </div>
        </div>
        )
    }
}

class Arc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        
        const backgroundUrl = "/images/attr/" + this.props.nome + ".jpg"
        let modSum = this.props.data.skills[this.props.father][this.props.nome] + this.props.data.stats[this.props.stat]
      
        return (
            <div className={"arc"} style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover' }}
            onClick={() => {this.props.mod(modSum, this.props.nome); 
                            this.props.setProva(this.props.nome); 
                            this.props.flush()}}> 
                <p className="skillwheelname">
                    {
                    !this.props.nome.includes("_") &&
                    this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)
                    }
                    {this.props.nome.includes("_") && this.props.nome !== "forza_di_volonta" &&
                    this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1).replace(/_/g, " ")
                    }
                    {this.props.nome === "forza_di_volonta" && 
                    "Forza di volontà"}
                </p>
            </div>
        )
    }
}

class Inner extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

    let modSum = this.props.data.stats[this.props.nome]

    return (
        <div className={"inner-circle " + this.props.nome}>
            <p onClick={() => {this.props.mod(modSum); this.props.setProva(this.props.nome); this.props.flush()}}>{this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)}</p>
            <div className='stats-arrows'>
                <img src="/images/arrows.png" className="stat-arrow" style={{ transform: "rotate(180deg)" }} onClick={() => {this.props.turner(-1); this.props.flush()}}/>
                <img src="/images/arrows.png" className="stat-arrow" onClick={() => {this.props.turner(1); this.props.flush()}}></img>
            </div>
        </div>
        )
    }
}