import React from 'react'
import {Link} from 'react-router-dom'

let getTime = (note) =>{
  return new Date(note.updated).toLocaleDateString()
}
let getContent = (note) =>{
  let title = getTitle(note)
  let content = note.body.replaceAll('\n',' ')
  content = content.replaceAll(title,'')
  if(content.length > 45){
    return content.slice(0,45) + '...'
  } else {
    return content
  }
}

let getTitle = (note)=>{
  let title = note.body.split('\n')[0]
  if (title.legth > 45){
    return title.slice(0,45)
  }
  return title
}
const Listitem = ({note}) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item"> 
          <h1>{getTitle(note)}</h1>
          <p><span>{getTime(note)}</span>{getContent(note)}</p>
      </div>
    </Link>
  )
}

export default Listitem
