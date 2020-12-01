import React from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types'

class NoteList extends React.Component {
    static defaultProps = {
        match : { 
            params: {}
        }
    }
    static contextType = NotefulContext;

    render() {
        
        const getNotesForFolder = (notes=[], folderId) => (
            (!folderId)
              ? notes
              : notes.filter(note => note.folderId === folderId)
        )
        
        const folderId = this.props.match.params.folderId
        const notes = this.context.notes
        const notesForFolder = getNotesForFolder(notes, folderId)
        
        //const noteContext = this.context.notes || {}
        return (
            <div className='notelist'>
                <h2>
                    Note List
                </h2>
                <ul>
                    {notesForFolder.map( note => {
                        return (
                            <li key={note.id}>
                                <Note 
                                    id={note.id}
                                    name={note.name}
                                    modified={note.modified}
                                />
                            </li>
                        )
                    })}
                </ul>
                <button
                    className='addButton'
                    >
                        <Link to='/add-note'>
                            ADD NOTE
                        </Link>
                </button>
            </div>
        )
    }
}

NoteList.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            folderId: PropTypes.string
        })
    })
}

export default NoteList