import React, { useState, useEffect } from "react";
import { Menu, Button, Select, Modal, Popover, Row, Col } from 'antd'
import './index.scss'
import app1 from '@/statics/app1.png'
import app2 from '@/statics/app2.png'
import app3 from '@/statics/app3.png'
import app4 from '@/statics/app4.png'
import iosapp from '@/statics/download.png'
import ios from '@/statics/ios.png'
import android from '@/statics/android.png'
import nav from '@/statics/mobile/nav.png'
import logo from '@/statics/logo.png'
import trumpet from '@/statics/trumpet.png'
import { useEagerConnect, useInactiveListener } from './../constants/hooks'
import { injected } from './../constants/index'
import { Web3ReactProvider, useWeb3React, } from '@web3-react/core'
import intl from 'react-intl-universal'
import { emit } from './../../components/emit'
import axios from "axios";
import {CaretDownOutlined} from '@ant-design/icons'

const { Option } = Select;



const Nav = () => {
    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const triedEager = useEagerConnect()
    const [modalVisible, setModalVisible] = useState(false);
    const [activatingConnector, setActivatingConnector] = React.useState()
    const [locale, setLocale] = useState()
    const [mode, setmode] = useState('horizontal')
    const [show, setshow] = useState(true)
    const [announcementLists,setannouncementList] = useState([])
    // const [index,setindex] = useState(0)
    let isDisconnect = !error && chainId

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
        getAnnouncement()
        window.addEventListener('scroll', function(){
            let t = document.documentElement.scrollTop;   // 目前监听的是整个body的滚动条距离
            if(t>0){
                document.querySelector('.top_nav').classList.add('box-active')
           }else{
                document.querySelector('.top_nav').classList.remove('box-active')
           }
        })
    }, [activatingConnector, connector, locale]);
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
    );
    const handleOk = () => {

    }
    const handleCancel = () => {
        setModalVisible(false)
    }
    const showModal = () => {
        setModalVisible(true)
    }
    const items = [
        { label: (<a href="/">{intl.get("HOME")}</a>), key: 'item-1' }, // 菜单项务必填写 key
        {
            label: (<span className="products">{intl.get("PRODUCTS")}<CaretDownOutlined /></span>),
            key: 'item-2',
            children: [
                { label: (<a href="/nft">WeFi NFT</a>), key: 'item-2-1' },
                { label: (<a href="/dao">WeFi DAO</a>), key: 'item-2-2' },
                { label: (<a href="/bbq">BBQ</a>), key: 'item-2-3' }
            ]
        },

        { label: (<Popover content={content}>{intl.get("DOWNLOAD")}</Popover>), key: 'item-3' }, // 菜单项务必填写 key
        { label: (intl.get("About")), key: 'item-4' }, // 菜单项务必填写 key
    ];
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
    ];
    const changeL = (val) => {
        let lag = val == 'zh' ? '简体中文' : val == 'en' ? 'English' : '繁体中文'
        setLocale(lag)
        localStorage.setItem('language',val)
        if (val == 'en') {
            document.querySelector('#connectBtn').style.width = '10rem'
        } else {
            document.querySelector('#connectBtn').style.width = '6.125rem'
        }
        emit.emit('change_language', val);
    }
    const showMenu = (val) => {
        let menu = document.querySelector(".menu_top");
        menu.style.display = show ? 'block' : 'none'
        setmode('inline')
        setshow(!val)
    }
    const move=()=>{
        const aListDom = document.querySelector('.announcementList')
        const adom = document.querySelector('.announcementList').childNodes
        let first = adom[0] //获取列表第一个li
        const firstLi = first.cloneNode(true); //复制第一个li
        setTimeout(function() {
            adom[0].animate({//列表第二个添加动画，
            marginTop: '-15px',
            opacity: '0'
            }, 1000);
            setTimeout(function() {//动画结束后删除第一个li
                first.remove();
            }, 1000)
            aListDom.append(firstLi)//li复制到最后面开始新的一轮循环
        },2000)
    }
    const  getAnnouncement=()=>{
        const timer = setInterval(()=>{
            move()
        },5000)
        const width = document
        axios.get('https://wefi.space/home-web/index/getAffiche').then((res)=>{
            if(res.status == 200){
                setannouncementList(res.data.data||[])
                let index = 0;
                const timer = setInterval(()=>{
                    move()
                },7000)
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
                <Menu items={items2} mode={"horizontal"} className="dropdownD"/>
            </div>
           
            <div className="connect_purse">
                <Button onClick={showModal} id="connectBtn">{intl.get("ConnectWallet")}</Button>
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
                                announcementLists.map(item=>{
                                    return  (<a href={item.external_links}>{item.title}</a>)
                                })
                            }
                        </div>
                    </div>
                    
                </Col>
            </Row>
        </div>
        <Modal
            title={intl.get("ConnectWallet")}
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
                    if (!isDisconnect) {
                        setActivatingConnector(injected)
                        activate(injected)
                    } else {
                        deactivate()
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
export default Nav