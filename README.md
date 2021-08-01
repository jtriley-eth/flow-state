# Flow State

An open-source, Superfluid accounting tool.

Flow State began as a Hack Money 2021 project focusing a UX problem in
real-time finance. Balances are updated constantly via constant flow agreements,
instand distribution agreements, and token transfers.

The stack for this project consists of React.js, Ethers.js, GraphQL (The Graph),
and the Superfluid JS-SDK.

---

## Useful components

These components have proven to be useful in the Flow State web app, and will
likely be included in the upcoming node package listed on the road map.

### - Balance Ticker

    React Functional Component, designed to be lightweight, minimizes rerendersin
    the Virtual DOM, ticks per 0.1 seconds by default. Millisecond tick rate has not
    been tested and may affect performance.

### - Timestamp Snapshot

Javascript function, takes account information and an arbitrary timestamp and
calculates the balance given the sum of all previous events, transfers, and
flows.

The Ethereum blockchain uses a Unix-timestamp, denominated in seconds. The
account balance in the UI is calculated based on the most recent update's
timestamp and the browser's current timestamp. Balance accuracy is subject to
variations in the Ethereum protocol. See timestamp requirements for the
[Ethereum Block Validation Algorithm](https://github.com/ethereum/wiki/blob/c02254611f218f43cbb07517ca8e5d00fd6d6d75/Block-Protocol-2.0.md#block-validation-algorithm)

### - The Graph Query

There is a single query sent to The Graph once a user enters an address and
network.

The query contains exactly what is needed to generate the account data used in
the Timestamp Snapshot, as well as creating an event table. This will also
include the function needed to process and return the fetched data as the
AccountData object.

---

## Road Map

The Road Map for Flow State does not include definitive timeframes yet, as I am
only a single developer. As the project scales, so too will the team, creating
a much faster development pace!

### `Hack Money 2021 MVP`

Done!

### `The Great Typescript Migration`

In Progress!

### `React SDK (Typescript)`

Coming Soon!

### `Flow State Native`

Coming Soon!

### `Native SDK (React Native, Swift, Kotlin)`

Coming Soon!

---

## Links

Twitter: [Flow State Fintech](https://twitter.com/flow_state_fin)

Discord: [Flow State Fintech](https://t.co/Xo5eqrgHtB?amp=1)
