import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from './Header'
import FolderNav from './FolderNav'
import NoteNav from './NoteNav'
import AddNav from './AddNav'
import NotefulContext from './NotefulContext'
import NoteList from './NoteList'
import NotePage from './NotePage'
import AddFolder from './AddFolder'
import AddNote from './AddNote'
import NotefulError from './NotefulError'

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  } 

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders')
    ])
      .then(([notesRes, foldersRes]) => {
          if (!notesRes.ok)
              return notesRes.json().then(e => Promise.reject(e));
          if (!foldersRes.ok)
              return foldersRes.json().then(e => Promise.reject(e));

          return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
          this.setState({notes, folders});
      })
      .catch(error => {
          console.error({error});
      });
  }

  handleDeleteNote = (noteId) => {
    const filteredNotes = this.state.notes.filter( notes => notes.id !== noteId)
    this.setState({
      notes: filteredNotes
    })
  }

  handleAddFolder = (folder) => {
    console.log('add folder on App', folder)
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = (note) => {
    
  }
  
  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote, 
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
      }

    return (
      <NotefulContext.Provider value={value}>
        <div className='App'>
          <header>
            <Header />
          </header>
          <hr />
          <div className='group'>
            <nav>
              <Switch>
                <NotefulError>
                  <Route 
                      exact path='/'
                      component={FolderNav}
                  /> 
                  <Route 
                      path='/folder/:folderId'
                      component={FolderNav}
                    />
                  <Route 
                    path='/notes/:noteId'
                    component={NoteNav}
                  />
                  <Route
                    path={['/add-folder', '/add-note']}
                    component={AddNav}
                  />
                </NotefulError>
              </Switch>
            </nav>
            <hr />
            <main>
              <Switch>
                <NotefulError>
                  <Route 
                    exact path='/' 
                    component={NoteList} 
                  />
                  
                  <Route 
                    path='/folder/:folderId'
                    component={NoteList}
                  />
                  <Route 
                    path='/notes/:noteId'
                    component={NotePage}
                  />
                  <Route 
                    path='/add-folder'
                    component={AddFolder}
                  />
                  <Route 
                    path='/add-note'
                    component={AddNote}
                  />
                </NotefulError>
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    )
  }
}

export default App;
