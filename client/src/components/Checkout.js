import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Blockies from 'react-blockies'
import '../styles/Checkout.css'
import { Redirect } from 'react-router-dom'
import search from '../assets/search.svg'
import { superfluidGoerliUrl } from '../constants/thegraph'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { createFlow } from '../redux/ActionCreators'

const Checkout = props => {
    const [redirect, setRedirect] = useState(false)
    const [receiver, setReceiver] = useState('')
    const [flowRate, setFlowRate] = useState(0)
    const [perSecond, setPerSecond] = useState(0)
    const [perDay, setPerDay] = useState(0)
    const [perYear, setPerYear] = useState(0)
    const [unit, setUnit] = useState(1)
    const [tokenSymbol, setTokenSymbol] = useState('')
    const [tokenID, setTokenID] = useState('')
    const [searchError, setSearchError] = useState('')
    const { user, createFlow } = props

    const secondsInDay = 86400
    const secondsInYear = 3.154e7
    const daysInYear = 365

    useEffect(() => {
        if (unit === 1) {
            setPerSecond(flowRate)
            setPerDay(flowRate * secondsInDay)
            setPerYear(flowRate * secondsInYear)
        } else if (unit === secondsInDay) {
            setPerSecond((flowRate / secondsInDay).toFixed(10))
            setPerDay(flowRate)
            setPerYear(flowRate * daysInYear)
        } else {
            setPerSecond((flowRate / secondsInYear).toFixed(10))
            setPerDay((flowRate / daysInYear).toFixed(10))
            setPerYear(flowRate)
        }
    },[flowRate, unit])

    const flowRateHandler = rate => {
        if (rate === '') {
            setFlowRate(0)
        } else {
            setFlowRate(parseInt(rate))
        }
    }

    const createStreamHandler = () => {
        createFlow(receiver, tokenSymbol, tokenID, perSecond)
        setRedirect(true)
    }

    const queryTheGraph = async symbol => {
        const query = `
        query {
            tokens(where: { symbol: "${symbol}" }) {
                id
            }
        }
        `
        const client = new ApolloClient({
            uri: superfluidGoerliUrl,
            cache: new InMemoryCache()
        })

        return client.query({ query: gql(query) })
            .then(data => {
                const { tokens } = data.data
                if (tokens.length > 0) {
                    return tokens[0].id
                } else {
                    return ''
                }
            })
            .catch(error => console.log(error))
    }

    const searchHandler = () => {
        setSearchError('')
        if (tokenSymbol !== '') {
            queryTheGraph(tokenSymbol)
                .then(id => {
                    if (id !== '') {
                        setTokenID(id)
                    } else {
                        setSearchError('Token Not Found!')
                    }
                })
                .catch(error => console.log(error))
        }
    }

    if (redirect) {
        return <Redirect to='/confirming' />
    }

    return (
        <div className='checkout'>
            <div className='card checkout-card'>
                <div className='card-header'>
                    <h2>Checkout</h2>
                </div>
                <div>
                    <div className='checkout-address-card'>
                        <div style={{ flex: 2 }}>
                            <Blockies
                                seed={user.account}
                                size={8}
                                scale={6}
                                className='identicon checkout-blockie'
                            />
                        </div>
                        <div className='checkout-address-card-content'>
                            <p>My Address</p>
                            <p>{user.account}</p>
                        </div>
                    </div>
                    <div className='checkout-rate'>
                        <h3 className='checkout-subheader'>Recipient</h3>
                        <Blockies
                            seed={receiver}
                            size={8}
                            scale={6}
                            className='identicon'
                        />
                        <input
                            className='input checkout-address-input'
                            onChange={e => setReceiver(e.target.value.toLowerCase())}
                            placeholder='0x...'
                            autoComplete='off'
                        />
                        <h3 className='checkout-subheader'>Super Token</h3>
                        <p>Search Symbol</p>
                        <div className='checkout-rate-group'>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <input
                                    className='input'
                                    value={tokenSymbol}
                                    onChange={e => setTokenSymbol(e.target.value)}
                                    placeholder='fDAIx'
                                    autoComplete='off'
                                />
                                <button
                                    className='checkout-search'
                                    onClick={() => searchHandler()}
                                >
                                    <img src={search} alt='search' width={16} />
                                </button>
                                <p
                                    className='error'
                                    style={{ marginLeft: 8 }}
                                >{searchError}</p>
                            </div>
                        </div>
                        <p style={{ margin: '8px 0 16px' }}>or</p>
                        <p>Token ID</p>
                        <div className='checkout-rate-group'>
                            <input
                                className='input checkout-address-input'
                                placeHolder='0x...'
                                autoComplete='off'
                                value={tokenID}
                                onChange={e => setTokenID(e.target.value)}
                            />
                        </div>
                        <h3 className='checkout-subheader'>Transfer Rate</h3>
                        <div className='checkout-rate-group'>
                            <input
                                className='input checkout-input'
                                type='number'
                                autoComplete='off'
                                placeholder='0.00'
                                onChange={e => flowRateHandler(e.target.value)}
                            />
                            <select
                                className='select'
                                style={{ margin: '0 8px'}}
                                value={unit}
                                onChange={e => setUnit(parseInt(e.target.value))}
                            >
                                <option
                                    className='option'
                                    value={1}
                                >
                                    per second
                                </option>
                                <option
                                    className='option'
                                    value={secondsInDay}
                                >
                                    per day
                                </option>
                                <option
                                    className='option'
                                    value={secondsInYear}
                                >
                                    per year
                                </option>
                            </select>
                        </div>

                        <div className='checkout-conversions'>
                            <h4 style={{
                                borderBottom: '1px solid #888',
                                marginBottom: 16
                            }}>
                                Time Conversions
                            </h4>
                            <p className='checkout-conversion-label'>
                                {`${perSecond} `}
                                <span>
                                    per second
                                </span>
                            </p>
                            <p className='checkout-conversion-label'>
                                {`${perDay} `}
                                <span>
                                    per day
                                </span>
                            </p>
                            <p className='checkout-conversion-label'>
                                {`${perYear} `}
                                <span>
                                    per year
                                </span>
                            </p>
                        </div>
                        <button
                            className='button checkout-button'
                            onClick={() => createStreamHandler()}
                        >
                            <p className='button-text checkout-button-text'>
                                Create Stream!
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = { createFlow }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)