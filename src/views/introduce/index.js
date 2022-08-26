import './index.scss'
import intl from 'react-intl-universal'
import { useTranslation } from './../../contexts/Localization'
const Introduce = () => {
    const { t } = useTranslation()
    return <div>
        <div className="introduce">
            <p>{t("introduceTop")}</p>
            <p>{t("introduceBottom")}</p>
        </div>
    </div>
}
export default Introduce