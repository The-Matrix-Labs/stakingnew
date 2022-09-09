import React, { useState,useEffect } from 'react'
import './Card.css'
import bitlogo from '../../images/abit.png'
import bitcoin from '../../images/bitcoin.png'
import light from '../../images/light.png'
import gift from '../../images/gift.png'
import tokenAbi from '../../tokenAbi.json'
import stakingAbi from '../../stakeAbi.json'
import value from '../../value.json'
import {useSigner, useProvider} from 'wagmi'
import { ethers } from 'ethers';


function Card({ 
  Active ,
  setIsOpen,
  onChangeInput,
  stakeTokens,
  currentPoolSize,
  emergencyFees,
  lockDays,
  maxContribution,
  maxPoolSize,
  poolActive,
  poolType,
  reward,
  index,
  tokenAddress,
  claimableTokens,
  locktime,
  unlockTime,
  poolsize,
  myTokenBalance
  }) {
    const { data: signer, isError, isLoading } = useSigner()
    const [mystakebalance, setMystakeBalance] = useState()

    const staking = new ethers.Contract(
      value.stakingAddress,
      stakingAbi,
      signer,
    )

    function refreshData (signer) {
      if(signer){
        // signer.getAddress().then((res)=>{setMyaddress(res)})
        getUserInfo()
        // getUserLockTime()
        // // getPoolInfo()
        // getTokenBalance()
        // getWhiteListAddresses()
        // checkApproved()
        // getClaimableTokens()
        // getPoolLength()
        // getPoolArray()
      }
    }


    console.log("key",index);

    useEffect( ()=>{
      refreshData(signer)
    },[signer])

    async function getUserInfo (){

      try{
        let _userInfo = await staking.userInfo(index, signer.getAddress());
        console.log ("my stake token amount: ", ethers.utils.formatEther(_userInfo.amount.toString()));
        setMystakeBalance(ethers.utils.formatEther(_userInfo.amount.toString()));
      }catch(err){
        console.log("User error", err);
      }
    }

    console.log("mystsakebalance",mystakebalance);

  return (
    <div className='home__bottomCard'>
              <div className='home__cardHeader'>
                <div className='home__cardLogo'>
                  <img className='home__bitlogo' src={bitlogo} alt='bitlogo' />
                  <img className='home__bitcoin' src={bitcoin} alt='bitcoin' />
                </div>
                <div className='home__cardTitle'>
                  Tok-EN NAME
                </div>
              </div>
              <div className='home__cardDetails'>
                <div className='home__cardPercent'>
                {((parseInt(reward)* 365)/(locktime* 10)).toFixed(2)}% 
                </div>
                <div className='home__cardName'>
                  APR
                </div>
              </div>
              <div className='home__cardDesc'>
                <div className='home__descOption'>
                  <div className='home__descTitle'>Reward Token</div>
                  <div className='home__descValue'>
                   <p style={{fontSize: "10px"}}>{tokenAddress}</p>
                   <img src={light} alt='light' /> 
                  </div>
                </div>
                <div className='home__descOption'>
                  <div className='home__descTitle'>Value Locked</div>
                  <div className='home__descValue'>{Number(currentPoolSize).toLocaleString('en-US')}</div>
                </div>
                <div className='home__descOption'>
                  <div className='home__descTitle'>My Share</div>
                  <div className='home__descValue'>$0(0%)</div>
                </div>
                <div className='home__descOption'>
                  <div className='home__descTitle'>Available Balance</div>
                  <div className='home__descValue'>{mystakebalance}</div>
                </div>
                <div className='home__descOption'>
                  <div className='home__descTitle'>My Reward</div>
                  <div className='home__descValue'>$0 <img className='home__descGift' src={gift} alt='gift'/> </div>
                </div>
              </div>
              <div className={'home__cardButton '+(Active ? '' : 'home--ended')} onClick={() => setIsOpen(true)}>
              { Active ? "Stake" : "Ended"}
              </div>
            </div>
  )
}

export default Card