import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { Link } from 'react-router-dom';
import supabase from '../supabase/supabase';
import './Editor.css'


export default function Editor() {
    const [htmlCode, setHtmlCode] = useState('')
    const [cssCode, setCssCode] = useState('')
    const [javascriptCode, setJavascriptCode] = useState('')
    const [document, setDocument] = useState('')
    const [title, setTitle] = useState('')

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

    async function handleAddSnippet(e){
        e.preventDefault()
        const {data, error} = await supabase
        .from('snippets')
        .insert([
            {title: title, html: htmlCode, css: cssCode, javascript: javascriptCode},
        ])
        console.log(data, error)
    }

    function handleInput(e){
        setTitle(e.target.value)
    }

    return (
        <div className='app'>
            <div className='editors'>
            <div className='edit__nav'>
                    <Link to='/snippets'>My Snippets</Link>
                    {/* <Link to='/'>New Snippet</Link> */}
                </div>
                <form className='save-form' onSubmit={handleAddSnippet} action="">
                    <input onChange={handleInput} placeholder="Title" required type="text" name='title' />
                    <button className='save-btn'>Save Snippet</button>
                </form>
                <div className='run-container'>
                    <h2 className='editor__heading'>HTML</h2>
                    <button onClick={handleRunCode} className='run-btn'>Run<span className="material-symbols-outlined">play_arrow</span></button>
                </div>
                <CodeMirror
                    extensions={html()}
                    className='editor'
                    height='100%'
                    theme={vscodeDark}
                    onChange={onHtmlChangeHander}
                />
                <h2 className='editor__heading'>CSS</h2>
                <CodeMirror
                    extensions={css()}
                    height='100%'
                    className='editor'
                    theme={vscodeDark}
                    onChange={onCssChangeHander}

                />
                <h2 className='editor__heading'>JavaScript</h2>
                <CodeMirror
                    height='100%'
                    extensions={javascript()}
                    className='editor'
                    theme={vscodeDark}
                    onChange={onJsChangeHander}
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
