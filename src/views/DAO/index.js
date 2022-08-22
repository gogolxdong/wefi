import './index.scss'
import daoicon from '@/statics/daoicon.png'
import intl from 'react-intl-universal'
import { useEffect, useState } from "react"
const Dao = () => {
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
                <p>{intl.get('WeFiDAO')}</p>
                <span>{intl.get('Voting')}</span>
                <span>{intl.get('SecurityDeposit')}</span>
                <span>{intl.get('VoteFor')}</span>
                <span>{intl.get('VoteAgainst')}</span>
            </div>
            <div className='daoicon'>
                <img src={daoicon}></img>
                <p>{intl.get('Underdev')}</p>
            </div>
        </div>
    )
}
export default Dao