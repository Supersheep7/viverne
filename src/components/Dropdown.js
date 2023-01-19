import React from "react";

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            show: [],
            base: [],
            isLoading: true
        }
    }

    async dropAPI() {
        await fetch(`${process.env.REACT_APP_BACKURL}/dataAPI/${this.props.base}666`)
        .then(res => res.text())
        .then(res => this.setState({ base: JSON.parse(res), isLoading: false }))
        .catch(err => err);
    }


   async dropClick() {

        await this.dropAPI()
        .then(setTimeout(() => {
            this.setState ({ open: !this.state.open })
        }, 60))
    }

    showHandleClick(nome) {
        if (!this.state.show.includes(nome)) {
            this.setState ({show: [nome]})
        }
        else { this.setState ({show: []}) }
    }

    flushClick (e) {
        if (e.target.toString() === "[object HTMLDivElement]") {
        if (this.state.show.length > 0) {
            this.setState ({ show: [] })
        }  
    }
    }

    tagHelper() {
        if (this.props.nome === "abilita_innate") {
            return "Abilità innate"
           }
        else {
            return this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)
        }
    }

    match(elemName, docName, detail1 = "", detail2 = "", detail3 = "") {
            if (arguments.length === 5) {
                return (docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2][detail3])
            }
            else if (arguments.length === 4) {
                return (docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2]) 
            }
            else {
                return (docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1]) 
            }
        }

    render() {

        let data = this.props.data;
        let base = this.state.base;
        let arry = []; 
        let show = this.state.show

        if (this.state.isLoading) {
            return ( 
                <div className="dropdown-outer"> 
                    <div className="dropdown-tag" onClick={() => {this.dropClick()}}>
                        <h2 className="dropdown-text" >{this.tagHelper()}</h2>
                        <img className={"svgarrow open" + this.state.open} src="/images/chevron.png" />
                    </div>
                </div>
             ) 
        }

        else {

        return (
            <div className="dropdown-outer"> 
                <div className="dropdown-tag" onClick={() => {this.dropClick()}}>
                    <h2 className="dropdown-text" >{this.tagHelper()}</h2>
                    <img className={"svgarrow" + " open" + this.state.open} src="/images/chevron.png" />
                </div>
                {/*************** INNER DROPDOWN ***************/}
                <div className={"dropdown-father open" + this.state.open}>
                    {((typeof data === "object" && data.length > 0) || typeof data === "undefined") &&
                    <div className={"dropdown-bg open" + this.state.open}>
                        <div className={"dropdown-inner open" + this.state.open} onClick={(event) => this.flushClick(event)}>
                            <div className="padding-container">
                                <div className={"open" + this.state.open}>    
                                { this.props.nome !== "background" && 
                                    (data.map(d => {
                                        {/********** INVENTARIO SPECIAL **********/}
                                        if (typeof d === "object") {
                                            if ((d.nome.includes("_") && arry.length === 0) || (d.nome.includes("_")
                                            && arry[0].substring(0, arry[0].indexOf("_")) !== d.nome.substring(0, d.nome.indexOf("_")) 
                                            && arry.length > 0)) {
                                                arry = []
                                                arry.push(d.nome)
                                                return (
                                                    <div className={"card open" + this.state.open}>
                                                        <div className="card-dropdown">
                                                            <img onClick={() => this.showHandleClick(d.nome)} className={"icon active" + (show.indexOf(d.nome) > -1)} src={"/images/icons/" + arry[0].substring(0, arry[0].indexOf("_")) + ".png"} />
                                                            <p className="card-name">{arry[0].substring(0, arry[0].indexOf("_"))}</p>
                                                            { this.match(d.nome, base, "summary") !== "\\" &&   
                                                            <p className={"summary show" + (show.indexOf(d.nome) > -1)}>{ this.match(d.nome, base, "summary") }</p>
                                                            }
                                                            <p className="quantity">{d.quantita}</p>
                                                            { this.match(d.nome, base, "magia") !== "\\" &&
                                                            <div>
                                                                <img src={"/images/magias/" + this.match(d.nome, base, "magia") + ".png"} className="crystal-spell" />
                                                            </div>
                                                            }
                                                            <div>
                                                                <img src="/images/bag.png" className="bag" />
                                                                <p className="quantity">{d.quantita}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else if (d.nome.includes("_") 
                                            && arry.length > 0) {
                                                return null
                                            }
                                            else {
                                                arry = []
                                                return (
                                                    <div className={"card open" + this.state.open}>
                                                        <div className="card-dropdown">
                                                            <img onClick={() => this.showHandleClick(d.nome)} className={"icon active" + (show.indexOf(d.nome) > -1)} src={"/images/icons/" + d.nome + ".png"} />
                                                            <p className="card-name">{d.nome}</p>
                                                            { this.match(d.nome, base, "summary") !== "\\" &&   
                                                            <p className={"summary show" + (show.indexOf(d.nome) > -1)}>{ this.match(d.nome, base, "summary") }</p>
                                                            }
                                                            <p className="quantity">{d.quantita}</p>
                                                            { this.match(d.nome, base, "magia") !== "\\" &&
                                                            <div>
                                                                <img src={"/images/magias/" + this.match(d.nome, base, "magia") + ".png"} className="crystal-spell" />
                                                            </div>
                                                            }
                                                            <div>
                                                                <img src="/images/bag.png" className="bag" />
                                                                <p className="quantity">{d.quantita}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        } 
                                        {/********** ABILITIES, MAGIC, ETC. **********/}
                                        {/******** CHECK "_" CONDITION ********/}
                                        if ((d.includes("_") && arry.length === 0) || (d.includes("_")
                                        && arry[0].substring(0, arry[0].indexOf("_")) !== d.substring(0, d.indexOf("_")) 
                                        && arry.length > 0)) {
                                            arry = []
                                            arry.push(d)
                                            return (
                                            <div className={"card open" + this.state.open}>
                                                <div className="card-dropdown">
                                                    <img onClick={() => this.showHandleClick(d)} className={"icon active" + (show.indexOf(d) > -1)} src={"/images/icons/" + arry[0].substring(0, arry[0].indexOf("_")) + ".png"} />
                                                    <p className="card-name">{arry[0].substring(0, arry[0].indexOf("_"))}</p>
                                                    { this.match(d, base, "summary") !== "\\" &&   
                                                    <p className={"summary show" + (show.indexOf(d) > -1)}>{ this.match(d, base, "summary") }</p>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "mana") !== 0 &&
                                                    <div>
                                                        <img src="/images/mana.png" className="mana-bottle" />
                                                        <p>{ this.match(d, base, "costo", "mana") }</p>
                                                    </div>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "mana") === 0 &&
                                                    <div>
                                                        <img src="/images/mana.png" className="mana-bottle" />
                                                        <p className="mana-cost">?</p>
                                                    </div>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "skill") === "pratica_magica" &&
                                                    <div>
                                                        <img src="/images/magias/pratica_magica_ruota.png" className="magic-wheel" />
                                                        { this.match(d, base, "costo", "cd") !== 0 &&
                                                        <p className="cd-cost">{ this.match(d, base, "costo", "cd") }</p>
                                                        }
                                                        { this.match(d, base, "costo", "cd") === 0 &&
                                                        <p className="cd-cost">?</p>
                                                        }
                                                    </div>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "petali") !== undefined &&
                                                    <div>
                                                        <img src="/images/petali.png" className="petali" />
                                                        <p className="petali-cost"> { this.match(d, base, "costo", "petali") }</p>
                                                    </div>
                                                    }
                                                    {this.match(d, base, "daylimit") !== undefined &&
                                                    <div>
                                                        {Array(this.match(d, base, "combatlimit")).fill(<img src="/images/daylimit.png" className='daylimit' style={{width: "12px"}}/>)}
                                                    </div>
                                                    }
                                                    {this.match(d, base, "combatlimit") !== undefined &&
                                                    <div>
                                                        {Array(this.match(d, base, "combatlimit")).fill(<img src="/images/combatlimit.png" className='combatlimit' style={{width: "7px"}}/>)}
                                                    </div>
                                                    }
                                                    {(this.props.nome === "attacchi") && 
                                                    <img src={"/images/" + this.match(d, base, "check") + ".png"} className="dial"/>
                                                    }                   
                                                    {(this.props.nome === "attacchi") && 
                                                    <img src = {"/images/dice/" + this.match(d, base, "effetto", "danni") + ".png"} className="d8s"/>
                                                    }       
                                                </div>        
                                            </div>
                                            )
                                        }
                                        else if (d.includes("_") 
                                        && arry.length > 0) {
                                            return null
                                        }
                                        else {
                                            arry = []
                                            return (
                                            <div className={"card open" + this.state.open}>
                                                <div className="card-dropdown">
                                                    <img onClick={() => this.showHandleClick(d)} className={"icon active" + (show.indexOf(d) > -1)} src={"/images/icons/" + d + ".png"} />
                                                    <p className="card-name">{d}</p>
                                                    { this.match(d, base, "summary") !== "\\" &&   
                                                    <p className={"summary show" + (show.indexOf(d) > -1)}>{ this.match(d, base, "summary") }</p>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "mana") !== 0 &&
                                                    <div>
                                                        <img src="/images/mana.png" className="mana-bottle" />
                                                        <p className="mana-cost">{ this.match(d, base, "costo", "mana") }%</p>
                                                    </div>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "mana") === 0 &&
                                                    <div>
                                                        <img src="/images/mana.png" className="mana-bottle" />
                                                        <p className="mana-cost">?</p>
                                                    </div>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "skill") === "pratica_magica" &&
                                                    <div>
                                                        <img src="/images/magias/pratica_magica_ruota.png" className="magic-wheel" />
                                                        { this.match(d, base, "costo", "cd") !== 0 &&
                                                        <p className="cd-cost">{ this.match(d, base, "costo", "cd") }</p>
                                                        }
                                                        { this.match(d, base, "costo", "cd") === 0 &&
                                                        <p className="cd-cost">?</p>
                                                        }
                                                    </div>
                                                    }
                                                    {(this.props.nome === "magie") && this.match(d, base, "costo", "petali") !== undefined &&
                                                    <div>
                                                        <img src="/images/petali.png" className="petali" />
                                                        <p className="petali-cost"> { this.match(d, base, "costo", "petali") }</p>
                                                    </div>
                                                    }
                                                    {this.match(d, base, "daylimit") !== undefined &&
                                                    <div>
                                                        {Array(this.match(d, base, "combatlimit")).fill(<img src="/images/daylimit.png" className='daylimit' style={{width: "12px"}}/>)}
                                                    </div>
                                                    }
                                                    {this.match(d, base, "combatlimit") !== undefined &&
                                                    <div>
                                                        {Array(this.match(d, base, "combatlimit")).fill(<img src="/images/combatlimit.png" className='combatlimit' style={{width: "7px"}}/>)}
                                                    </div>
                                                    }
                                                    {(this.props.nome === "attacchi") && 
                                                    <img src={"/images/" + this.match(d, base, "check") + ".png"} className="dial"/>
                                                    }                   
                                                    {(this.props.nome === "attacchi") && 
                                                    <img src = {"/images/dice/" + this.match(d, base, "effetto", "danni") + ".png"} className="d8s"/>
                                                    }              
                                                </div>                                        
                                            </div>
                                            )
                                        }
                                    }))
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                }</div>
            </div>
            ) 
        }
    }
}


