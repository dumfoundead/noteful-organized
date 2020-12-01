import React from 'react'

export default function AddNav(props) { 
    
    return (
        <div className='sidebar'>
            <button
                onClick={()=> props.history.goBack()}>
                GO BACK
            </button>
        </div>
    )
}