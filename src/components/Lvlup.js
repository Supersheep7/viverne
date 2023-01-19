import React, { Component } from 'react'
import axios from 'axios'
import "./Lvlup.css"

class Lvlup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lvlup: null,
            personaggio: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.checkBoxChange = this.checkBoxChange.bind(this)
        axios.defaults.withCredentials = true
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    checkBoxChange(event) {
        
        let dropBoy = this.state[event.target.name].indexOf(event.target.value)
        if (dropBoy > -1) { 
           let arr = this.state[event.target.name]
           arr.splice(dropBoy, 1)
           this.setState ({
            [event.target.name]: arr
           })  
        }
        else {
            this.setState({
                [event.target.name]: [...this.state[event.target.name], event.target.value]
        })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        axios
            .post(`${process.env.REACT_APP_BACKURL}/lvlup/${this.state.lvlup}`, 
            {
                nome: this.state.nome,
                summary: this.state.summary,
                skill: this.state.skill,
                bonus: this.state.bonus,
                check: this.state.check,
                danni: this.state.danni,
                magia: this.state.magia,
                cd: this.state.cd,
                mana: this.state.mana,
                quantity: this.state.quantity,
                personaggio: this.state.personaggio
            }
            )
            .then(response => {
                console.log('Data sent to routes/lvlup ')
                if (response.status === 200) {
                    // update the state to redirect to home
                    alert(`${this.state.nome} aggiunto al database`)
                    window.location.reload(true)
                }
                else if (response.status === 210) {
                    alert(`ATTENZIONE: ${this.state.nome} è già presente nel database`)
                    window.location.reload(true)
                }
            })
            .catch(error => {
                console.log('Axios error: ')
                console.log(error);
                this.setState({err: true, error: error})
            })
    }

    skills() {
        return (
            <datalist id="skills">
                <option key="logica" value="Logica" />
                <option key="cultura" value="Cultura" />
                <option key="pragmatica" value="Pragmatica" />
                <option key="concettualizzazione" value="Concettualizzazione" />
                <option key="tattica" value="Tattica" />
                <option key="forza_di_volonta" value="Forza di volontà" />
                <option key="sesto_senso" value="Sesto senso" />
                <option key="pratica_magica" value="Pratica magica" />
                <option key="empatia" value="Empatia" />
                <option key="connessione_divina" value="Connessione divina" />
                <option key="sopportazione_del_dolore" value="Sopportazione del dolore" />
                <option key="forza_bruta" value="Forza bruta" />
                <option key="elettrochimica" value="Elettrochimica" />
                <option key="prestanza" value="Prestanza" />
                <option key="istinto_animale" value="Istinto animale" />
                <option key="coordinazione" value="Coordinazione" />
                <option key="percezione" value="Percezione" />
                <option key="reazione" value="Reazione" />
                <option key="precisione" value="Precisione" />
                <option key="intuito_di_razza" value="Intuito di razza" />
            </datalist>
        )
    }

    form() {
        return (
            <div className="form-wrapper">
                <h1>Crea upgrade</h1>
                <form>
                    <div>
                        <input type="radio" id="abilita_innate" name="lvlup" value="abilita_innate" onChange={this.handleChange}/>
                        <label htmlFor="abilita_innate">Abilità</label>
                        <input type="radio" id="attacchi" name="lvlup" value="attacchi" onChange={this.handleChange}/>
                        <label htmlFor="attacchi">Attacco</label>
                        <input type="radio" id="bonus" name="lvlup" value="bonus" onChange={this.handleChange}/>
                        <label htmlFor="bonus">Bonus</label>
                        <input type="radio" id="inventario" name="lvlup" value="inventario" onChange={this.handleChange}/>
                        <label htmlFor="inventario">Oggetto</label>
                        <input type="radio" id="magie" name="lvlup" value="magie" onChange={this.handleChange}/>
                        <label htmlFor="magie">Magia</label>
                        <input type="radio" id="missioni" name="lvlup" value="missioni" onChange={this.handleChange}/>
                        <label htmlFor="missioni">Missione</label>
                        <input type="radio" id="tattiche" name="lvlup" value="tattiche" onChange={this.handleChange}/>
                        <label htmlFor="tattiche">Tattica</label>
                    </div>
                </form>
                <form>
                    <label htmlFor="nome">Nome</label>
                    <input onChange={this.handleChange} type="text" name="nome"/>
                    <label htmlFor="summary">Descrizione</label>
                    <textarea onChange={this.handleChange} name="summary"/>
                    {(this.state.lvlup === "abilita_innate"
                    ||this.state.lvlup === "bonus"
                    ||this.state.lvlup === "inventario"
                    ) &&
                    <div>
                        <label htmlFor="modificatore.skill">Abilità colpita</label>
                        <input onChange={this.handleChange} type="text" name="skill" list="skills"/>
                        {this.skills()}
                        <br />
                        <label htmlFor="modificatore.bonus">Bonus/Malus</label>
                        <input onChange={this.handleChange} name="bonus" type="number" />
                    </div>
                    }
                    {this.state.lvlup === "attacchi" &&
                    <div>
                        <label htmlFor="check">Check per colpire</label>
                        <input onChange={this.handleChange} type="text" name="check" list="skills"/>
                        {this.skills()}
                        <br />
                        <label htmlFor="effetto">Danni</label>
                        <input onChange={this.handleChange} type="text" name="danni" />
                    </div>
                    }
                    {this.state.lvlup === "inventario" &&
                    <div>
                        <label htmlFor="magia">Magia</label>
                        <input onChange={this.handleChange} type="text" name="magia"/>
                    </div>
                    }
                    {this.state.lvlup === "magie" &&
                    <div>
                        <label htmlFor="costo.mana">Costo di mana</label>
                        <input onChange={this.handleChange} type="number" name="mana"/>
                        <label htmlFor="costo.skill">Prova da superare</label>
                        <input onChange={this.handleChange} type="text" name="skill" list="skills"/>
                        {this.skills()}
                        <br />
                        <label htmlFor="costo.cd">CD</label>
                        <input onChange={this.handleChange} type="number" name="cd"/>
                    </div>
                    }
                    {this.state.lvlup === "tattiche" &&
                    <div>
                        <label htmlFor="costo.check">Prova da superare</label>
                        <input onChange={this.handleChange} type="text" name="check" list="skills"/>
                        {this.skills()}
                        <br />
                        <label htmlFor="costo.cd">CD</label>
                        <input onChange={this.handleChange} type="number" name="cd" />
                    </div>
                    }
                    <div>
                        <label htmlFor="personaggio">Personaggio/personaggi con questo upgrade</label><br />
                        <input onChange={this.checkBoxChange} type="checkbox" id="pg1" name="personaggio" value="Kalim Malik" />
                        <label for="pg1"> Kalim Mailk</label><br />
                        <input onChange={this.checkBoxChange} type="checkbox" id="pg2" name="personaggio" value="Guiburgis" />
                        <label for="pg2"> Guiburgis</label><br />
                        <input onChange={this.checkBoxChange} type="checkbox" id="pg3" name="personaggio" value="Aruhara Mitski" />
                        <label for="pg3"> Aruhara Mitski</label><br />
                        <input onChange={this.checkBoxChange} type="checkbox" id="pg4" name="personaggio" value="Kleonikos da Bolina" />
                        <label for="pg4"> Kleonikos da Bolina</label><br />
                        <input onChange={this.checkBoxChange} type="checkbox" id="pg5" name="personaggio" value="Syd Rodrigo da Gorbuc" />
                        <label for="pg5"> Syd Rodrigo da Gorbuc</label><br />
                        {this.state.lvlup === "inventario" &&
                        <div>
                        <label htmlFor="quantity">Numero oggetti</label>
                        <input onChange={this.handleChange} type="number" name="quantity"/>
                        </div>}
                    </div>
                    <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }

    render() {
        if (this.props.jwt === process.env.REACT_APP_CACCIAKEY) {
            if (this.state.err)
            {
                return ( 
                    <div>
                        {this.form()}
                        <h1>Something went wrong. Error code: {this.state.error}</h1>
                    </div>
                )            
            }
            else if (this.state.lvlup === null) {
                return (
                <div className="form-wrapper">
                <h1>Crea upgrade</h1>
                <form>
                    <div>
                        <input type="radio" id="abilita_innate" name="lvlup" value="abilita_innate" onChange={this.handleChange}/>
                        <label htmlFor="abilita_innate">Abilità</label>
                        <input type="radio" id="attacchi" name="lvlup" value="attacchi" onChange={this.handleChange}/>
                        <label htmlFor="attacchi">Attacco</label>
                        <input type="radio" id="bonus" name="lvlup" value="bonus" onChange={this.handleChange}/>
                        <label htmlFor="bonus">Bonus</label>
                        <input type="radio" id="inventario" name="lvlup" value="inventario" onChange={this.handleChange}/>
                        <label htmlFor="inventario">Oggetto</label>
                        <input type="radio" id="magie" name="lvlup" value="magie" onChange={this.handleChange}/>
                        <label htmlFor="magie">Magia</label>
                        <input type="radio" id="missioni" name="lvlup" value="missioni" onChange={this.handleChange}/>
                        <label htmlFor="missioni">Missione</label>
                        <input type="radio" id="tattiche" name="lvlup" value="tattiche" onChange={this.handleChange}/>
                        <label htmlFor="tattiche">Tattica</label>
                    </div>
                </form>
                </div>
                )
            }
            else
            {
                return (
                    <div>
                        {this.form()}
                    </div>
                )
            }
            }
        else {
            return <h1>Access denied</h1>
        }
    }
}

export default Lvlup