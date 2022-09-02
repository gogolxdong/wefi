import { Row, Col, Switch, Button } from "antd"
import { useEffect, useState } from "react"
import './index.scss'
import right from './../../statics/nft/right.png'
import devBg from './../../statics/nft/bg3.png'
import supportBg from './../../statics/nft/bg4.png'
import linkBg from './../../statics/nft/bg5.png'
import supportBgM from './../../statics/mobile/bg6.png'
import linkBgM from './../../statics/mobile/bg5.png'
import equityNFT from './../../statics/equity.png'
import functionNFT from './../../statics/function.png'
import wefiEquityAbi from '../../abi/wefiEquity.json'
import wefiFunctionAbi from '../../abi/wefiFunction.json'
import usdtAbi from '../../abi/usdt.json'
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import { useTranslation } from './../../contexts/Localization'

const NFT = ({ props }) => {
    const { t } = useTranslation()
    let { connect, provider, hasCachedProvider, chainID, connected } = props;

    const wefiFunctionAddress = "0x71cE746071371Cd90F4562789EA1186069871517" //polygon mainnet
    const wefiEquityAddress = "0x9a6D2F2124915e3091E52e00e286AE3e3A5Bb248" //polygon mainnet
    // const wefiFunctionAddress = "0x4D590160C50f58fC01EDC2ed1440CDF9FFD41D63"
    // const wefiEquityAddress = "0x56890896501540344098376B431Bd2e29dbe1118"

    const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" // polygon mainnet
    const signer = provider.getSigner()
    const wefiFunction = new ethers.Contract(wefiFunctionAddress, wefiFunctionAbi, signer)
    const wefiEquity = new ethers.Contract(wefiEquityAddress, wefiEquityAbi, signer)
    const dfs = new ethers.Contract(usdtAddress, usdtAbi, signer)
    const [count, setcount] = useState(1)
    const [imgUrl, setImgUrl] = useState(supportBg)
    const [imgUrl2, setImgUrl2] = useState(linkBg)
    const [wefiImg, setwefiImg] = useState(functionNFT)
    const [currentAccount, setCurrentAccount] = useState()

    useEffect(() => {
        document.querySelector(".ant-switch-handle").innerHTML = t('equity') + 'NFT'
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
    const switchChange = (checked, event) => {
        let switchDom = document.querySelector(".ant-switch-handle")
        let switchInner = document.querySelector(".ant-switch-inner")
        if (!checked) {
            switchDom.style.left = "0px"
            switchInner.style.textAlign = "right"
            switchInner.style.marginRight = "20px"
            switchDom.innerHTML = t('functional') + 'NFT';
            setwefiImg(equityNFT)
        } else {
            switchDom.style.left = "50%"
            switchInner.style.textAlign = "left"
            switchInner.style.marginLeft = "20px"
            switchDom.innerHTML = t('equity') + 'NFT';
            setwefiImg(functionNFT)
        }

    }

    return <div>
        <div className="pre_sale">
            <Row>
                <Col span={12} className="pre_sale_left">
                    <p>WeFi {t('functional')} NFT <br></br>WeFi {t('equity')} NFT {t('presale')}</p>
                    <div className="sale_img">
                        <img src={wefiImg}></img>
                        <p>{t('PresalePrice')} **** USDT</p>
                    </div>
                    <p>{t('mintNFT')}</p>
                    <p>
                        <Switch
                            checkedChildren={t('functional') + " NFT"}
                            unCheckedChildren={t('equity') + " NFT"}
                            defaultChecked
                            onChange={switchChange} id="nft" />
                    </p>
                    <p><span>{t('Mintable')}:</span>
                        <Button className="cut" onClick={() => {
                            if (count > 0) {
                                setcount(count - 1)
                            }
                        }}>-</Button>
                        {count}
                        <Button className="add" onClick={() => { setcount(count + 1) }}>+</Button></p>
                    <p>{t('PaymentMethod')}:<Button>USDT</Button></p>
                    <Button onClick={async () => {
                        const address = await signer.getAddress()
                        const zero = BigNumber.from(0)

                        if (wefiImg == equityNFT) {
                            const allowance = await dfs.allowance(address, wefiEquityAddress)
                            if (allowance.eq(zero)) {
                                const receipt = await dfs.approve(wefiEquityAddress, BigNumber.from(2).pow(255))
                                await receipt.wait()
                            }
                            const price = await wefiEquity.getPrice()
                            try {
                                await wefiEquity.casting(usdtAddress, { value: BigNumber.from(price).mul(count) })
                            } catch (error) {
                                window.alert(error?.reason || error?.data?.message)
                            }
                        } else {
                            const allowance = await dfs.allowance(address, wefiFunctionAddress)
                            if (allowance.eq(zero)) {
                                const receipt = await dfs.approve(wefiFunctionAddress, BigNumber.from(2).pow(255))
                                await receipt.wait()
                            }
                            const price = await wefiFunction.getPrice()
                            try {
                                await wefiFunction.casting(usdtAddress, { value: BigNumber.from(price).mul(count) })
                            } catch (error) {
                                window.alert(error?.reason || error?.message)
                            }

                        }
                    }}>{t('Confirm')} MINT</Button>
                </Col>
                <Col span={12} className="pre_sale_right">
                    <img src={wefiImg}></img>
                    <p>{t('PresalePrice')} **** USDT</p>
                </Col>

            </Row>
        </div>
        <div className="nft_introduce">
            <p>{t('NFTIntroduction')}</p>
            <div>
                <p><span></span>WeFi {t('functional')} NFT</p>
                <p>{t('NFTI')}</p>
            </div>
            <div>
                <p><span></span>WeFi {t('equity')} NFT</p>
                <p>{t('NFTBenefit')}<br></br>
                    {t('NFTBenefit2')}<br></br>
                    {t('NFTBenefit3')}<br></br>
                    {t('NFTBenefit4')}</p>
            </div>
        </div>
        <div className="nft_distribute">
            <p>{t('NFTD')}</p>
            <div className="distribute_wrap">
                <div className="distribute_left">
                    <p>WeFi {t('functional')} NFT</p>
                    <span></span>
                    <div>
                        <Row>
                            <Col span={10}>{t('NFTName')}：</Col>
                            <Col span={14}>{t('global')}</Col>
                            <Col span={10}>{t('IssuanceS')}：</Col>
                            <Col span={14}>{t('issue')}</Col>
                            <Col span={10}>{t('IssuanceMethod')}：</Col>
                            <Col span={14}>{t('WhitelistINO')}</Col>

                            <Col span={10}>{t('Airdropi')}：</Col>
                            <Col span={14}>{t('Airdropisf')}</Col>

                            <Col span={10}>{t('WhitelistRound')}： </Col>
                            <Col span={14}>{t('mintprice')}</Col>
                            <Col span={10}>{t('INOPublicRound')}：</Col>
                            <Col span={14}>{t('mintprice4')}</Col>
                            <Col span={10}>{t('definition')}：</Col>
                            <Col span={14}>{t('definitionCon')}</Col>
                        </Row>
                    </div>
                </div>
                <div className="distribute_right">
                    <p>WeFi {t('equity')} NFT</p>
                    <span></span>
                    <div>
                        <Row>
                            <Col span={10}>{t('NFTName')}：</Col>
                            <Col span={14}>{t('global2')}</Col>
                            <Col span={10}>{t('IssuanceS')}：</Col>
                            <Col span={14}>{t('nums')}</Col>
                            <Col span={10}>{t('IssuanceMethod')}：</Col>
                            <Col span={14}>{t('WhitelistINO2')}</Col>
                            <Col span={10}>{t('WhitelistRound')}：</Col>
                            <Col span={14}>{t('mintprice2')}</Col>
                            <Col span={10}>{t('INOPublicRound')}：</Col>
                            <Col span={14}>{t('mintprice3')}</Col>
                            <Col span={10}>{t('definition')}：</Col>
                            <Col span={14}>{t('definitionCon2')}</Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div className="ntf_dev">
            <p>{t('NFTRoadmap')}</p>
            <div>
                <span> {`<`}</span>
                <div>
                    <p>{t('Stage1')}</p>
                    <p>{t('NFTpresale')}</p>
                </div>
                <div>
                    <p>{t('Stage2')}</p>
                    <p>{t('Stage2I')}</p>
                </div>
                <div>
                    <p>{t('Stage3')}</p>
                    <p>{t('Stage3I')}</p>
                </div>
                <div>
                    <p>{t('Stage4')}</p>
                    <p>{t('Stage4I')}</p>
                </div>
                <span>{`>`}</span>
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
export default NFT