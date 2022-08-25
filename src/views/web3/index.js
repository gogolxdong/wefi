import web3 from './../../statics/web3.png'
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

const Web3 = () => {
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
        if(index<=3){
            route.style.transform = 'translateX('+(-295*index)+'px)'
            route.style.transition = 'transform 2s'
            setIndex(index+1)
        }else{

        }
    }
    return <div>
        <div className="webI">
            <p>Web 3.0</p>
            <p>{intl.get('web3')}</p>
            <img src={web3}></img>
        </div>
        <div className="webNFT">
            <p>WeFi NFT</p>
            <p>{intl.get('ntfI')}</p>
            <img src={equityNFT}></img>
            <img src={functionNFT}></img>
            <Button onClick={()=>{
                window.location.href = '/nft'
            }}>{intl.get('Details')}</Button>
        </div>
        <div className='DAO'>
            <Row>
                <Col span={12} className='dao_left'>
                    <img src={DAO}></img>
                </Col>
                <Col span={12} className='dao_right'>
                    <p>{intl.get('DAOG')}</p>
                    <p>{intl.get('DAOI')}</p>
                    <img src={DAOM}></img>
                    <Button onClick={()=>{
                    window.location.href = '/dao'
                }}>{intl.get('More')}</Button>
                </Col>
            </Row>
        </div>
        <div className="BBQ">
            <p>BBQ</p>
            <p>{intl.get('BBQI')}</p>
            <img src={bbq}></img>
            <Button onClick={()=>{
                    window.location.href = '/bbq'
            }}>{intl.get('More')}</Button>
        </div>
        <div className="dev_route">
            <p>{intl.get('WeFiHistory')}</p>
            <div className='route-wrap'>
                <a onClick={floatLeft}></a>
                <div className='route'>
                    <div className='route_div'>
                        <div>
                            <p>{intl.get('year')} <img src={route1}></img></p>
                            <p>{intl.get('Startplanning')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>{intl.get('month')}<img src={route2}></img></p>

                            <p>{intl.get('productBased')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>{intl.get('month2')}<img src={route3}></img></p>
                            <p>{intl.get('Creation')}</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>2021年10月<img src={route3}></img></p>
                            <p>上线并完成了6个月的运营测试</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>2022年3月<img src={route3}></img></p>
                            <p>发起首轮资本融资计划</p>
                            <p>...</p>
                        </div>
                        <div>
                            <p>2022年4月<img src={route3}></img></p>
                            <p>正式推动股权、币权融资计划</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <a onClick={floatRight}></a>
            </div>

        </div>
        <div className="future_plan">
            <p>{intl.get('FuturePlans')}</p>
            <p>{intl.get('Covercountries')}</p>
        </div>
    </div>
}

export default Web3