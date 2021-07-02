import React, { useState } from 'react'

const DownloadFile = props => {
    // const { fileType, data } = props
    const fileType = 'json'
    const fileName = 'history.json'
    const data = [
        { state: "Arizona", electors: 11 },
        { state: "Florida", electors: 29 },
        { state: "Iowa", electors:  6 },
        { state: "Michigan", electors: 16 },
        { state: "North Carolina", electors: 15 },
        { state: "Ohio", electors: 18 },
        { state: "Pennsylvania", electors: 20 },
        { state: "Wisconsin", electors: 10 },
    ]
    const [downloadUrl, setDownloadUrl] = useState(null)
    const [status, setStatus] = useState('')

    const download = e => {
        e.preventDefault()
        let output
        if (fileType === 'json') {
            output = JSON.stringify({ history: data }, null, 4)
        }
        const blob = new Blob([output])
        const fileDownloadUrl = URL.createObjectURL(blob)
        

    }


    

    return (
        <div>
            Download
        </div>
    )
}