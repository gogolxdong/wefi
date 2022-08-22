import './index.scss'
import intl from 'react-intl-universal'

const Introduce = () => {
    return <div>
        <div className="introduce">
            <p>{intl.get("introduceTop")}</p>
            <p>{intl.get("introduceBottom")}</p>
        </div>
    </div>
}
export default Introduce