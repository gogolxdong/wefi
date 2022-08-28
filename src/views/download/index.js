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
<<<<<<< HEAD
            <Button>{t("Download App")}</Button>
=======
            <Button onClick={() => {
                const element = document.getElementById('app_download')
                element.scrollIntoView({ behavior: 'smooth' })
            }
            }>{t("Download App")}</Button>
>>>>>>> 1964c1ed964c346c1e7faaeaa6e205569b73fd66
        </div>
    </div>
}
export default Download