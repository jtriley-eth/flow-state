import React, { useState } from 'react'
import { connect } from 'react-redux'
import Blockies from 'react-blockies'
import StreamVisual from './StreamVisual'
import arrow from '../../assets/arrow.svg'
import chevron from '../../assets/chevron.svg'
import '../../styles/helpers/Flows.css'

const FlowListItem = props => {
    const { flow, inFlow } = props
    const [collapsed, setCollapsed] = useState(true)

    const shortAddr = address => {
        const start = address.substring(0, 5)
        const end = address.substring(address.length - 5, address.length)
        return `${start}..${end}`
    }

    return (
        <div className='flows-item-container'>
            <div className='flows-item'>
                <div className='flows-address-container'>
                    <Blockies
                        seed={flow.owner.id}
                        size={8}
                        scale={4}
                        className='identicon'
                    />
                    <p className='flows-item-data'>
                        {shortAddr(flow.owner.id)}
                    </p>
                </div>
                <img src={arrow} alt='arrow' style={{ width: 36 }} />
                <div className='flows-address-container'>
                    <Blockies
                        seed={flow.recipient.id}
                        size={8}
                        scale={4}
                        className='identicon'
                    />
                    <p className='flows-item-data'>
                        {shortAddr(flow.recipient.id)}
                    </p>
                </div>
                <img
                    src={chevron}
                    alt='chevron'
                    style={{
                        transform: `rotateZ(${collapsed ? '0' : '180deg'})`,
                        transition: 'transform 0.5s'
                    }}
                    className='noselect'
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>
            {
                collapsed ? null :
                <div style={{marginTop: 8}}>
                    <p className='flows-item-label'>
                        Token:
                        <span className='flows-item-data'>
                            {flow.token.name}
                        </span>
                    </p>
                    <p className='flows-item-label'>
                        Flow Rate:
                        <span className='flows-item-data'>
                            {flow.flowRate * 10e-18} {flow.token.symbol}/ Second
                        </span>
                    </p>
                    <p className='flows-item-label'>
                        Tokens Streamed:
                        <StreamVisual
                            lastUpdate={flow.lastUpdate}
                            flowRate={flow.flowRate}
                            className='flows-item-data'
                            inFlow={inFlow}
                            sum={flow.sum}
                        />
                    </p>
                </div>
            }
        </div>
    )
}

const Flows = props => {
    const { flows } = props.user
    const inFlows = flows.inFlows.filter(flow => flow.flowRate !== '0')
    const outFlows = flows.outFlows.filter(flow => flow.flowRate !== '0')
    return (
        <div className='flows'>
            <div className='flows-header'>
                <h2 className='flows-h2'>Active Flows</h2>
            </div>
                {
                    inFlows.length > 0 ?
                        <div className='flows-list inflow'>
                            <h3 className='flows-h3'>In Flows</h3>
                            {
                                inFlows.map((flow, index) => {
                                    return (
                                        <FlowListItem
                                            key={index.toString()}
                                            flow={flow}
                                            inFlow={true}
                                        />
                                    )
                            })
                            }
                        </div>
                    :
                        null
                }
                {
                    outFlows.length > 0 ?
                        <div className='flows-list outflow'>
                            <h3 className='flows-h3'>Out Flows</h3>
                            {
                                outFlows.map((flow, index) => {
                                    return (
                                        <FlowListItem
                                            key={index.toString()}
                                            flow={flow}
                                            inFlow={false}
                                        />
                                    )
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
    user: state.user
})

export default connect(mapStateToProps, null)(Flows)