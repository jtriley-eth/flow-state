import React from 'react'

const Hamburger = props => {
    const { toggleMenu } = props
    return (
        <svg
            width="32"
            height="21"
            viewBox="0 0 256 168"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleMenu()}
        >
            <rect
                y="72"
                width="256"
                height="24"
                rx="12"
                fill="#f0f0f0"
            />
            <rect
                width="256"
                height="24"
                rx="12"
                fill="#f0f0f0"
            />
            <rect
                y="144"
                width="256"
                height="24"
                rx="12"
                fill="#f0f0f0"
            />
        </svg>
    )
}

export default Hamburger