import supabase from '../supabase/supabase'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { snippetActions } from '../store/snippetSlice'
import { Link } from 'react-router-dom'
import Snippet from '../components/Snippet'
import './SnippetList.css'

export default function SnippetList() {
    const dispatch = useDispatch()
    const snippets = useSelector(state => state.snippets.snippets)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function getSnippets() {
            const { data, error } = await supabase
                .from('snippets')
                .select()

            if (error) {
                console.log(error)
            }
            if (data) {
                setIsLoaded(true)
            }
            dispatch(snippetActions.saveSnippets(data))
        }
        getSnippets()
    }, [dispatch])

    return (
        <div className='snippets-list'>
            <Link to='/' className='list-nav'>New Snippet</Link>
            {isLoaded || <div>Loading...</div>}
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
