import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { useSelector } from 'react-redux';
import supabase from '../supabase/supabase';
import { useNavigate } from 'react-router';
import './Edit.css'

export default function Edit() {
    const activeID = useSelector(state => state.active.active)
    const snippets = useSelector(state => state.snippets.snippets)
    const [htmlCode, setHtmlCode] = useState('')
    const [cssCode, setCssCode] = useState('')
    const [javascriptCode, setJavascriptCode] = useState('')
    const [document, setDocument] = useState('')
    const navigate = useNavigate()
    const activeSnippet = snippets.find(snip => snip.id === activeID)
    
    function onHtmlChangeHander(e) {
        setHtmlCode(e)
    }

    function onCssChangeHander(e) {
        setCssCode(e)
    }

    function onJsChangeHander(e) {
        setJavascriptCode(e)
    }

    function handleRunCode() {
        setDocument(`
        <html>
        <body>${htmlCode}</body>
        <style>${cssCode}</style>
        <script>${javascriptCode}</script>
        </html>
        `)
    }

    useEffect(() => {
        setHtmlCode(activeSnippet.html)
        setCssCode(activeSnippet.css)
        setJavascriptCode(activeSnippet.javascript)
    }, [activeSnippet.css, activeSnippet.html, activeSnippet.javascript])

    async function handleUpdateSnippet() {
        if (!htmlCode && !cssCode && !javascriptCode) {
            return
        }
        await supabase
            .from('snippets')
            .update({
                html: htmlCode,
                css: cssCode,
                javascript: javascriptCode,
            })
            .eq('id', activeID)
            .select('*')

            navigate('/snippets')
    }


    return (
        <div className='app'>
            <div className='editors'>
                <h1 className='edit__title'>{'Edit: ' + activeSnippet.title.toUpperCase()}</h1>
                <div className='run-container'>
                    <h2 className='editor__heading'>HTML</h2>
                    <button onClick={handleUpdateSnippet} className='update-btn'>Update<span className="material-symbols-outlined">upgrade</span></button>
                    <button onClick={handleRunCode} className='run-btn'>Run<span className="material-symbols-outlined">play_arrow</span></button>
                </div>
                <CodeMirror
                    extensions={html()}
                    className='editor'
                    height='100%'
                    theme={vscodeDark}
                    onChange={onHtmlChangeHander}
                    value={activeSnippet.html ? activeSnippet.html : ''}
                />
                <h2 className='editor__heading'>CSS</h2>
                <CodeMirror
                    extensions={css()}
                    height='100%'
                    className='editor'
                    theme={vscodeDark}
                    onChange={onCssChangeHander}
                    value={activeSnippet.css ? activeSnippet.css : ''}
                    />
                <h2 className='editor__heading'>JavaScript</h2>
                <CodeMirror
                    height='100%'
                    extensions={javascript()}
                    className='editor'
                    theme={vscodeDark}
                    onChange={onJsChangeHander}
                    value={activeSnippet.javascript ? activeSnippet.javascript : ''}
                    />
            </div>
            <iframe
                srcDoc={document}
                frameBorder="0"
                className='display'
                title='editor'
                />
        </div>
    )
}
