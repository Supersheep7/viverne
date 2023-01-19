import React from 'react';

export default class AddAPI extends React.Component {
    
  constructor(props) {
      super(props)
      this.state = {
        hover: [],
        bonus: [],
        isLoading: true
      }
  }

  async adderAPI() {
    await fetch(`${process.env.REACT_APP_BACKURL}/dataAPI/bonus666`)
        .then(res => res.text())
        .then(res => this.setState({ bonus: JSON.parse(res), isLoading: false }))
        .catch(err => err);
  }

  match(elemName, docName, detail1, detail2 = "", detail3 = "") {

    if (arguments.length === 5) {
      return docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2][detail3]
    }
    else if (arguments.length === 4) {
      return docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2]
    }
    else {
      return docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1]
    }
  
  }
  
  turnOn(b) {
      this.props.active.push(b)
  }

  turnOff(b) {
    let dropBoy = this.props.active.indexOf(b)
    if (dropBoy > -1) { this.props.active.splice(dropBoy, 1) }
  }
  
  hoverOn(b) {
    this.state.hover.push(b)
  }

  hoverOff(b) {
    let dropBoy = this.state.hover.indexOf(b)
    if (dropBoy > -1) { this.state.hover.splice(dropBoy, 1) }
  }

  cleanName(string) {
    let newString
    if (string.includes("_")) {
      return newString = string.substring(0, string.indexOf("_"))
    }
    else return string
  }
  
  render() {
    let bonus = this.state.bonus

    if (this.state.isLoading) {
      return null
    }

    else {

      return (
        <div className='icons'>
        {this.props.data.bonus.map(d => {
          // Renders clean button
          const stat = this.match(d, bonus, "modificatore", "skill")
          const statSlice = stat.slice(0, 3).toLowerCase()
          if (
            (this.props.modificatore.skill === this.match(d, bonus, "modificatore", "skill"))
            // Checks stat modifiers
            || (this.props.data.stats[stat] !== undefined
            && this.props.data.skills[`${statSlice}skills`].hasOwnProperty(this.props.modificatore.skill))
            || (this.match(d, bonus, "modificatore", "skill") === "\\")
          ) {
            if (!this.props.active.includes(d)) {
              return (
                <div className="flex column addcard">
                  <img onClick={() => {this.props.add(this.match(d, bonus, "modificatore", "bonus")); this.turnOn(d)}}
                  className="icon" src={"/images/icons/" + this.cleanName(d) + ".png"} />
                  <div className="add-summary cardactivetrue">
                    <h2 className="iconTitle">{this.cleanName(d)}</h2>
                    <p>{this.match(d, bonus, "summary")}</p>
                  </div>
                </div>     
                )
              }
            else {
              return (
                <div className="flex column addcard">
                  <img onClick={() => {this.props.add(-(this.match(d, bonus, "modificatore", "bonus"))); this.turnOff(d)}}
                  className="icon active" src={"/images/icons/" + this.cleanName(d) + ".png"} />
                  <div className="add-summary cardactivetrue">
                    <h2 className="iconTitle">{this.cleanName(d)}</h2>
                    <p>{this.match(d, bonus, "summary")}</p>
                  </div>
                </div>
              )
              }
            }
          })
        }
        </div>
      )
    }
  }

  componentDidMount() {
    try {this.adderAPI()
    } catch (e) {console.log(e)}
  }

}
