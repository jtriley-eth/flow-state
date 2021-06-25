import React from 'react'
import { connect } from 'react-redux'
import '../../styles/helpers/Flows.css'

const Flows = props => {
    return (
        <>
            <h2>Flows</h2>
        </>
    )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(Flows)