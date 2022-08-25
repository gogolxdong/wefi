import React, { useState, useEffect } from "react"
import { Menu, Button, Select, Modal, Popover, Row, Col } from 'antd'
import './index.scss'
import app1 from './../../statics/app1.png'
import app2 from './../../statics/app2.png'
import app3 from './../../statics/app3.png'
import app4 from './../../statics/app4.png'
import iosapp from './../../statics/download.png'
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

const { Option } = Select
export const shorten = (str) => {
    if (str.length < 8) return str
    return `${str.slice(0, 4)}...${str.slice(str.length - 4)}`
}

function ConnectMenu() {
    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork, address, web3Modal, mobile } = useWeb3Context()
    const [isConnected, setConnected] = useState(connected)

    let pendingTransactions = useSelector(state => {
        return state.pendingTransactions
    })

    let buttonText = intl.get("Connect Wallet")
    let clickFunc = connect
    let buttonStyle = {}

    if (isConnected) {
        if (mobile) {
            buttonText = shorten(address)
        } else {
            buttonText = intl.get("Disconnect")
            clickFunc = disconnect
        }
    }

    if (pendingTransactions && pendingTransactions.length > 0) {
        buttonText = `${pendingTransactions.length} Pending `
        clickFunc = () => { }
    }

    if (isConnected && providerChainID !== DEFAULT_NETWORK) {
        buttonText = intl.get("Wrong network")
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

const Header = ({props}) => {
    console.log("props:",props)
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()
    const { isMobile } = useMatchBreakpoints()
    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork, address, web3Modal, mobile } = props
    console.log(providerChainID, address)
    const triedEager = useEagerConnect()
    const [modalVisible, setModalVisible] = useState(false)
    const [activatingConnector, setActivatingConnector] = React.useState()
    const [locale, setLocale] = useState()
    const [mode, setmode] = useState('horizontal')
    const [show, setshow] = useState(true)
    const [announcementLists, setannouncementList] = useState([])
    // const [index,setindex] = useState(0)

    useEffect(() => {
        // if (activatingConnector && activatingConnector === connector) {
        //     setActivatingConnector(undefined)
        // }
        getAnnouncement()
        window.addEventListener('scroll', function () {
            let t = document.documentElement.scrollTop
            if (t > 0) {
                document.querySelector('.top_nav').classList.add('box-active')
            } else {
                document.querySelector('.top_nav').classList.remove('box-active')
            }
        })
    }, [activatingConnector, locale])
    const content = (
        <div className="popover">
            <Row>
                <Col span={12}>
                    <img src={iosapp}></img>
                    <p><img src={ios}></img><span>ios</span></p>
                    <Button>{intl.get('iosapp')}</Button>
                </Col>
                <Col span={12}>
                    <img src={iosapp}></img>
                    <p><img src={android}></img><span>Android</span></p>
                    <Button>{intl.get('andriodapp')}</Button>
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
        const t = document.querySelector('.App').offsetHeight
        window.scroll({ top: t, left: 0, behavior: 'smooth' })
    }
    const items = [
        { label: (<a href="/">{intl.get("HOME")}</a>), key: 'item-1' },
        {
            label: (<span className="products">{intl.get("PRODUCTS")}<CaretDownOutlined /></span>),
            key: 'item-2',
            children: [
                { label: (<a href="/nft">WeFi NFT</a>), key: 'item-2-1' },
                { label: (<a href="/dao">WeFi DAO</a>), key: 'item-2-2' },
                { label: (<a href="/bbq">BBQ</a>), key: 'item-2-3' }
            ]
        },

        { label: (<Popover content={content}>{intl.get("DOWNLOAD")}</Popover>), key: 'item-3' },
        { label: (<span onClick={scrollToBottom}>{intl.get("About")}</span>), key: 'item-4' },
    ]
    const items2 = [
        {
            label: (<span className="product">{!locale ? intl.get("Language") : locale}<CaretDownOutlined /></span>),
            key: 'items',
            children: [
                { label: (<a href="#" onClick={() => { changeL('zh') }}>简体中文</a>), key: 'item-2-1' },
                { label: (<a href="#" onClick={() => { changeL('hk') }}>繁体中文</a>), key: 'item-2-2' },
                { label: (<a href="#" onClick={() => { changeL('en') }}>English</a>), key: 'item-2-3' }
            ]
        }
    ]
    const changeL = (val) => {
        let lag = val == 'zh' ? '简体中文' : val == 'en' ? 'English' : '繁体中文'
        setLocale(lag)
        localStorage.setItem('language', val)
        if (val == 'en') {
            document.querySelector('#connectBtn').style.width = '10rem'
        } else {
            document.querySelector('#connectBtn').style.width = '6.125rem'
        }
        // emit.emit('change_language', val)
    }
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
        const firstLi = first.cloneNode(true)
        setTimeout(function () {
            adom[0].animate({
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
        const language = window.localStorage.getItem('language') || 'zh'
        axios.get(`https://wefi.space/home-web/index/getAffiche?language=${language}`).then((res) => {
            if (res.status == 200) {
                setannouncementList(res.data.data || [])
                let index = 0
                const timer = setInterval(() => {
                    move()
                }, 7000)
            }
        })
    }
    return <div>
        <div className="top_nav">
            <div className="mobile_nav" onClick={() => { showMenu(show) }}>
                <img src={nav}></img>
            </div>
            {/* <div className="lang_select">
                <div className="dropdown">
                    <span>{!locale ? intl.get("Language") : locale}</span>
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
                <Button onClick={showModal} id="connectBtn">{!address ? intl.get("ConnectWallet"): shorten(address)}</Button>
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
        <Modal
            title={address? shorten(address): "ConnectWallet"}
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
        </Modal>
    </div>
}
export default Header