import React, { useState, useEffect } from "react"
import { Menu, Button, Select, Modal, Popover, Row, Col } from 'antd'
import './index.scss'
import app1 from './../../statics/app1.png'
import app2 from './../../statics/app2.png'
import app3 from './../../statics/app3.png'
import app4 from './../../statics/app4.png'
import iosapp from './../../statics/iosipa.png'
import androidapk from './../../statics/androidapk.png'
import ios from './../../statics/ios.png'
import android from './../../statics/android.png'
import nav from './../../statics/mobile/nav.png'
import logo from './../../statics/logo.png'
import trumpet from './../../statics/trumpet.png'
import { useEagerConnect, useInactiveListener } from './../constants/hooks'
import { injected } from './../constants/index'
import { Web3ReactProvider, useWeb3React, } from '@web3-react/core'
import intl from 'react-intl-universal'
import axios from "axios"
import { CaretDownOutlined } from '@ant-design/icons'
import { useSelector } from "react-redux"
import { DEFAULT_NETWORK } from './../../constants'
import { useWeb3Context } from "./../../hooks/web3"
import useMatchBreakpoints from "./../../hooks/useMatchBreakpoints"
import { useLocation } from "react-router-dom";
import { useTranslation } from './../../contexts/Localization'
import { languageList } from 'config/localization/languages'


const { Option } = Select
export const shorten = (str) => {
    if (str.length < 8) return str
    return `${str.slice(0, 4)}...${str.slice(str.length - 4)}`
}

function ConnectMenu() {
    const { t } = useTranslation()
    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork, address, web3Modal, mobile } = useWeb3Context()
    const [isConnected, setConnected] = useState(connected)

    let pendingTransactions = useSelector(state => {
        return state.pendingTransactions
    })

    let buttonText = t("Connect Wallet")
    let clickFunc = connect
    let buttonStyle = {}

    if (isConnected) {
        if (mobile) {
            buttonText = shorten(address)
        } else {
            buttonText = t("Disconnect")
            clickFunc = disconnect
        }
    }

    if (pendingTransactions && pendingTransactions.length > 0) {
        buttonText = `${pendingTransactions.length} Pending `
        clickFunc = () => { }
    }

    if (isConnected && providerChainID !== DEFAULT_NETWORK) {
        buttonText = t("Wrong network")
        buttonStyle = { backgroundColor: "rgb(255, 67, 67)" }
        clickFunc = () => {
            checkWrongNetwork()
        }
    }

    useEffect(() => {
        setConnected(connected)
    }, [web3, connected])

    return (
        <div className="connect-button" style={buttonStyle} onClick={clickFunc}>
            <p>{buttonText}</p>
        </div>
    )
}

const Header = ({ props }) => {
    const { currentLanguage, setLanguage, t } = useTranslation()

    // console.log("props:", props)
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()
    const { isMobile } = useMatchBreakpoints()
    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork, address, web3Modal, mobile } = props
    const triedEager = useEagerConnect()
    const [modalVisible, setModalVisible] = useState(false)
    const [activatingConnector, setActivatingConnector] = React.useState()
    // const [locale, setLocale] = useState()
    const [mode, setmode] = useState('horizontal')
    const [show, setshow] = useState(true)
    const [announcementLists, setannouncementList] = useState([])
    // const [index,setindex] = useState(0)

    useEffect(() => {
        getAnnouncement()
        window.addEventListener('scroll', function () {
            let t = document.documentElement.scrollTop
            if (t > 0) {
                document.querySelector('.top_nav').classList.add('box-active')
            } else {
                document.querySelector('.top_nav').classList.remove('box-active')
            }
        })
    }, [activatingConnector, currentLanguage])
    const content = (
        <div className="popover">
            <Row>
                <Col span={12}>
                    <img src={iosapp}></img>
                    <p><img src={ios}></img><span>IOS</span></p>
                    <a href="https://wefi.space/download/ios.ipa"><Button>{t('iosapp')}</Button></a>
                </Col>
                <Col span={12}>
                    <img src={androidapk}></img>
                    <p><img src={android}></img><span>Android</span></p>
                    <a href="https://wefi.space/download/android.apk"><Button>{t('andriodapp')}</Button></a>
                </Col>
            </Row>
        </div>
    )
    const handleOk = () => {

    }
    const handleCancel = () => {
        setModalVisible(false)
    }
    const showModal = () => {
        setModalVisible(true)
    }
    const scrollToBottom = () => {
        const element = document.getElementById('app_download')
        element.scrollIntoView({ behavior: 'smooth' })
    }
    const items = [
        { label: (<a href="/">{t("HOME")}</a>), key: 'item-home' },
        {
            label: (<span className="products">{t("PRODUCTS")}<CaretDownOutlined /></span>),
            key: 'item-2',
            children: [
                { label: (<a href="/nft">WeFi NFT</a>), key: 'item-nft' },
                { label: (<a href="/dao">WeFi DAO</a>), key: 'item-dao' },
                { label: (<a href="/bbq">BBQ</a>), key: 'item-bbq' }
            ]
        },

        { label: (<Popover content={content}>{t("DOWNLOAD")}</Popover>), key: 'item-3' },
        { label: (<span onClick={scrollToBottom}>{t("About")}</span>), key: 'item-4' },
    ]
    const items2 = [
        {
            label: (<span className="product">{!currentLanguage?.locale ? t("Language") : currentLanguage?.language}<CaretDownOutlined /></span>),
            key: 'items',
            children: languageList.map((lang) => {
                return { label: <a href="#" onClick={() => { setLanguage(lang) }}>{lang.language}</a>, key: lang.locale }
            })

        }
    ]

    const showMenu = (val) => {
        let menu = document.querySelector(".menu_top")
        menu.style.display = show ? 'block' : 'none'
        setmode('inline')
        setshow(!val)
    }
    const move = () => {
        const aListDom = document.querySelector('.announcementList')
        const adom = document.querySelector('.announcementList').childNodes
        let first = adom[0]
        const firstLi = first?.cloneNode(true)
        setTimeout(function () {
            adom[0]?.animate({
                marginTop: '-15px',
                opacity: '0'
            }, 1000)
            setTimeout(function () {
                first.remove()
            }, 1000)
            aListDom.append(firstLi)
        }, 2000)
    }
    const getAnnouncement = () => {
        const timer = setInterval(() => {
            move()
        }, 5000)
        const width = document
        fetch(`https://wefi.space/home-web/index/getAffiche?language=${currentLanguage?.locale}`).then((res) => {
            res.json().then((response) => {
                if (response.code == 1) {
                    // response.data.map((item)=>{
                    //     item.title=t(item.title)
                    // })
                    console.log(response.data)
                    setannouncementList(response.data || [])
                    const timer = setInterval(() => {
                        move()
                    }, 7000)
                }
            })

        })
    }
    return <div>
        <div className="top_nav">
            <div className="mobile_nav" onClick={() => { showMenu(show) }}>
                <img src={nav}></img>
            </div>
            {/* <div className="lang_select">
                <div className="dropdown">
                    <span>{!locale ? t("Language") : locale}</span>
                    <div className="dropdown-content">
                        <a href="#" onClick={() => { changeL('zh') }}>简体中文</a>
                        <a href="#" onClick={() => { changeL('hk') }}>繁体中文</a>
                        <a href="#" onClick={() => { changeL('en') }}>English</a>
                    </div>
                </div>
            </div> */}
            <div className="lang_select">
                <Menu items={items2} mode={"horizontal"} className="dropdownD" />
            </div>

            <div className="connect_purse">
                <Button onClick={async() => {
                    if (await checkWrongNetwork()) return
                    if (!connected) {
                        connect()
                    } else {
                        disconnect()
                    }
                }} id="connectBtn">{!address ? t("ConnectWallet") : shorten(address)}</Button>
                {/* <ConnectMenu></ConnectMenu> */}
            </div>
            <div className="menu_top" >
                <Menu items={items} mode={mode} />
            </div>

        </div>
        <div className="placard">
            <Row>
                <Col span={10} >
                    <img src={logo}></img>
                </Col>
                <Col span={14}>
                    <img src={trumpet}></img>
                    <div className="announcement">
                        <div className="announcementList">
                            {
                                announcementLists.map(item => {
                                    return (<a href={item.external_links}>{item.title}</a>)
                                })
                            }
                        </div>
                    </div>

                </Col>
            </Row>
        </div>
        {/* <Modal
            title={address ? shorten(address) : "ConnectWallet"}
            cancelText={true}
            centered
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            className="c_money"
        // width="600px"
        >
            <p>
                <Button onClick={() => {
                    if (!connected) {
                        connect()
                    } else {
                        disconnect()
                    }
                }}>
                    <img src={app1}></img>
                    <p>Metamask</p>
                </Button>

            </p>
            <p>
                <img src={app2}></img>
                <p>Binance Wallet</p>
            </p>
            <p>
                <img src={app3}></img>
                <p>Coinbase Wallet</p>
            </p>
            <p>
                <img src={app4}></img>
                <p>More</p>
            </p>
        </Modal> */}
    </div >
}
export default Header