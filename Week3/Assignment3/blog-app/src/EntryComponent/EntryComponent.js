import './EntryComponent.css'

function EntryComponent({ title, content, author}) {
    return (
        <div style={{ border: 'solid', marginTop: "10px", marginBottom: "10px" }}>
            <h1>{title}</h1>
            <p>{content}</p>
            <small>{author}</small>
        </div>
    )
}

export default EntryComponent;