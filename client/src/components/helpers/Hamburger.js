import React from 'react'
import '../../styles/helpers/Hamburger.css'

const Hamburger = props => {
    const { toggleMenu, showMenu } = props
    return (
        <div
            className='hamburger'
            onClick={() => toggleMenu()}
        >
            <div
                className={
                    showMenu ?
                        'hamburger-bar x-rect1'
                    :
                        'hamburger-bar hamburger-rect1'
                }
            />
            <div
                className={
                    showMenu ?
                        'hamburger-bar x-rect2'
                    :
                        'hamburger-bar hamburger-rect2'
                }
            />
            <div
                className={
                    showMenu ?
                        'hamburger-bar x-rect3'
                    :
                        'hamburger-bar hamburger-rect3'
                }
            />
        </div>
    )
}

export default Hamburger