import './index.scss'
import { Row, Col } from 'antd'
import highlightbg from './../../statics/bg3.png'
import highlightbgM from './../../statics/mobile/bg3.png'
import bg4M from './../../statics/mobile/bg4.png'
import plate1 from './../../statics/guanshui.png'
import plate2 from './../../statics/kol.png'
import plate3 from './../../statics/simu.png'
import plate4 from './../../statics/activities.png'
import plate5 from './../../statics/jianzhi.png'
import plate6 from './../../statics/airdrop.png'
import plate7 from './../../statics/mine.png'
import plate8 from './../../statics/gold.png'
import plate9 from './../../statics/dazongshangpin.png'
import plate10 from './../../statics/zhengquan.png'
import plate11 from './../../statics/qihuo.png'
import plate12 from './../../statics/waihui.png'
import plate13 from './../../statics/zhishu.png'
import plate14 from './../../statics/lianghua.png'
import plate15 from './../../statics/jiaoyiruanjian.png'
import plate16 from './../../statics/gupiao.png'
import intl from 'react-intl-universal'
import { useEffect, useState } from 'react'
import { useTranslation } from './../../contexts/Localization'
import {  getLanguageCodeFromLS } from '../../../src/contexts/Localization/helpers'
import enhighlightbg from './../../statics/lightbg.png'
<<<<<<< HEAD
import imgicon1 from './../../statics/imgicon1.png'
import imgicon2 from '../../statics/imgicon2.png'
import imgicon3 from '../../statics/imgicon3.png'
import imgicon4 from '../../statics/imgicon4.png'
import imgicon5 from '../../statics/imgicon5.png'
import imgicon6 from '../../statics/imgicon6.png'
import imgicon7 from '../../statics/imgicon7.png'
import imgicon8 from '../../statics/imgicon8.png'
import imgicon9 from '../../statics/imgicon9.png'
import imgicon10 from '../../statics/imgicon10.png'
import imgicon11 from '../../statics/imgicon11.png'
import imgicon12 from '../../statics/imgicon12.png'
import imgicon13 from '../../statics/imgicon13.png'
import imgicon14 from '../../statics/imgicon14.png'
import imgicon15 from '../../statics/imgicon15.png'
import imgicon16 from '../../statics/imgicon16.png'
=======
import imgicon1 from './../../statics/guanshui.png'
import imgicon2 from '../../statics/kol.png'
import imgicon3 from '../../statics/simu.png'
import imgicon4 from '../../statics/activities.png'
import imgicon5 from '../../statics/jianzhi.png'
import imgicon6 from '../../statics/airdrop.png'
import imgicon7 from '../../statics/mine.png'
import imgicon8 from '../../statics/gold.png'
import imgicon9 from '../../statics/dazongshangpin.png'
import imgicon10 from '../../statics/zhengquan.png'
import imgicon11 from '../../statics/gupiao.png'
import imgicon12 from '../../statics/qihuo.png'
import imgicon13 from '../../statics/waihui.png'
import imgicon14 from '../../statics/zhishu.png'
import imgicon15 from '../../statics/lianghua.png'
import imgicon16 from '../../statics/jiaoyiruanjian.png'
>>>>>>> 1964c1ed964c346c1e7faaeaa6e205569b73fd66

const iconData =[
    {
        url:imgicon1,
        title:'Global local irrigation bar',
        desc:'local communication, irrigation interaction'
    },
    {
        url:imgicon2,
        title:'Global KOL bar',
        desc:'topic leading, communication and interaction'
    },
    {
        url:imgicon3,
        title:'Global Private Equity Bar',
        desc:'gathering global first-hand private equity information'
    },
    {
        url:imgicon4,
        title:'Global Events Bar',
        desc:'Latest Events, Lightning Acces'
    },
    {
        url:imgicon5,
        title:'Global part-time job',
        desc:'talent gathering, recruitment worry-free'
    },
    {
        url:imgicon6,
        title:'The World Air Drop Bar',
        desc:'Air Drop 0 jack, more fragrant without spending money'
    },
    {
        url:imgicon7,
        title:'Global Mining Bar',
        desc:'timely grasp the top mining hot dynamic'
    },
    
    
    {
        url:imgicon8,
        title:'Global Gold Bar',
        desc:'reserves, most timely investment insider'
    },
    {
        url:imgicon9,
        title:'Global Commodities Bar',
        desc:'information exchange such as commodity market, hot spot overview, etc.'
    },


    {
        url:imgicon10,
        title:'Global Securities Bar',
        desc:'Global Compliance Securities Exchange'
    },
    {
        url:imgicon11,
        title:'Global Stocks Bar',
        desc:'market, individual stocks topic discussion'
    },
    {
        url:imgicon12,
        title:'Global Futures Bar',
        desc:'dynamic, market tracking'
    },
    {
        url:imgicon13,
        title:'Global foreign exchange bar',
        desc:'policy, form, exchange rate exchange'
    },
    {
        url:imgicon14,
        title:'Global index bar',
        desc:'index, market discussion gathering place'
    },
    {
        url:imgicon15,
        title:'Global Quantitative Strategy Bar',
        desc:'policy, metrics implementation tools sharing'
    },
    {
        url:imgicon16,
        title:'Global Trading Software Bar',
        desc:'trading market software sharing'
    }

]
const ImgItem = ({picurl,title,desc}) => {
    return <div className="moduleStyle">
        <div className="imgStyle"><img src={picurl}/></div>
        <div className="textStyle">
            <div className='title'>{title}</div>
            <div className="desc" >{desc}</div>
        </div>
    </div>
}

const Why = () => {
    const { t } = useTranslation()
     
    const codeFromStorage = getLanguageCodeFromLS()
    let isEnlang = false
    let pclightBg= highlightbg
   
    if (codeFromStorage === 'en-US') {
       
        console.log('en-bg====')
        pclightBg = enhighlightbg
        isEnlang = true
    }

    const [imgUrl, setImgUrl] = useState(pclightBg)
    const [realWidth,setRealWidth] = useState('800px')
    useEffect(() => {
        const width = document.documentElement.clientWidth
        if (width <= 415) {
            setImgUrl(highlightbgM)
            setRealWidth('375px')
        } else {
            setImgUrl(pclightBg)
            setRealWidth('800px')
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
           { !isEnlang && (<div className='plateDivision'>
                <p>{t('Modules')}</p>
                <img src={bg4M}></img>
                <div className='drypic'>
                    
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
              </div>)
           } 


           { isEnlang && ( 
           <div>
           <div className='ModulesStyle'>{t('Modules')}</div>
           <div style={{ margin:'0 auto', display:'flex',width:realWidth,flexWrap:"wrap",justifyContent:"space-between"}}>

                
                {iconData.map( (v,index)=>{
                    console.log(v.url)
                    return  (
                        <ImgItem picurl={v.url} title={v.title} desc={v.desc}></ImgItem>
                      )
                })}
            </div>
            </div>
            )
         }
        </div>
    </div>
}
export default Why