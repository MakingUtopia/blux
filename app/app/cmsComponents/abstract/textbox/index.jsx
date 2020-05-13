import React from 'react'
import { inheritClasses } from '../../../misc'
import './styles.css'

export default function Textbox(props) {
    //const ref = React.createRef(null)
    return (
        <input
            className={inheritClasses(props, "blux-textbox")}
            type="text"
            placeholder={props.children}
            onChange={props.onChange}
        />   
    )
}