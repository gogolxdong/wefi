import './index.scss'
import intl from 'react-intl-universal'
import { useTranslation } from './../../contexts/Localization'
import styled from 'styled-components'
import zhbg from '../../statics/bg2.png'
import enbg from '../../statics/enbg.png'
import {  getLanguageCodeFromLS } from '../../../src/contexts/Localization/helpers'

const IntroduceWrap = styled.div`
  background-image:url(${props => props.isEnLang ? enbg : zhbg});
  background-size: 100%;

`
const Introduce = () => {
    const { t } = useTranslation()
    const codeFromStorage = getLanguageCodeFromLS()
  
    let isEnLang = false
    if (codeFromStorage === 'en-US') {
        isEnLang = true
    }
  
    return <IntroduceWrap isEnLang={isEnLang}>
        <div className="introduce">
            <p>{t("Brand New Concept: Value Co-creation")}</p>
            <p>{t("WeFi is the first platform to propose that social interactions can also generate value. We believe that any behavior should be of value, including socializing, the first form of communication that comes to mind. It can have many manifestations, e.g., knowledge, emotions, material objects, money... WeFi can satisfy all your financial interaction needs.")}</p>
        </div>
    </IntroduceWrap>
}
export default Introduce