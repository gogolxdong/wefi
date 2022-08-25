import { Row, Col, Switch, Button } from "antd"
import { useEffect, useState } from "react"
import './index.scss'
import right from '@/statics/nft/right.png'
import devBg from '@/statics/nft/bg3.png'
import supportBg from '@/statics/nft/bg4.png'
import linkBg from '@/statics/nft/bg5.png'
import supportBgM from '@/statics/mobile/bg6.png'
import linkBgM from '@/statics/mobile/bg5.png'
import equityNFT from '@/statics/equity.png'
import functionNFT from '@/statics/function.png'
import wefiEquityAbi from '../../abi/wefiEquity.json'
import wefiFunctionAbi from '../../abi/wefiFunction.json'
import dfsAbi from '../../abi/dfs.json'
import intl from 'react-intl-universal'
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import { formatUnits } from "ethers/utils"

const NFT = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const wefiFunctionAddress = "0xd49f9D8F0aB1C2F056e1F0232d5b9989F8a12CeF" //MATIC
    // const wefiEquityAddress = "0x31d0f1c5e163f9e84b15073bca90a3bf87baad88" //MATIC
    const wefiFunctionAddress = "0x4D590160C50f58fC01EDC2ed1440CDF9FFD41D63" 
    const wefiEquityAddress = "0x56890896501540344098376B431Bd2e29dbe1118" 
    const dfsAddress = "0xd49f9D8F0aB1C2F056e1F0232d5b9989F8a12CeF" // bsc testnet
    const signer = provider.getSigner()
    const wefiFunction = new ethers.Contract(wefiFunctionAddress, wefiFunctionAbi, signer)
    const wefiEquity = new ethers.Contract(wefiEquityAddress, wefiEquityAbi, signer)
    const dfs = new ethers.Contract(dfsAddress, dfsAbi, signer)
    const [count, setcount] = useState(0)
    const [imgUrl, setImgUrl] = useState(supportBg)
    const [imgUrl2, setImgUrl2] = useState(linkBg)
    const [wefiImg, setwefiImg] = useState(functionNFT)
    const [currentAccount, setCurrentAccount] = useState()

    const onClickConnect = () => {
        if (!window.ethereum) {
            console.log("please install MetaMask")
            return
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.send("eth_requestAccounts", [])
            .then((accounts) => {
                if (accounts.length > 0) setCurrentAccount(accounts[0])
            })
            .catch((e) => console.log(e))
    }
    const onClickDisconnect = () => {
        console.log("onClickDisConnect")
        setCurrentAccount(undefined)
    }

    useEffect(() => {
        document.querySelector(".ant-switch-handle").innerHTML = intl.get('benefit') + 'NFT'
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
            switchDom.innerHTML = intl.get('functional') + 'NFT';
            setwefiImg(equityNFT)
        } else {
            switchDom.style.left = "50%"
            switchInner.style.textAlign = "left"
            switchInner.style.marginLeft = "20px"
            switchDom.innerHTML = intl.get('benefit') + 'NFT';
            setwefiImg(functionNFT)
        }

    }

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
        <div className="pre_sale">
            <Row>
                <Col span={12} className="pre_sale_left">
                    <p>WeFi{intl.get('functional')}NFT/WeFi{intl.get('benefit')}<br />NFT{intl.get('presale')}</p>
                    <div className="sale_img">
                        <img src={wefiImg}></img>
                        <p>{intl.get('PresalePrice')} xxxx USDT</p>
                    </div>
                    <p>{intl.get('mintNFT')}</p>
                    <p>
                        <Switch
                            checkedChildren={intl.get('functional') + "NFT"}
                            unCheckedChildren={intl.get('benefit') + "NFT"}
                            defaultChecked
                            onChange={switchChange} id="nft" />
                    </p>
                    <p><span>{intl.get('Mintable')}:</span>
                        <Button className="cut" onClick={cutFun}>-</Button>
                        {count}
                        <Button className="add" onClick={addFun}>+</Button></p>
                    <p>{intl.get('PaymentMethod')}:<Button>USDT</Button><Button>ETH</Button></p>
                    <Button onClick={async () => {
                        const address = await signer.getAddress()
                        const zero = BigNumber.from(0)
      
                        if (wefiImg == equityNFT) {
                            const allowance = await dfs.allowance(address, wefiEquityAddress)
                            console.log("allowance:",allowance)
                            if (allowance.eq(zero)) {
                               const receipt = await dfs.approve(wefiEquityAddress, BigNumber.from(2).pow(255))
                               await receipt.wait()
                            }
                            const price = await wefiEquity.getPrice()
                            console.log("price:",price.toString())
                            await wefiEquity.casting({value: formatUnits(price,"ether")})

                        } else {
                            const allowance = await dfs.allowance(address, wefiFunctionAddress)
                            console.log("allowance:",allowance)
                            if (allowance.eq(zero)) {
                                const receipt = await dfs.approve(wefiFunctionAddress, BigNumber.from(2).pow(255))
                               await receipt.wait()

                            }
                            const price = await wefiFunction.getPrice()
                            console.log("price:",price.toString())
                            await wefiFunction.casting({value: formatUnits(price,"ether")})

                        }
                    }}>{intl.get('Confirm')}MINT</Button>
                </Col>
                <Col span={12} className="pre_sale_right">
                    <img src={wefiImg}></img>
                    <p>{intl.get('PresalePrice')} xxxx USDT</p>
                </Col>

            </Row>
        </div>
        <div className="nft_introduce">
            <p>{intl.get('NFTIntroduction')}</p>
            <div>
                <p><span></span>WeFi{intl.get('functional')}NFT</p>
                <p>{intl.get('NFTI')}</p>
            </div>
            <div>
                <p><span></span>WeFi{intl.get('benefit')}NFT</p>
                <p>{intl.get('NFTBenefit')}<br></br>
                    {intl.get('NFTBenefit2')}<br></br>
                    {intl.get('NFTBenefit3')}<br></br>
                    {intl.get('NFTBenefit4')}</p>
            </div>
        </div>
        <div className="nft_distribute">
            <p>{intl.get('NFTD')}</p>
            <div className="distribute_wrap">
                <div className="distribute_left">
                    <p>WeFi{intl.get('functional')}NFT</p>
                    <span></span>
                    <div>
                        <Row>
                            <Col span={10}>{intl.get('NFTName')}：</Col>
                            <Col span={14}>{intl.get('global')}</Col>
                            <Col span={10}>{intl.get('IssuanceS')}：</Col>
                            <Col span={14}>{intl.get('issue')}</Col>
                            <Col span={10}>{intl.get('IssuanceMethod')}：</Col>
                            <Col span={14}>{intl.get('WhitelistINO')}</Col>

                            <Col span={10}>{intl.get('Airdropi')}：</Col>
                            <Col span={14}>{intl.get('Airdropisf')}</Col>

                            <Col span={10}>{intl.get('WhitelistRound')}： </Col>
                            <Col span={14}>{intl.get('mintprice')}</Col>
                            <Col span={10}>{intl.get('INOPublicRound')}：</Col>
                            <Col span={14}>{intl.get('mintprice4')}</Col>
                            <Col span={10}>{intl.get('definition')}：</Col>
                            <Col span={14}>{intl.get('definitionCon')}</Col>
                        </Row>
                    </div>
                </div>
                <div className="distribute_right">
                    <p>WeFi{intl.get('benefit')}NFT</p>
                    <span></span>
                    <div>
                        <Row>
                            <Col span={10}>{intl.get('NFTName')}：</Col>
                            <Col span={14}>{intl.get('global2')}</Col>
                            <Col span={10}>{intl.get('IssuanceS')}：</Col>
                            <Col span={14}>{intl.get('nums')}</Col>
                            <Col span={10}>{intl.get('IssuanceMethod')}：</Col>
                            <Col span={14}>{intl.get('WhitelistINO2')}</Col>
                            <Col span={10}>{intl.get('WhitelistRound')}：</Col>
                            <Col span={14}>{intl.get('mintprice2')}</Col>
                            <Col span={10}>{intl.get('INOPublicRound')}：</Col>
                            <Col span={14}>{intl.get('mintprice3')}</Col>
                            <Col span={10}>{intl.get('definition')}：</Col>
                            <Col span={14}>{intl.get('definitionCon2')}</Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div className="ntf_dev">
            <p>{intl.get('NFTRoadmap')}</p>
            <div>
                <span> {`<`}</span>
                <div>
                    <p>{intl.get('Stage1')}</p>
                    <p>{intl.get('NFTpresale')}</p>
                </div>
                <div>
                    <p>{intl.get('Stage2')}</p>
                    <p>{intl.get('Stage2I')}</p>
                </div>
                <div>
                    <p>{intl.get('Stage3')}</p>
                    <p>{intl.get('Stage3I')}</p>
                </div>
                <div>
                    <p>{intl.get('Stage4')}</p>
                    <p>{intl.get('Stage4I')}</p>
                </div>
                <span>{`>`}</span>
            </div>
        </div>
        <div className="support_org" style={{ display: "none" }}>
            <p>{intl.get('nvestmentInstitutions')}</p>
            <img src={imgUrl}></img>
        </div>
        <div className="link_about" style={{ display: "none" }}>
            <p>{intl.get('ReferenceLinks')}</p>
            <img src={imgUrl2}></img>
        </div>
    </div>
}
export default NFT