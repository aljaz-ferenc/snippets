import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className='navigation'>
        <NavLink to='/'>Editor</NavLink>
        <NavLink to='snippets'>My Snippets</NavLink>
    </div>
  )
}
