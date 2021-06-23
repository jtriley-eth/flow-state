import React from 'react'
import '../../styles/helpers/Sidebar.css'

const Sidebar = props => {
    const { showMenu } = props
    return (
        <div
            className='sidebar'
            style={{
                width: showMenu ? 200 : 0
            }}
        >
            <div className='sidebar-header'>
                <h2 className='sidebar-h2'>Sidebar</h2>
            </div>
        </div>
    )
}

export default Sidebar