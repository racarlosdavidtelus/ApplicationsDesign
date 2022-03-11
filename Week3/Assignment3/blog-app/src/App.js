import './App.css';
import EntryComponent from './EntryComponent/EntryComponent';
import EntryFormComponent from './EntryFormComponent/EntryFormComponent';
import { useState, useEffect } from 'react'
import credentials from './config/config';
const contentful = require("contentful");
const contentfulmanagment = require('contentful-management')

const client = contentful.createClient({
  space: credentials.SPACE_ID,
  accessToken: credentials.TOKEN_CONTENT_DELIVERY
});

const clientmanagment = contentfulmanagment.createClient({
  accessToken: credentials.TOKEN_CONTENT_MANAGEMENT
})

function App() {
  const [entries, setEntries] = useState([])
  
  const getAllPost = () => {
    client
    .getEntries(credentials.SPACE_ID)
    .then(entry => { 
      console.log(entry.items)
      const result = entry.items.map(element => {
        return { title: element.fields.title, content:element.fields.content, author:element.fields.author}
      })
      setEntries(result)
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getAllPost()
  },[]);

  const addNewEntry = (entry) => {
    //const newEntries = [...entries, entry]
    //setEntries(newEntries)
    clientmanagment.getSpace(credentials.SPACE_ID)
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.createEntry('post',{
      fields: {
        title: {
          'en-US': entry.title
        },
        content: {
          'en-US': entry.content
        },
        author: {
          'en-US': entry.author
        }
      }
    }))
    .then((entry) => entry.publish())
    .then((entry) => {
      console.log(entry)
      getAllPost()
    })
    .catch(console.error)
    
  }

  
  

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.


  return (
    <div>
      <EntryFormComponent postNewEntry={addNewEntry} />
      {
        entries.map(element => (
          <EntryComponent key={element.title} title={element.title} content={element.content} author={element.author} />
        ))
      }
    </div>
  )
}

export default App;
