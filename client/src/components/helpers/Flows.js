import React from 'react'
import { connect } from 'react-redux'
import Blockies from 'react-blockies'
import arrow from '../../assets/arrow.svg'
import chevron from '../../assets/chevron.svg'
import '../../styles/helpers/Flows.css'

const FlowListItem = props => {
    const { flow } = props
    
    const shortAddr = address => {
        const start = address.substring(0, 5)
        const end = address.substring(address.length - 5, address.length)
        return `${start}...${end}`
    }

    return (
        <div className='flows-item'>
            <div className='flows-address-container'>
                <Blockies
                    seed={flow.owner.id}
                    size={8}
                    scale={4}
                    className='identicon'
                />
                <p className='flows-address'>{shortAddr(flow.owner.id)}</p>
            </div>
            <img src={arrow} alt='arrow' />
            <div className='flows-address-container'>
                <Blockies
                    seed={flow.recipient.id}
                    size={8}
                    scale={4}
                    className='identicon'
                />
                <p className='flows-address'>{shortAddr(flow.recipient.id)}</p>
            </div>
            <img src={chevron} alt='chevron' />
        </div>
    )
}

const Flows = props => {
    const { inFlows, outFlows } = props.flows.flows
    return (
        <div className='flows'>
            <div className='flows-header'>
                <h2 className='flows-h2'>Active Flows</h2>
            </div>
                {
                    inFlows.length > 0 ?
                        <div className='flows-list'>
                            <h3 className='flows-h3'>In Flows</h3>
                            {
                                inFlows.map(flow => {
                                    return <FlowListItem key={flow.id} flow={flow}/>
                            })
                            }
                        </div>
                    :
                        null
                }
                {
                    outFlows.length > 0 ?
                        <div className='flows-list'>
                            <h3 className='flows-h3'>Out Flows</h3>
                            {
                                outFlows.map(flow => {
                                    return <FlowListItem key={flow.id} flow={flow}/>
                                })
                            }
                        </div>
                    :
                        null
                }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    flows: state.flows
})

export default connect(mapStateToProps, null)(Flows)