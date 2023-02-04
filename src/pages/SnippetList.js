import supabase from '../supabase/supabase'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { snippetActions } from '../store/snippetSlice'
import Snippet from '../components/Snippet'
import './SnippetList.css'

export default function SnippetList() {
    const dispatch = useDispatch()
    const snippets = useSelector(state => state.snippets.snippets)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {            
        async function getSnippets() {
            const { data, error } = await supabase
                .from('snippets')
                .select()

            if (error) {
                setError(error.message)
                setIsLoaded(true)
            }
            if (data) {
                setIsLoaded(true)
                setError(null)
            }
            dispatch(snippetActions.saveSnippets(data))
        }
        getSnippets()
    }, [dispatch])

    return (
        <div className='snippets-list'>
            {isLoaded || <h2 className='loading'>Loading...</h2>}
            {error && <p className='error'>Error: {error}</p>}
            {snippets && snippets.map(snip => (
                <Snippet
                    key={snip.id}
                    title={snip.title}
                    html={snip.html}
                    css={snip.css}
                    javascript={snip.javascript}
                    id={snip.id}
                />
            ))}
        </div>
    )
}
