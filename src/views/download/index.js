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
            <p>{t("With a global localized blockchain social investment platform, WeFi provides ecosystem services and becomes a decentralized gathering place for 500 million users, meeting their basic financial interaction needs.")}</p>
            <Button onClick={() => {
                const element = document.getElementById('app_download')
                element.scrollIntoView({ behavior: 'smooth' })
            }
            }>{t("Download App")}</Button>
        </div>
    </div>
}
export default Download