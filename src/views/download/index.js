import { Button } from 'antd'
import './index.scss'
import appLogo from '@/statics/applogo.png'
import intl from 'react-intl-universal'

const Download = () => {
    return <div>
        <div className="dow_content">
            <img src={appLogo}></img>
            <p>{intl.get("wefiwordtop")}</p>
            <p>{intl.get("wefiwordbottom")}</p>
            <Button>{intl.get("wefiwordBtn")}</Button>
        </div>
    </div>
}
export default Download