import { Row, Col, Switch, Button } from "antd"
import { useEffect, useState } from "react"
import right from './../../statics/bbq/bbq.png'
import './index.scss'
import supportBg from './../../statics/nft/bg4.png'
import linkBg from './../../statics/nft/bg5.png'
import icon1 from './../../statics/nft/icon1.png'
import icon2 from './../../statics/nft/icon2.png'
import icon3 from './../../statics/nft/icon3.png'
import bbqChart from './../../statics/mobile/bbq.png'
import supportBgM from './../../statics/mobile/bg6.png'
import linkBgM from './../../statics/mobile/bg5.png'
import { useTranslation } from './../../contexts/Localization'


const BBQ = () => {
    const { t } = useTranslation()
    const [count, setcount] = useState(0)
    const [imgUrl, setImgUrl] = useState(supportBg)
    const [imgUrl2, setImgUrl2] = useState(linkBg)
    const [balance, setBalance] = useState()
    const [currentAccount, setCurrentAccount] = useState()
    const [chainId, setChainId] = useState()
    const [chainname, setChainName] = useState()
    const [token, setToken] = useState()
    // console.log(window.ethereum)

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
    const cutFun = () => {
        if (count > 0) {
            setcount(count - 1)
        }
    }
    const addFun = () => {
        console.log(count)
        setcount(count + 1)
    }
    return <div>
        <div className="bbq_pre_sale">
            <Row>
                <Col span={12} className="pre_sale_left">
                    <p>{'BBQPresale'}</p>
                    <div className="sale_img">
                        <img src={right}></img>
                        <p>{'PresalePrice'} xxxx USDT</p>
                    </div>
                    <p>{'MintQty'}:
                        <Button className="cut" onClick={cutFun}>-</Button>
                        {count}
                        <Button className="add" onClick={addFun}>+</Button>
                    </p>
                    <p>{'PaymentMethod'}:<Button onClick={setToken("USDT")}>USDT</Button><Button onClick={setToken("ETH")}>ETH</Button></p>
                    <Button onClick={setToken("USDT")}>{'Confirm'}MINT</Button>
                </Col>
                <Col span={12} className="pre_sale_right">
                    <img src={right}></img>
                    <p>{'PresalePrice'} xxxx USDT</p>
                </Col>
            </Row>
        </div>
        <div className="bbq_int">
            <p>{'BBQIntroduction'}</p>
            <p>{'BBQI'}</p>
        </div>
        <div className="bbq_dis">
            <p>{'BBQDistribution'}</p>
            <div>
                <img src={bbqChart}></img>
                <p>
                    <span>{'Team'}：</span>10%，分24个月释放，每月释放，
                    <span>{'SocialMining'} ：</span>47%，
                    <span>{'Advisors'}：</span>5%，
                    <span>{'Market'}：</span>5%，
                    <span>IDO：</span>20%，
                    <span>{'InstitutionalI'}：</span>10%，
                    <span>{'Airdrop'}：</span>3%
                </p>
                <div>{'Note'}</div>
            </div>
            <div>
                <p>BBQ</p>
                <span></span>
                <div className="chart">
                    <div>
                        <span></span>
                        <p><span>10%</span><span>{'Team'}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>33%</span><span>{'SocialMining'}
                            <br /></span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>20%</span><span>{'Advisors'}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>10%</span><span>{'Market'}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>10%</span>
                            <span>
                                {'Marketing'}
                            </span>
                            <span>{'Marketing2'}</span>
                        </p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>7%</span><span>{'InstitutionalI'}</span></p>
                        <p><span>10%</span>
                            <span>
                                {'Airdrop'}<br />
                                {'Airdrop2'}
                            </span></p>
                    </div>
                </div>
                <div>{'Note'}</div>
            </div>
        </div>
        <div className="bbq_rai">
            <p>{'BBQBenefits'}</p>
            <p><span>1</span><span>{'Contributionmining'}</span></p>
            <p><span>2</span><span>{'transfers'}</span></p>
            <p><span>3</span><span>{'Consumption'}</span></p>
        </div>
        <div className="bbq_deflation">
            <p>{'AggressiveD'}</p>
            <div>
                <p>
                    <img src={icon1}></img>
                    <p>{'Transactionburns'}</p>
                </p>
                <p>
                    <img src={icon2}></img>
                    <p>{"buybackAburn"}</p>
                </p>
                <p>
                    <img src={icon3}></img>
                    <p>{'ConsumptionAburn'}</p>
                </p>
            </div>

        </div>
        <div className="support_org" style={{ display: "none" }}>
            <p>{'nvestmentInstitutions'}</p>
            <img src={imgUrl}></img>
        </div>
        <div className="link_about" style={{ display: "none" }}>
            <p>{'ReferenceLinks'}</p>
            <img src={imgUrl2}></img>
        </div>
    </div>
}
export default BBQ