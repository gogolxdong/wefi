import { Row, Col, Button,Popover } from "antd"
import './index.scss'
import applogo from './../../statics/applogo.png'
import icon1 from './../../statics/icon1.png'
import icon2 from './../../statics/icon2.png'
import icon3 from './../../statics/icon3.png'
import icon4 from './../../statics/icon4.png'
import icon5 from './../../statics/icon5.png'
import icon6 from './../../statics/icon6.png'
import icon7 from './../../statics/icon7.png'
import icon8 from './../../statics/icon8.png'
import icon9 from './../../statics/mobile/icon9.png'
import iosapp from './../../statics/iosipa.png'
import androidapk from './../../statics/androidapk.png'
import ios from './../../statics/ios.png'
import android from './../../statics/android.png'
import { useTranslation } from './../../contexts/Localization'

const Footer = () => { 
    const { t } = useTranslation()
    const content = (
    <div className="popover">
        <Row>
            <Col span={12}>
                <img src={iosapp}></img>
                <p><img src={ios}></img><span>ios</span></p>
                <a href="https://wefi.space/download/ios.ipa"><Button>{t('iosapp')}</Button></a>
            </Col>
            <Col span={12}>
                <img src={androidapk}></img>
                <p><img src={android}></img><span>Android</span></p>
                <a href="https://wefi.space/download/android.apk"><Button>{t('andriodapp')}</Button></a>
            </Col>
        </Row>
    </div>
);
    const closeDownload=()=>{
        document.getElementById('appLeft').style.display = 'none'
        setTimeout(() => {
            document.querySelector('.mobile_popover').style.display = 'none'
        }, 200);
    }
    return <div>
        <div className="app_download" id="app_download">
            <Row>
                <Col span={14} className="app_left" id="appLeft">
                <Popover content={content} overlayClassName="mobile_popover">
                    <Row>
                        
                        <Col span={9}>
                            <img src={applogo}></img>
                        </Col>
                        <Col span={8}>
                            <p><span>WeFi</span><span>Android & iOS</span></p>
                            <p>{t("clickApp")}</p>
                        </Col>
                       
                        <Col span={6}>
                            <Popover content={content} overlayClassName="pc_popover">
                                <Button>{t("wefiwordBtn")}</Button>
                            </Popover>
                            <a id="floatD" onClick={closeDownload}><img src={icon9}></img></a>
                        </Col>
                    </Row>
                    </Popover>
                </Col>
                <Col span={10} className="app_right">
                    <span></span>
                    <div>
                       <a href='https://www.facebook.com/' target="_blank"><img src={icon1}></img></a> 
                       <a href="https://www.youtube.com/" target="_blank"> <img src={icon2}></img></a>
                       
                        {/* <img src={icon3}></img> */}
                        <a href="https://discord.gg/qq4bNHcM" target="_blank">
                        <img src={icon4}></img></a>
                    </div>
                    <div>
                        <a href="https://twitter.com/WeFi_DAO" target="_blank"><img src={icon5}></img></a>
                        <a href="https://t.me/wefi_official" target="_blank"><img src={icon6}></img></a>
                        {/* <img src={icon7}></img> */}
                        {/* <img src={icon8}></img> */}
                    </div>
                </Col>
            </Row>
        </div>
        <div className="bottom">
            <p>© 2022 WeFi Pty. Ltd.</p>
            <p>
                <span>{t('TermsAConditions')}</span><span>|</span>
                <span>{t('PrivacyPolicy')}</span><span>|</span>
                <span>{t('AMLPolicy')}</span><span>|</span>
                <span>{t('PGPKey')}</span>
            </p>
        </div>
    </div>
}
export default Footer