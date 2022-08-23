
import React, { useEffect } from 'react';
import Header from './views/header/index.js'
import Home from './views/index.js';
import NFT from './views/NFT/index.js'
import BBQ from './views/BBQ/index.js'
import DAO from './views/DAO/index.js'
import Footer from './views/footer/index'
import { Routes, Route } from "react-router-dom";
import { useWeb3React, } from '@web3-react/core'
import './libs/rem'
import './App.css'
import './assets/flexible.scss'
import './assets/flexible2.scss'
import intl from 'react-intl-universal';
import { emit } from './components/emit'

const locales = {
  "en": require('./locales/en-US.json'),
  "zh": require('./locales/zh-CN.json'),
  "hk": require('./locales/zh-HK.json')
};

class App extends React.Component {
  state = {
    init: false
  }
  componentWillMount() {
    emit.on('change_language', lang => this.loadLocales(lang)); // 监听语言改变事件
    this.loadLocales();
  }
  loadLocales = (lang = "zh") => {
    let langVal  = localStorage.getItem('language')?localStorage.getItem('language'):lang
    console.log(langVal)
    intl.init({
      currentLocale: langVal,
      locales,
    }).then(() => {
      this.setState({ init: true })
    })
  }
  render() {
    return (
      <div className="App" locale={this.state.init}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/bbq" element={<BBQ />} />
          <Route path="/dao" element={<DAO />} />
        </Routes>
        <Footer></Footer>
      </div>
    );
  }
}


export default App;
