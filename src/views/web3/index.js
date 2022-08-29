import web3 from './../../statics/web3.png'
import enweb3 from './../../statics/enweb3.png'
import equityNFT from './../../statics/equity.png'
import functionNFT from './../../statics/function.png'
import DAO from './../../statics/DAO.png'
import bbq from './../../statics/bbq.png'
import route1 from './../../statics/route1.png'
import route2 from './../../statics/route2.png'
import route3 from './../../statics/route3.png'
import DAOM from './../../statics/mobile/dao.png'
import './index.scss'
import { Button, Row, Col } from 'antd'
import intl from 'react-intl-universal'
import { useEffect, useState } from 'react'
import { useTranslation } from './../../contexts/Localization'
import {  getLanguageCodeFromLS } from '../../../src/contexts/Localization/helpers'

const Web3 = () => {
    const { t } = useTranslation()
    const [index,setIndex] = useState(1)
    const [index2,setIndex2] = useState(1)
    useEffect(()=>{
   
    },[])
    const floatLeft = ()=>{
        const route = document.querySelector('.route_div')
        const marginLeft = document.querySelector('.route_div').style.transform.split('(')[1].split('px')[0]
        
        let translateXNum = Number(marginLeft)+295*(index-1)
        console.log(marginLeft)
        if(Number(marginLeft)<0){
            route.style.transform = 'translateX('+translateXNum+'px)'
            route.style.transition = 'transform 2s'
            setIndex(index-1)
        }else{
            setIndex(1)
        }
       
    }
    const floatRight = ()=>{
        const route = document.querySelector('.route_div')
        const marginLeft = document.querySelector('.route_div').style.marginLeft
        console.log(marginLeft,index)
        if(index<=4){
            route.style.transform = 'translateX('+(-295*index)+'px)'
            route.style.transition = 'transform 2s'
            setIndex(index+1)
        }else{

        }
    }
    let web3bg = web3
    const codeFromStorage = getLanguageCodeFromLS()
    if (codeFromStorage === 'en-US') {
        console.log('enweb3')
        web3bg = enweb3
    }

    return <div>
        <div className="webI">
            <p>Web 3.0</p>
            <p>{t('web3')}</p>
            <img src={web3bg}></img>
        </div>
        <div className="webNFT">
            <p>WeFi NFT</p>
            <p>{t('ntfI')}</p>
            <img src={equityNFT}></img>
            <img src={functionNFT}></img>
            <Button onClick={()=>{
                window.location.href = '/nft'
            }}>{t('Details')}</Button>
        </div>
        <div className='DAO'>
            <Row>
                <Col span={12} className='dao_left'>
                    <img src={DAO}></img>
                </Col>
                <Col span={12} className='dao_right'>
                    <p>{t('DAOG')}</p>
                    <p>{t('DAOI')}</p>
                    <img src={DAOM}></img>
                    <Button onClick={()=>{
                    window.location.href = '/dao'
                }}>{t('More')}</Button>
                </Col>
            </Row>
        </div>
        <div className="BBQ">
            <p>BBQ</p>
            <p>{t('BBQI')}</p>
            <img src={bbq}></img>
            <Button onClick={()=>{
                    window.location.href = '/bbq'
            }}>{t('More')}</Button>
        </div>
        <div className="dev_route">
            <p>{t('WeFiHistory')}</p>
            <div className='route-wrap'>
                <a onClick={floatLeft}></a>
                <div className='route'>
                    <div className='route_div'>
                        <div>
                            <p>{t('year')} <img src={route1}></img></p>
                            <p>{t('Startplanning')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>8-2021<img src={route2}></img></p>

                            <p>{t('productBased')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>9-2021<img src={route3}></img></p>
                            <p>{t('Creation')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>10-2021<img src={route3}></img></p>
                            <p>{t('October 2021')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>3-2022<img src={route3}></img></p>
                            <p>{t('March 2022')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>4-2022<img src={route3}></img></p>
                            <p>{t('April 2022')}</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <a onClick={floatRight}></a>
            </div>

        </div>
        <div className="future_plan">
            <p>{t('FuturePlans')}</p>
            <p>{t('Covercountries')}</p>
        </div>
    </div>
}

export default Web3