import React, {Component} from 'react';
import "../css/MvPlayerListItem.css"
import {Link} from "react-router-dom";

class MvPlayerListItem extends Component {
    render () {
        const activeClass = this.props.active ? 'mvPlayerListItem active' : 'mvPlayerListItem';
        console.log(activeClass)
        return (
            <Link
                style={{ textDecoration: "none", color: "white"}}
                to={{
                    pathname:`/player/${this.props.id}`
                }}
            >
            <div className={activeClass}>
                <div className="mvPlayerListItem--number">{this.props.number}</div>
                <div className="mvPlayerListItem--title">{this.props.title}</div>
                <div className="mvPlayerListItem--time">{this.props.duration}</div>
            </div>
            <div className="mvPlayerListItem--divider"></div>
            </Link>
        )
    }
}

export {MvPlayerListItem}