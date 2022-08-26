import { Route, Routes, BrowserRouter } from "react-router-dom"
import Web3 from "web3"
import { useWeb3React, Web3ReactProvider } from "@web3-react/core"
import { useWeb3Context } from "./web3"
import { useEffect, useState, useCallback, useMemo } from "react"
import Header from './views/header/index.js'
import Home from './views/index.js'
import NFT from './views/NFT/index.js'
import BBQ from './views/BBQ/index.js'
import DAO from './views/DAO/index.js'
import Footer from './views/footer/index'
import './libs/rem'
import './App.css'
import './assets/flexible.scss'
import './assets/flexible2.scss'

function getLibrary(provider) {
  return new Web3(provider)
}

function App() {
  const context = useWeb3Context()
  const { connect, provider, address, hasCachedProvider, chainID, connected, disconnect, web3Modal } = context
  console.log("address:",address)
  useMemo(() => {
    const cached = hasCachedProvider()
    if (cached) {
      connect()
    } 
  }, [])


  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Header props={context}></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft" element={<NFT props={context} />} />
          <Route path="/dao" element={<DAO props={context}/>} />
          <Route path="/bbq" element={<BBQ props={context}/>} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </Web3ReactProvider>
  )
}

export default App
