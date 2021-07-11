import { connect } from 'react-redux'
import { useTheme } from '../hooks/useTheme'
import { setAddress, setTheme } from '../redux/user/actions'
import styles from '../styles/Landing.module.css'

type LandingProps = {
    setAddress: (address?: string) => void
    setTheme: () => void
}

function Landing(props: LandingProps) {
    const { setAddress, setTheme } = props

    return (
        <div className={styles.landing}>
            <button onClick={() => setTheme()}>Change Theme</button>
            <div className={styles.box} style={useTheme('base')}>
                <div className={styles.box} style={useTheme('low')}>
                    <div className={styles.box} style={useTheme('mid')}>
                        <div className={styles.box} style={useTheme('high')}>
                            <div className={styles.box} style={useTheme('veryHigh')}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    setAddress,
    setTheme
}

export default connect(null, mapDispatchToProps)(Landing)