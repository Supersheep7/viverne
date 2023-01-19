import React from 'react';

class Stats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    dropClick() {
        this.setState ({
            open: !this.state.open
        })
    }

    render() {
        return(
            <div>
                <div className={"dropdown-tag"} onClick={() => this.dropClick()}>
                    <h2 className="dropdown-text">Stats</h2>
                    <img className={"svgarrow" + " open" + this.state.open} src="/images/chevron.png" />
                </div>
                <div className={"stats open" + this.state.open}>
                    <div className={"backdrop open" + this.state.open}>
                        <div className={"statscards open" + this.state.open}>
                            <Stat nome="intelletto" className="single-stat" data={this.props.data} colore={this.props.colore}/>
                            <div className='stats-wrapper'>
                                <Skill nome="logica" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="cultura" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="pragmatica" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="concettualizzazione" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="tattica" data={this.props.data} colore={this.props.colore}/>
                            </div>
                            <Stat nome="psiche" className="single-stat" data={this.props.data} colore={this.props.colore}/>
                            <div className='stats-wrapper'>
                                <Skill nome="forza_di_volonta" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="sesto_senso" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="pratica_magica" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="empatia" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="connessione_divina" data={this.props.data} colore={this.props.colore}/>
                            </div>
                            <Stat nome="forza" className="single-stat" data={this.props.data} colore={this.props.colore}/>
                            <div className='stats-wrapper'>
                                <Skill nome="sopportazione_del_dolore" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="forza_bruta" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="elettrochimica" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="prestanza" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="istinto_animale" data={this.props.data} colore={this.props.colore}/>
                            </div>
                            <Stat nome="motorics" className="single-stat" data={this.props.data} colore={this.props.colore}/>
                            <div className='stats-wrapper'>
                                <Skill nome="coordinazione" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="percezione" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="reazione" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="precisione" data={this.props.data} colore={this.props.colore}/>
                                <Skill nome="intuito_di_razza" data={this.props.data} colore={this.props.colore}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Stat extends React.Component {
    render() {
        return (
            <div id={this.props.nome} className="stat-container">
                <div>
                    <h4>{this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)}</h4>
                    <p>{this.props.data.stats[this.props.nome]}</p>
                </div>
            </div>
        )
    }
}

class Skill extends React.Component {

    finder(a) {

        let arr = []
        let result;

        Object.keys(this.props.data.stats).map(d => {
            let sliced = d.slice(0, 3)
            arr.push(sliced)
            if (arr.indexOf(a.slice(0, 3)) > -1) {
                result = d
                arr = []
                }
            return result
        })
        return result

    }

    render() {

        let num;
        let attr;

        Object.keys(this.props.data.skills).map(d => {
            if (this.props.data.skills[d][this.props.nome] !== undefined) {
                num = this.props.data.skills[d][this.props.nome]
                attr = this.props.data.stats[this.finder(d)]
                return
            }                
            else return 
            })

        let fav = this.props.nome === this.props.data.skills.favskill

        return (
            <div id={this.props.nome} className="skillcard">
                <div className="skill-tag"> 
                    <img className={"skillimg" + " fav" + fav} src={"/images/attr/" + this.props.nome + ".jpg"}/>
                    <div className='skilltitle'>
                        <h4>{
                        !this.props.nome.includes("_") &&
                        this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)
                        }
                        {this.props.nome.includes("_") && this.props.nome !== "forza_di_volonta" &&
                        this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1).replace(/_/g, " ")
                        }
                        {this.props.nome === "forza_di_volonta" && 
                        "Forza di volontà"}
                        </h4>
                    </div>
                    <div className="skill-content">
                        <div>
                            <div>
                                {Array(num).fill(<img src="/images/attr/attrpointfull.png" className='attrfull' style={{width: "12px"}}/>)}
                            </div>
                        </div>
                    </div>
                    <div className="dice">
                        <div>
                            <img src="/images/dice/1d8.png"/>
                            <p>{num + attr}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Stats