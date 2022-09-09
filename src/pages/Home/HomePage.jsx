import React, { useState,useEffect } from 'react'
import sandclock from '../../images/sandclock.png';
import search from '../../images/search.png'
import './HomePage.css';
import "@rainbow-me/rainbowkit/dist/index.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import CloseIcon from '@mui/icons-material/Close';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { darkTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import tokenAbi from '../../tokenAbi.json'
import stakingAbi from '../../stakeAbi.json'
import value from '../../value.json'

import {useSigner, useProvider} from 'wagmi'
import { ethers } from 'ethers';
import Card from './Card';

function HomePage() {
  const { data: signer, isError, isLoading } = useSigner()
  const [Active, setActive] = useState(true);

  const [myaddress, setMyaddress] = useState()
  // const [poolId, setPoolId] = useState(1)



  const [poolInfo, setPoolInfo] = useState()
  const [userInfo, setUserInfo] = useState()
  const [walletAddressInfo, setWalletAddressInfo] = useState()
  const [locktime, setLockTime] = useState(1)

  const [emergencyfee, setEmergencyfee] = useState()
  const [poolsize, setPoolSize] = useState()
  const [maxpool, setMaxPool] = useState()
  const [reward, setReward] = useState()

  const [buttonactive1, setButtonactive1] = useState("activebutton")
  const [buttonactive2, setButtonactive2] = useState("")
  const [buttonactive3, setButtonactive3] = useState("")
  const [buttonactive4, setButtonactive4] = useState("")
  const [maxtoken, setMaxToken] = useState()
  const [maxContribution, setMaxContribution] = useState()
  const [claimableTokens, setClaimableTokens] = useState(0)
  const [poolLength, setpoolLength] = useState(null)
  const [poolDetails, setpoolDetails] = useState([])
  // let poolDetails = []

  const staking = new ethers.Contract(
    value.stakingAddress,
    stakingAbi,
    signer,
  )


  const token = new ethers.Contract(
    value.stakingToken,
    tokenAbi,
    signer,
  )

  function refreshData (signer) {
    if(signer){
      signer.getAddress().then((res)=>{setMyaddress(res)})
      // getUserInfo()
      // getUserLockTime()
      // // getPoolInfo()
      // getTokenBalance()
      // getWhiteListAddresses()
      // checkApproved()
      // getClaimableTokens()
      // getPoolLength()
      getPoolArray()
    }
  }

  async function getPoolArray(){
    for (let i = 0; i < await getPoolLength(); i++) {
      poolDetails[i] = await getPoolInfo(i);
    }
    console.log("array:",poolDetails);
  }
  
  console.log("array again:",poolDetails);

  async function getPoolInfo(poolId){
    try{
      let _poolInfo = await staking.poolInfo(poolId);
      return _poolInfo;
      // console.log ("Emergency Fees: ", _poolInfo.emergencyFees.toString());
      // const emergencywithdrawfee = await _poolInfo.emergencyFees.toString()
      // const currrentpoolsize = await _poolInfo.currentPoolSize.toString()
      // const maxcontribution = await _poolInfo.maxContribution.toString()
      // const maxcontributionconverted = ethers.utils.formatEther(maxcontribution)
      // const currrentpoolsizeConverted = Math.floor(ethers.utils.formatEther(currrentpoolsize))
      // const maxpool = await _poolInfo.maxPoolSize.toString()
      // const maxpoolConverted = ethers.utils.formatEther(maxpool)
      // const currentreward = await _poolInfo.reward.toString()
      // const lockDays = await _poolInfo.lockDays.toString();
      // setPoolInfo(_poolInfo);
      // setEmergencyfee(emergencywithdrawfee);
      // setPoolSize(currrentpoolsizeConverted);
      // setReward(currentreward)
      // setLockTime(lockDays)
      // setMaxPool(maxpoolConverted)
      // setMaxContribution(maxcontributionconverted)
      // console.log("maxpool" + maxpoolConverted)
      // console.log("current pool" + currrentpoolsizeConverted)
      // poolDetails.push(_poolInfo) ;
    }catch(err){
      console.log(err.message);
    }
  }

  // async function getUserInfo (poolId){

  //   try{
  //     let _userInfo = await staking.userInfo(poolId, signer.getAddress());
  //     console.log ("my stake token amount: ", ethers.utils.formatEther(_userInfo.amount.toString()));
  //     setMystakeBalance(ethers.utils.formatEther(_userInfo.amount.toString()));
  //   }catch(err){
  //     console.log("User error", err);
  //   }
  // }





  // const onChangeInput = ({target}) => {
  //   switch (target.id) {
  //     case "stake":
  //       setAmount(target.value)
  //         console.log("Amount:", amount);
  //       break;

  //     // case "unstake":
  //     //   setWithdrawInput(target.value);
  //     //   break;
    
  //     // case "viewStruct":
  //     //   setstakeDetails(target.value);
  //     //   break;
  //   default:
  //   }
  // }


  
  async function getPoolLength() {
    const length = await staking.poolLength()
    return (Number(length))
  }

  // console.log("length is",getPoolLength());

  useEffect( ()=>{
    refreshData(signer)
  },[signer])

  return (
    <div className='HomePage'>
      <div className='home__top'>
        <div className='home__topSub'>
          <div className='home__topLeft'>
            <div className='home__topTitle'>Provide Liquidity, Earn FTR</div>
            <div className='home__topAmount'>$105,786,890.44</div>
            <div className='home__topDesc'>Total alue Locked(TVL)</div>
            <div className='home__topSearch'>
              <div className='home__topSearchBox'>
                <div className='home__topSearchIcon'>
                  <img src={search} alt='sandclock'/>
                </div>
                <div className='home__topSearchInput'>
                  <input
                    className='home__topInput'
                    type='text'
                    placeholder='Search by token symbol'/>
                </div>
              </div>
              <div className='home__topSearchButton'>
                Search
              </div>
            </div>
          </div>
          <div className='home__topRight'>
            <div className='home__topImg'>
              <img src={sandclock} alt='sandclock'/>
            </div>
          </div>
        </div>
      </div>
      <div className='home__bottom'>
        <div className='home__bottomSub'>
          <div className='home__bottomTop'>
            <div className='home__bottomMenu'>
            <div className={'home__bottomOption '+(Active ? 'home--active' : '')} onClick={()=>setActive(!Active)}>Active</div>
              <div className={'home__bottomOption '+(!Active ? 'home--active' : '')} onClick={()=>setActive(!Active)}>Ended</div>
            </div>
          </div>
          <div className='home__bottomGrid'>
          
            {Active ?
            poolDetails.filter(pool => pool.poolActive).map(pool => <Card Active={Active} claimableTokens = {claimableTokens} locktime ={locktime} poolsize={poolsize} {...pool}/>)
            //   <>
                
            // <Card Active={Active} setIsOpen={setIsOpen} reward={reward} claimableTokens = {claimableTokens} locktime ={locktime} unlockTime={unlockTime} poolsize={poolsize} myTokenBalance={myTokenBalance}/>
            // <Card Active={ Active} setIsOpen={setIsOpen} reward={reward} claimableTokens = {claimableTokens} locktime ={locktime} unlockTime={unlockTime} poolsize={poolsize} myTokenBalance={myTokenBalance}/>
            // <Card Active={ Active} setIsOpen={setIsOpen} reward={reward} claimableTokens = {claimableTokens} locktime ={locktime} unlockTime={unlockTime} poolsize={poolsize} myTokenBalance={myTokenBalance}/>
            // <Card Active={ Active} approve={approve}  setIsOpen={setIsOpen} reward={reward} claimableTokens = {claimableTokens} locktime ={locktime} unlockTime={unlockTime} poolsize={poolsize} myTokenBalance={myTokenBalance}/>
            //   </>
              :
              poolDetails.filter(pool => !pool.poolActive).map((pool, index)=> <Card key={index} index={index} Active={Active} reward={reward} claimableTokens = {claimableTokens} locktime ={locktime} poolsize={poolsize} {...pool}/>)
              // <>
              //   <Card Active={Active} />
              //   <Card Active={Active} />
              //   <Card Active={ Active}/>
              // </>
            }
          </div>
          

        </div>
      </div>    
    </div>
  )
}

export default HomePage