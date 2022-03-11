import { useState } from 'react'

function EntryFormComponent({ postNewEntry }) {
    const [ title, setTitle ] = useState()
    const [ author, setAuthor ] = useState()
    const [ content, setContent ] = useState()

    return (
        <div style={{ marginTop: "10px", marginBottom: "10px", border: "solid" }}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>

            <button onClick={() => postNewEntry({ title, author, content })}>Post Entry!!!</button>
        </div>
    )
}

export default EntryFormComponent