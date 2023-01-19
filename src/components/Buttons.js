import React from 'react';

class Buttons extends React.Component {
    
    render() {
    
    return (
        <div className={this.props.className}>
            <a href={"/personaggio/Kalim%20Malik"}><img className="btneye" src="/images/Kalim Malik button.png"  /></a>
            <a href={"/personaggio/Guiburgis"}><img className="btneye" src="/images/Guiburgis button.png" /></a>
            <a href={"/personaggio/Aruhara%20Mitski"}><img className="btneye" src="/images/Aruhara Mitski button.png" /></a>
            <a href={"/personaggio/Kleonikos%20da%20Bolina"}><img className="btneye" src="/images/Kleonikos da Bolina button.png" /></a>
            <a href={"/personaggio/Syd%20Rodrigo%20da%20Gorbuc"}><img className="btneye" src="/images/Syd Rodrigo da Gorbuc button.png" /></a>
        </div>
    )
    }
}

export default Buttons