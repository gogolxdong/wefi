import { Button } from 'antd'
import './index.scss'
import appLogo from './../../statics/applogo.png'
import { useTranslation } from './../../contexts/Localization'

const Download = () => {
    const { t } = useTranslation()
    return <div>
        <div className="dow_content">
            <img src={appLogo}></img>
            <p>{t("wefiwordtop")}</p>
            <p>{t("wefiwordbottom")}</p>
            <Button>{t("wefiwordBtn")}</Button>
        </div>
    </div>
}
export default Download