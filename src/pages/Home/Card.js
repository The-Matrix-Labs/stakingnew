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
import Modal from './Modal'
import Progress from 'react-progressbar';

function Card({ 
  Active,
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
  locktime,
  poolsize
  }) {
    const { data: signer, isError, isLoading } = useSigner()
    const [mystakebalance, setMystakeBalance] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [claimableTokens, setClaimableTokens] = useState(0)
    const [unlockTime, setUnlockTime] = useState(1);
    const [myTokenBalance, setMyTokenBalance] = useState(0)
    const [walletAddressInfo, setWalletAddressInfo] = useState()
    const [istokenapproved, settokenapproved] = useState(false)
    const [amount, setAmount] = useState(Number)
    const [errors, setError] = useState()

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
        // signer.getAddress().then((res)=>{setMyaddress(res)})
        getUserInfo()
        getClaimableTokens()
        getUserLockTime()
        // getUserLockTime()
        // // getPoolInfo()
        getTokenBalance()
        getWhiteListAddresses()
        // checkApproved()
        // getClaimableTokens()
        // getPoolLength()
        // getPoolArray()
      }
    }

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


      async function getWhiteListAddresses (){
      try{   
        let userAddress = await signer.getAddress()
        let _wlInfo = await staking.whitelistedAddress( index, userAddress);
        console.log ("Whitelist Info: ", _wlInfo);
        setWalletAddressInfo(_wlInfo);
      }catch(err){
        console.log("User error", err);
      }
    }

      const checkApproved = async() => {
        let userAddress = await signer.getAddress()
        const isApproved = await token.allowance(userAddress, value.stakingAddress);
        const totaltokenapproved = isApproved.toString()
        if(totaltokenapproved.length > 2){
          console.log("approved", totaltokenapproved);
          settokenapproved(true)
        }
        else{
          console.log("Not Approved",totaltokenapproved);
          settokenapproved(false)

        }
      }

      async function unstakeTokens () {
        try{
          let tx = await staking.unstakeTokens(index);
          let reciept = await tx.wait();
          console.log ("Unstake Tx Receipt: ", reciept);
          refreshData(signer)
        }catch (error) {
          console.log (error);
          try {
            setError(error.error.data.message)
          } catch {
            setError("Something went wrong, please try again!")
          }
        }
      }
    
      async function emergencyWithdraw () {
        try{
          const _staking = new ethers.Contract(
            value.stakingAddress,
            stakingAbi,
            signer,
          )
          
          let tx = await _staking.emergencyWithdraw(index);
          let reciept = await tx.wait();
          console.log ("Emergency Withdraw Tx Receipt: ", reciept);
          refreshData(signer)
        }catch (error) {
          console.log ("eeoeoeo", error.toString());
          try {
            setError(error.error.data.message)
          } catch {
            setError("Something went wrong, please try again!")
          }

        }
      }

    async function getTokenBalance(){
    let userAddress = await signer.getAddress()
    const tokenbalance = await token.balanceOf(userAddress);
    const tokenbalanceConverted = ethers.utils.formatEther(tokenbalance.toString())
    console.log("My Token Balance -",ethers.utils.formatEther(tokenbalance.toString()))
    setMyTokenBalance(Math.floor(tokenbalanceConverted))
  }

    async function getUserLockTime (){
    try{
      let userAddress = await signer.getAddress()
      let myunlocktime = await staking.getUserLockTime(index, userAddress);
      let _wallet = await signer.getAddress();      
      let _userInfo = await staking.userInfo( index, _wallet);
      let _stakedAmount = ethers.utils.formatEther(_userInfo.amount.toString());

      if (_stakedAmount == 0) {
        setUnlockTime("Not staked yet");
        return;
      }
      let _timestamp = parseInt(myunlocktime.toString())* 1000;
      let _time = new Date(_timestamp);
      console.log ("Unlock Time: ", _time);
      if (_timestamp >0) setUnlockTime(_time.toString());
      else setUnlockTime("Not staked yet");
    }catch(err){
      console.log("User error", err);
    }
  }

    const onChangeInput = ({target}) => {
    switch (target.id) {
      case "stake":
        setAmount(target.value)
          console.log("Amount:", amount);
        break;

      // case "unstake":
      //   setWithdrawInput(target.value);
      //   break;
    
      // case "viewStruct":
      //   setstakeDetails(target.value);
      //   break;
    default:
    }
  }

  async function getClaimableTokens () {
    try {
      let userAddress = await signer.getAddress();
      let _claimableTokens = await staking.claimableRewards(index, userAddress);
      console.log("Claimable Tokens: ", _claimableTokens.toString());
      setClaimableTokens(ethers.utils.formatUnits(_claimableTokens, 6).toString());
    }catch (error){
      console.log("Claimable error", error);
    }
  }

  async function stakeTokens () {
    if(walletAddressInfo){
      try{
        if(amount === undefined){
          alert("Enter Amount First")
        }
        else{
          await approve()
          let _amount = ethers.utils.parseEther(amount);
          // console.log (_amount)
          let tx = await staking.stakeTokens(index, _amount);
          let reciept = await tx.wait();
          console.log ("Stake Tx Receipt: ", reciept);
          refreshData(signer)
        }              
      }catch (error) {
        console.log (error);
        try {
          setError(error.error.data.message)
        } catch {
          setError("Something went wrong, please try again!")
        }
      }
    }
    else{
      alert('Your Wallet Is Not Witelisted For Staking')
    }
  }

  async function approve() {
    if(!istokenapproved){
      console.log('Not Approved')
      try{
        let _amount = ethers.utils.parseEther("10000000000000000000");
        let tx = await token.approve(value.stakingAddress, _amount);
        let reciept = await tx.wait();
        console.log ("Approve Tx Receipt: ", reciept);
      }catch (error) {
        console.log (error);
        // alert(error.data.message);
      }
    }
    else{
      console.log('already approved')
    }
    
  }

  const maxpoolConverted = ethers.utils.formatEther(maxPoolSize.toString())

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
              <Progress color="#000" completed={(parseFloat(poolsize)* 100)/parseFloat(maxpoolConverted)} height={30} data-label={`${(parseFloat(poolsize)* 100)/parseFloat(maxpoolConverted)}% Pool Filled`} />
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
              {isOpen && <Modal 
              key={index} 
              setIsOpen={setIsOpen} 
              tokenAddress={tokenAddress}
              // Active={ Active } 
              onChangeInput ={onChangeInput} 
              reward={reward} 
              claimableTokens = {claimableTokens} 
              locktime ={locktime} 
              unlockTime={unlockTime}
              myTokenBalance={myTokenBalance}
              stakeTokens = {stakeTokens}
              unstakeToken = {unstakeTokens}
              emergencyWithdraw = {emergencyWithdraw}
              // unlockTime={unlockTime}
              />}
            </div>
  )
}

export default Card