import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'

class FolderNav extends React.Component {
    static contextType = NotefulContext;

    render() {
        //const folders = this.context.folders
     
    return (
        <div className='sidebar'>
            <h2>Folders</h2>
            <ul>
                {this.context.folders.map( folder => {
                    return (
                        <li key={folder.id} >
                            <NavLink to={`/folder/${folder.id}`}>
                            {folder.name}
                            </NavLink>
                        </li>
            )
        })}
            </ul>
            <button
                className='addButton'
                >
                    <Link to='/add-folder'>
                        ADD FOLDER
                    </Link>
                
            </button>
        </div>
    )
}
}

export default FolderNav