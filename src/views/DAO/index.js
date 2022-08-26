import './index.scss'
import daoicon from './../../statics/daoicon.png'
import { useEffect, useState } from "react"
import { useTranslation } from './../../contexts/Localization'
// const { t } = useTranslation()

const DAO = () => {
    const { t } = useTranslation()
    useEffect(() => {
        const width = document.documentElement.clientWidth
        const placard = document.querySelector('.placard')
        if (width <= 415) {
            placard.style.display = 'none'
        } else {
            placard.style.display = 'block'
        }
    }, [])
    return (
        <div>
            <div className="dao_Governance">
                <p>{t('WeFiDAO')}</p>
                <span>{t('Voting')}</span>
                <span>{t('SecurityDeposit')}</span>
                <span>{t('VoteFor')}</span>
                <span>{t('VoteAgainst')}</span>
            </div>
            <div className='daoicon'>
                <img src={daoicon}></img>
                <p>{t('Underdev')}</p>
            </div>
        </div>
    )
}
export default DAO