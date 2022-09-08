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
import Modal from './Modal'
import {useSigner, useProvider} from 'wagmi'
import { ethers } from 'ethers';
import Card from './Card';

function HomePage() {
  const { data: signer, isError, isLoading } = useSigner()
  const [Active, setActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [myaddress, setMyaddress] = useState()
  const [poolId, setPoolId] = useState(1)
  const [errors, setError] = useState()
  const [amount, setAmount] = useState(Number)
  const [istokenapproved, settokenapproved] = useState(false)

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
      // getPoolInfo()
      // getTokenBalance()
      // getWhiteListAddresses()
      checkApproved()
      // getClaimableTokens()
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

  async function stakeTokens () {
    // if(walletAddressInfo){
      try{
        if(amount === undefined){
          alert("Enter Amount First")
        }
        else{
          await approve()
          let _amount = ethers.utils.parseEther(amount);
          // console.log (_amount)
          let tx = await staking.stakeTokens(poolId, _amount);
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
    // }
    // else{
    //   alert('Your Wallet Is Not Witelisted For Staking')
    // }
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



  useEffect(()=>{
    refreshData(signer)
  },[signer, poolId])

  return (
    <div className='HomePage'>
      <div className='home__top'>
        <div className='home__topSub'>
          <div className='home__topLeft'>
            <div className='home__topTitle'>Provide Liquidity, Earn FTR</div>
            <div className='home__topAmount'>$105,786,890.44</div>
            <div className='home__topDesc'>Total Value Locked(TVL)</div>
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
              <>
                <Card Active={Active} setIsOpen={setIsOpen} />
            <Card Active={Active} setIsOpen={setIsOpen} />
            <Card Active={ Active} setIsOpen={setIsOpen} />
            <Card Active={ Active} setIsOpen={setIsOpen} />
            <Card Active={ Active} approve={approve}  setIsOpen={setIsOpen} />
              </>
              :
              <>
                <Card Active={Active} />
                <Card Active={Active} />
                <Card Active={ Active}/>
              </>
            }
          </div>

        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} Active={ Active } onChangeInput ={onChangeInput} stakeTokens={stakeTokens}/>}
      
    </div>
  )
}

export default HomePage