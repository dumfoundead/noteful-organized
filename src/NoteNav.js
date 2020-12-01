import React from 'react' 
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types'

class NoteNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    render() {

        const findFolder = (folders=[], folderId) =>
        folders.find(folder => folder.id === folderId)

        const findNote = (notes=[], noteId) =>
        notes.find(note => note.id === noteId)

        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)

    // const note = this.context.notes.find(note => note.id === this.props.match.params.noteId)
    // const noteFolder = note.folderId
    // const folderName = this.context.folders.find( folder => folder.id === noteFolder)

        return (
            <div className='sidebar'>
                <h2>Note Sidebar</h2>
                <br />
                <button
                    onClick={()=> this.props.history.goBack()}
                >
                    GO BACK
                </button>
                <br />
                <br />
                <p>Your current folder is:</p>
                <h3>
                    {folder.name}
                </h3>
                
            </div>
        )
    }
}

NoteNav.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }), 
    history: PropTypes.object.isRequired
}


export default NoteNav