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
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import usdtAbi from '../../abi/usdt.json'

const BBQ = ({ props }) => {
    const { t } = useTranslation()
    let { connect, provider, hasCachedProvider, chainID, connected, address } = props;
    console.log("address:", address)
    const [count, setcount] = useState(0)
    const [imgUrl, setImgUrl] = useState(supportBg)
    const [imgUrl2, setImgUrl2] = useState(linkBg)
    const [token, setToken] = useState()
    const bbqAddress = "0xd49f9D8F0aB1C2F056e1F0232d5b9989F8a12CeF" // bsc testnet
    const signer = provider.getSigner()
    const bbq = new ethers.Contract(bbqAddress, usdtAbi, signer)

    // useEffect(() => {
    //     const width = document.documentElement.clientWidth
    //     const placard = document.querySelector('.placard')
    //     if (width <= 415) {
    //         setImgUrl(supportBgM)
    //         setImgUrl2(linkBgM)
    //         placard.style.display = 'none'
    //     } else {
    //         setImgUrl(supportBg)
    //         setImgUrl2(linkBg)
    //         placard.style.display = 'block'
    //     }
    // }, [imgUrl])
    return <div>
        <div className="bbq_pre_sale">
            <Row>
                <Col span={12} className="pre_sale_left">
                    <p>{t('BBQPresale')}</p>
                    <div className="sale_img">
                        <img src={right}></img>
                        <p>{t('PresalePrice')} xxxx USDT</p>
                    </div>
                    <p>{t('MintQty')}:
                        <Button className="cut" onClick={() => { if (count > 0) setcount(count - 1) }}>-</Button>
                        {count}
                        <Button className="add" onClick={() => setcount(count + 1)}>+</Button>
                    </p>
                    <p>{t('PaymentMethod:')}
                        <Button onClick={()=>{setToken("USDT")}}>USDT</Button>
                        <Button onClick={()=>{setToken("ETH")}}>ETH</Button>
                    </p>
                    <Button onClick={async () => { await bbq.balanceOf(address) }}>{t('Confirm')}MINT</Button>
                </Col>
                <Col span={12} className="pre_sale_right">
                    <img src={right}></img>
                    <p>{t('PresalePrice')} xxxx USDT</p>
                </Col>
            </Row>
        </div>
        <div className="bbq_int">
            <p>{t('BBQIntroduction')}</p>
            <p>{t('BBQI')}</p>
        </div>
        <div className="bbq_dis">
            <p>{t('BBQDistribution')}</p>
            <div>
                <img src={bbqChart}></img>
                <p>
                    <span>{t('Team')}：</span>10%，分24个月释放，每月释放，
                    <span>{t('SocialMining')} ：</span>47%，
                    <span>{t('Advisors')}：</span>5%，
                    <span>{t('Market')}：</span>5%，
                    <span>IDO：</span>20%，
                    <span>{t('InstitutionalI')}：</span>10%，
                    <span>{t('Airdrop')}：</span>3%
                </p>
                <div>{t('Note')}</div>
            </div>
            <div>
                <p>BBQ</p>
                <span></span>
                <div className="chart">
                    <div>
                        <span></span>
                        <p><span>10%</span><span>{t('Team')}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>33%</span><span>{t('SocialMining')}
                            <br /></span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>20%</span><span>{t('Advisors')}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>10%</span><span>{t('Market')}</span></p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>10%</span>
                            <span>
                                {t('Marketing')}
                            </span>
                            <span>{t('Marketing2')}</span>
                        </p>
                    </div>
                    <div>
                        <span></span>
                        <p><span>7%</span><span>{t('InstitutionalI')}</span></p>
                        <p><span>10%</span>
                            <span>
                                {t('Airdrop')}<br />
                                {t('Airdrop2')}
                            </span></p>
                    </div>
                </div>
                <div>{t('Note')}</div>
            </div>
        </div>
        <div className="bbq_rai">
            <p>{t('BBQBenefits')}</p>
            <p><span>1</span><span>{t('Contributionmining')}</span></p>
            <p><span>2</span><span>{t('transfers')}</span></p>
            <p><span>3</span><span>{t('Consumption')}</span></p>
        </div>
        <div className="bbq_deflation">
            <p>{t('AggressiveD')}</p>
            <div>
                <p>
                    <img src={icon1}></img>
                    <p>{t('Transactionburns')}</p>
                </p>
                <p>
                    <img src={icon2}></img>
                    <p>{t("buybackAburn")}</p>
                </p>
                <p>
                    <img src={icon3}></img>
                    <p>{t('ConsumptionAburn')}</p>
                </p>
            </div>

        </div>
        <div className="support_org" style={{ display: "none" }}>
            <p>{t('nvestmentInstitutions')}</p>
            <img src={imgUrl}></img>
        </div>
        <div className="link_about" style={{ display: "none" }}>
            <p>{t('ReferenceLinks')}</p>
            <img src={imgUrl2}></img>
        </div>
    </div>
}
export default BBQ