import { Row, Col, Switch, Button } from "antd"
import { useEffect, useState } from "react"
import right from '@/statics/bbq/bbq.png'
import './index.scss'
import supportBg from '@/statics/nft/bg4.png'
import linkBg from '@/statics/nft/bg5.png'
import icon1 from '@/statics/nft/icon1.png'
import icon2 from '@/statics/nft/icon2.png'
import icon3 from '@/statics/nft/icon3.png'
import bbqChart from '@/statics/mobile/bbq.png'
import supportBgM from '@/statics/mobile/bg6.png'
import linkBgM from '@/statics/mobile/bg5.png'
import intl from 'react-intl-universal'

const Bbq = () => {
    const [count, setcount] = useState(0)
    const [imgUrl, setImgUrl] = useState(supportBg)
    const [imgUrl2, setImgUrl2] = useState(linkBg)
    useEffect(() => {
        const width = document.documentElement.clientWidth
        const placard = document.querySelector('.placard')
        if (width <= 415) {
            setImgUrl(supportBgM)
            setImgUrl2(linkBgM)
            placard.style.display = 'none'
        } else {
            setImgUrl(supportBg)
            setImgUrl2(linkBg)
            placard.style.display = 'block'
        }
    }, [imgUrl])
    const cutFun=()=>{
        if(count>0){
            setcount(count-1)
        }
        
    }
    const addFun=()=>{
        console.log(count)
        
        setcount(count+1)
    }
    return <div>
        <div className="bbq_pre_sale">
            <Row>
                <Col span={12} className="pre_sale_left">
                    <p>{intl.get('BBQPresale')}</p>
                    <div className="sale_img">
                        <img src={right}></img>
                        <p>{intl.get('PresalePrice')}    xxxx USDT</p>
                    </div>
                    <p>{intl.get('SwapQty')}:
                    <Button className="cut" onClick={cutFun}>-</Button>
                    {count}
                    <Button className="add" onClick={addFun}>+</Button>
                    </p>
                    <p>{intl.get('PaymentMethod')}:<Button>USDT</Button><Button>ETH</Button></p>
                    <Button>{intl.get('Confirm')}MINT</Button>
                </Col>
                <Col span={12} className="pre_sale_right">
                    <img src={right}></img>
                    <p>{intl.get('PresalePrice')}    xxxx USDT</p>
                </Col>
            </Row>
        </div>
        <div className="bbq_int">
            <p>{intl.get('BBQIntroduction')}</p>
            <p>{intl.get('BBQI')}</p>
        </div>
        <div className="bbq_dis">
            <p>{intl.get('BBQDistribution')}</p>
            <div>
                <img src={bbqChart}></img>
                <p>
                    <span>{intl.get('Team')}：</span>10%，分24个月释放，每月释放，
                    <span>{intl.get('SocialMining')} ：</span>47%，
                    <span>{intl.get('Advisors')}：</span>5%， 
                    <span>{intl.get('Market')}：</span>5%， 
                    <span>IDO：</span>20%， 
                    <span>{intl.get('InstitutionalI')}：</span>10%，
                    <span>{intl.get('Airdrop')}：</span>3%
                </p>
                <div>{intl.get('Note')}</div>
            </div>
            <div>
                <p>BBQ</p>
                <span></span>
                <div className="chart">
                    <div>
                        <span></span>
                        <p><span>10%</span><span>{intl.get('Team')}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>33%</span><span>{intl.get('SocialMining')}
                        <br /></span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>20%</span><span>{intl.get('Advisors')}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>10%</span><span>{intl.get('Market')}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>10%</span>
                        <span>
                            {intl.get('Marketing')}
                        </span>
                        <span>{intl.get('Marketing2')}</span>
                        </p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>7%</span><span>{intl.get('InstitutionalI')}</span></p>
                        <p><span>10%</span>
                        <span>
                            {intl.get('Airdrop')}<br />
                            {intl.get('Airdrop2')}
                        </span></p>
                    </div>
                </div>
                <div>{intl.get('Note')}</div>
            </div>
        </div>
        <div className="bbq_rai">
            <p>{intl.get('BBQBenefits')}</p>
            <p><span>1</span><span>{intl.get('Contributionmining')}</span></p>
            <p><span>2</span><span>{intl.get('transfers')}</span></p>
            <p><span>3</span><span>{intl.get('Consumption')}</span></p>
        </div>
        <div className="bbq_deflation">
            <p>{intl.get('AggressiveD')}</p>
            <div>
                <p>
                    <img src={icon1}></img>
                    <p>{intl.get('Transactionburns')}</p>
                </p>
                <p>
                    <img src={icon2}></img>
                    <p>{intl.get("buybackAburn")}</p>
                </p>
                <p>
                    <img src={icon3}></img>
                    <p>{intl.get('ConsumptionAburn')}</p>
                </p>
            </div>

        </div>
        <div className="support_org" style={{display:"none"}}>
            <p>{intl.get('nvestmentInstitutions')}</p>
            <img src={imgUrl}></img>
        </div>
        <div className="link_about"  style={{display:"none"}}>
            <p>{intl.get('ReferenceLinks')}</p>
            <img src={imgUrl2}></img>
        </div>
    </div>
}
export default Bbq