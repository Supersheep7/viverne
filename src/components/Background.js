import React from "react";


class Background extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            show: [],
            base: []
        }
    }

    dropClick() {
        this.setState ({
            open: !this.state.open
        })
    }
    
    tagHelper() {
        if (this.props.nome === "abilita_innate") {
            return "Abilità innate"
           }
        else {
            return this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)
        }
    }

    render() {

        let data = this.state.data

        return (
            <div className="dropdown-outer"> 
                <div className="dropdown-tag" onClick={() => this.dropClick()}>
                    <h2 className="dropdown-text" >{this.tagHelper()}</h2>
                    <img className={"svgarrow" + " open" + this.state.open} src="/images/chevron.png" />
                </div>

                {/*************** INNER DROPDOWN ***************/}
                <div className={"dropdown-father open" + this.state.open}>
                    {((typeof data === "object" && data.length > 0) || typeof data === "undefined") &&
                    <div className={"dropdown-bg open" + this.state.open}>
                        <div className={"dropdown-inner open" + this.state.open} onClick={(event) => this.flushClick(event)}>
                            <div className="padding-container">
                                {/********** BACKGROUND SPECIAL **********/}    
                                {this.props.nome === "background" &&
                                <p className={"background open" + this.state.open}>{this.props.data.background}</p>
                                }
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Background