import React from 'react'
import { NavLink} from 'react-router-dom'
import './Navigation.css'
import logo from '../images/logo.png'

export default function Navigation() {
  return (
    <div className='navigation'>
        <NavLink to='/'>Editor</NavLink>
        <NavLink to='snippets'>My Snippets</NavLink>
        <img className='logo' src={logo} alt="" />
    </div>
  )
}
