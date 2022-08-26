import './index.scss'
import { Row, Col } from 'antd'
import highlightbg from './../../statics/bg3.png'
import highlightbgM from './../../statics/mobile/bg3.png'
import bg4M from './../../statics/mobile/bg4.png'
import plate1 from './../../statics/plate (1).png'
import plate2 from './../../statics/plate (2).png'
import plate3 from './../../statics/plate (3).png'
import plate4 from './../../statics/plate (4).png'
import plate5 from './../../statics/plate (5).png'
import plate6 from './../../statics/plate (6).png'
import plate7 from './../../statics/plate (7).png'
import plate8 from './../../statics/plate (8).png'
import plate9 from './../../statics/plate (9).png'
import plate10 from './../../statics/plate (10).png'
import plate11 from './../../statics/plate (11).png'
import plate12 from './../../statics/plate (12).png'
import plate13 from './../../statics/plate (13).png'
import plate14 from './../../statics/plate (14).png'
import plate15 from './../../statics/plate (15).png'
import plate16 from './../../statics/plate (16).png'
import intl from 'react-intl-universal'
import { useEffect, useState } from 'react'
import { useTranslation } from './../../contexts/Localization'
const Why = () => {
    const { t } = useTranslation()
    const [imgUrl, setImgUrl] = useState(highlightbg)
    useEffect(() => {
        const width = document.documentElement.clientWidth
        if (width <= 415) {
            setImgUrl(highlightbgM)
        } else {
            setImgUrl(highlightbg)
        }
    }, [imgUrl])
    return <div>
        <div className="why">
            <div className="wefi">
                <p>{t("wefiWhy")}</p>
                <p>{t('wefiIntroduce')}</p>
                <Row>
                    <Col span={6}></Col>
                    <Col span={3}>
                        <span>100</span>
                        <span>%</span>
                        <span>{t('scializingIncome')}</span>
                    </Col>
                    <Col span={3}>
                        <span>5</span>
                        <span>+</span>
                        <span>{t('user')}</span>
                    </Col>
                    <Col span={3}>
                        <span>50</span>
                        <span>+</span>
                        <span>{t('Resources')}</span>
                    </Col>
                    <Col span={3}>
                        <span>5000</span>
                        <span>+</span>
                        <span>{t('NewsPiecesAH')}</span>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
            <div className='highlight'>
                <p>{t('Highlights')}</p>
                <img src={imgUrl}></img>
            </div>
            <div className='plateDivision'>
                <p>{t('Modules')}</p>
                <img src={bg4M}></img>
                <div>
                    <img src={plate1}></img>
                    <img src={plate2}></img>
                    <img src={plate3}></img>
                    <img src={plate4}></img>
                </div>
                <div>
                    <img src={plate5}></img>
                    <img src={plate6}></img>
                    <img src={plate7}></img>
                    <img src={plate8}></img>
                </div>
                <div>
                    <img src={plate9}></img>
                    <img src={plate10}></img>
                    <img src={plate16}></img>
                    <img src={plate11}></img>
                </div>
                <div>
                    <img src={plate12}></img>
                    <img src={plate13}></img>
                    <img src={plate14}></img>
                    <img src={plate15}></img>
                </div>
            </div>
        </div>
    </div>
}
export default Why