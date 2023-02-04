import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { activeActions } from '../store/activeSlice'
import supabase from '../supabase/supabase'
import './Snippet.css'

export default function Snippet({ title, html, css, javascript, id }) {
  const dispatch = useDispatch()
  const [document, setDocument] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setDocument(`
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${javascript}</script>
    </html>
  `)
  }, [html, css, javascript])

  function handleEdit() {
    dispatch(activeActions.setActive(id))
    navigate('/edit')
  }

  async function handleDelete(){
    await supabase
      .from('snippets')
      .delete()
      .eq('id', id)

      window.location.reload()
  }

  return (
    <div className='snippet'>
      <div className='snippet__title'>{title}</div>
      <iframe
        srcDoc={document}
        frameBorder="0"
        className='display__snippet'
        title='snippet'
      />
      <div className='snippet-btns'>
      <button onClick={handleEdit} className='edit-btn'><span className="material-symbols-outlined">edit_square</span></button>
      <button onClick={handleDelete} className='edit-btn edit-btn-delete'><span className="material-symbols-outlined">delete_forever</span></button>
      </div>
    </div>
  )
}