import React from 'react'
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types'

class AddFolder extends React.Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: 'blank', 
                touched: false
            } 
        }
    }

    updateName = (name) => {
        console.log('update name')
        this.setState({
            name: {
                value: name, 
                touched: true
            }
        })
    }

    handleAddFolder = (e) => {
        console.log('addFolder on component')
        //e.preventDefault()
        const folder = {
            id: Math.ceil(Math.random() * 100000).toString(),
            //name: e.target['name'].value
            name: this.state.name.value
        }
       
        const options = {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json'
            }
        }

        fetch(`http://localhost:9090/folders`, options)
            .then(res => {
                if (!res.ok)
                return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then( data => {
                this.context.addFolder(data)
                console.log(data)
                
            })
            .catch(error => {
                console.error({ error })
            })
    }

    validateName() {
        let name = this.state.name.value.trim()
        if ( name.length === 0 ) {
            return 'Enter a folder name'
        } else if ( name.length < 4 ) {
            return 'Enter a longer name'
        }
    }

    render() {
        const nameError = this.validateName()
        return ( 
            <div>
                <h2>Folder Form</h2>
                <br />
                <form onSubmit={(e)=> this.handleAddFolder(e)}>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name'
                        onChange={(e)=> this.updateName(e.target.value)}
                        required
                    />
                     {this.state.name.touched && <ValidationError message={nameError} />}
                    <br />
                    <button
                        type='submit'
                        >
                            SUBMIT
                    </button>
                </form>   
            </div>
        )
    }
}

AddFolder.propTypes = {
    name: PropTypes.string
}

export default AddFolder