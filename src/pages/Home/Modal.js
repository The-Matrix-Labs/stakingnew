import './Modal.css'
import light from '../../images/light.png'
import electro from '../../images/electro.png'
import CloseIcon from '@mui/icons-material/Close';

import React, {useEffect, useState} from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useSigner, useProvider} from 'wagmi'
import { ethers } from 'ethers';
import value from '../../value.json'
import tokenAbi from '../../tokenAbi.json'
import stakingAbi from '../../stakingAbi.json'

import { QueryClient, QueryClientProvider } from 'react-query'
 
const queryClient = new QueryClient()

function Modal({setIsOpen}) {

    const [Active, setActive] = useState(true);
    const [perActive,setperActive] = useState("25")

    // const { data: signer, isError, isLoading } = useSigner()
    // const provider = useProvider();

    // const staking = new ethers.Contract(
    //     value.stakingAddress,
    //     stakingAbi,
    //     signer,
    // )

    // const token = new ethers.Contract(
    //     value.stakingToken,
    //     tokenAbi,
    //     signer,
    // )

    const [amount, setAmount] = useState();
    const [stakingTime, setStakingTime] = useState();
    const [userRewardClaimed, setUserRewardClaimed] = useState();
    const [poolType, setPoolType] = useState(); //true for public, false for whitelist
    const [poolActive, setPoolActive] = useState();
    const [lockDays, setLockDays] = useState(1);
    const [emergencyfee, setEmergencyfee] = useState();
    const [reward, setReward] = useState();
    const [maxContribution, setMaxContribution] = useState();
    const [currentPoolsize, setCurrentPoolSize] = useState();
    const [maxPoolsize, setMaxPoolSize] = useState();
    const [tokenAddress, setTokenAddress] = useState();
    const [poolId, setPoolId] = useState(0);
    const [poolLength, setPoolLength] = useState();
    const [poolInfo, setPoolInfo] = useState([]); // array
    const [userInfo, setUserInfo] = useState(); // mapping
    const [whitelistAddress, setWhitelistAddress] = useState(); // mapping
    const [myTokenBalance, setMyTokenBalance] = useState(0)
    const [myaddress, setMyaddress] = useState();
    const [errors, setError] = useState();



    // Which additional ones are needed? ====>
    // const [walletAddressInfo, setWalletAddressInfo] = useState()
    // const [mystakebalance, setMystakeBalance] = useState()
    // const [istokenapproved, settokenapproved] = useState(false)
    // const [buttonactive1, setButtonactive1] = useState("activebutton")
    // const [buttonactive2, setButtonactive2] = useState("")
    // const [buttonactive3, setButtonactive3] = useState("")
    // const [buttonactive4, setButtonactive4] = useState("")
    // const [maxtoken, setMaxToken] = useState()
    // const [claimableTokens, setClaimableTokens] = useState(0)

    // Uncomment after fixing
    // ======================>
    
    // useEffect(()=>{
      //     refreshData(signer)
      
      // },[signer, poolId])
      
      function refreshData (signer) {
            if(signer){
                signer.getAddress()
                      .then((res)=>{setMyaddress(res)})
                getUserInfo()
                getUserLockTime()
                getPoolInfo()
                getTokenBalance()
                getWhiteListAddresses()
                checkApproved()
                getClaimableTokens()
              }
          }
    
          // ======================>
          
    async function getPoolLength() { // number of pools
        try{
        //   const poolInfo = await staking.poolInfo;
        //   const poolLength = poolInfo.length;
        //   console.log ("Pool Info: ", poolInfo);
        //   console.log("Pool length: ", poolLength);
        //   return poolLength;
        } 
        catch(err) {
          console.log(err.message);
        }
      }

        async function getPoolInfo (){
        try{
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
        }catch(err){
          console.log(err.message);
        }
      }

      async function getUserInfo (){
        try{
          // let _userInfo = await staking.UserInfo(poolId, signer.getAddress());
          // console.log ("my stake token amount: ", ethers.utils.formatEther(_userInfo.amount.toString()));
          // setMystakeBalance(ethers.utils.formatEther(_userInfo.amount.toString()));
        }catch(err){
          console.log("User error: ", err);
        }
      }

      async function getClaimableTokens () {
        try {
          // let userAddress = await signer.getAddress();
          // let _claimableTokens = await staking.claimableRewards(poolId, userAddress);
          // console.log("Claimable Tokens: ", _claimableTokens.toString());
          // setClaimableTokens(ethers.utils.formatUnits(_claimableTokens, 6).toString());
        }catch (error){
          console.log("Claimable error", error);
        }
      }
    
      async function getUserLockTime (){
        try{
          // let userAddress = await signer.getAddress()
          // let myunlocktime = await staking.getUserLockTime(poolId, userAddress);
          // let _wallet = await signer.getAddress();      
          // let _userInfo = await staking.userInfo( poolId, _wallet);
          // let _stakedAmount = ethers.utils.formatEther(_userInfo.amount.toString());

          // if (_stakedAmount == 0) {
          //   setUnlockTime("Not staked yet");
          //   return;
          // }
          // let _timestamp = parseInt(myunlocktime.toString())* 1000;
          // let _time = new Date(_timestamp);
          // console.log ("Unlock Time: ", _time);
          // if (_timestamp >0) setUnlockTime(_time.toString());
          // else setUnlockTime("Not staked yet");
        }catch(err){
          console.log("User error", err);
        }
      }
    
      async function getTokenBalance(){
        // let userAddress = await signer.getAddress()
        // const tokenbalance = await token.balanceOf(userAddress);
        // const tokenbalanceConverted = ethers.utils.formatEther(tokenbalance.toString())
        // console.log("My Token Balance -",ethers.utils.formatEther(tokenbalance.toString()))
        // setMyTokenBalance(Math.floor(tokenbalanceConverted))
      }

      const checkApproved = async() => {
        // let userAddress = await signer.getAddress()
        // const isApproved = await token.allowance(userAddress, value.stakingAddress);
        // const totaltokenapproved = isApproved.toString()
        // if(totaltokenapproved.length > 2){
        //   console.log("approved", totaltokenapproved);
        //   settokenapproved(true)
        // }
        // else{
        //   console.log("Not Approved",totaltokenapproved);
        //   settokenapproved(false)
        // }
      }
      
      async function getWhiteListAddresses (){
        try{   
          // let userAddress = await signer.getAddress()
          // let _wlInfo = await staking.whitelistedAddress( poolId, userAddress);
          // console.log ("Whitelist Info: ", _wlInfo);
          // setWalletAddressInfo(_wlInfo);
        }catch(err){
          console.log("User error", err);
        }
      }

    //   function stakeTokens (uint256 _pid, uint256 _amount) public {
    //     address _tokenAddress = poolInfo[_pid].tokenAddress;
    //     IBEP20 token = IBEP20 (_tokenAddress);
    //     bool success = token.transferFrom(msg.sender, address(this), _amount);
        
    //     poolInfo[_pid].currentPoolSize = (poolInfo[_pid].currentPoolSize).add(_amount);
    //     uint256 _stakingTime = block.timestamp; 
    //     _amount = _amount.add(userInfo[_pid][msg.sender].amount);
    //     uint256 _rewardClaimed = userInfo[_pid][msg.sender].rewardClaimed;
    //     userInfo[_pid][msg.sender] = UserInfo ({
    //         amount: _amount,
    //         stakingTime: _stakingTime,
    //         rewardClaimed: _rewardClaimed
    //     });
    // }
    
      async function stakeTokens () {
        // if(!whitelistAddress){
        try{
            console.log("Button is connected to function")
            // if(amount === undefined){
            //   alert("Enter Amount First")
            // }
            // else{
            //   await approve()
            //   let _amount = ethers.utils.parseEther(amount.toString());
            //   // console.log (_amount)
            //   let tx = await staking.stakeTokens(poolId, _amount);
            //   let reciept = await tx.wait();
            //   console.log ("Stake Tx Receipt: ", reciept);
            //   refreshData(signer)
            // }              
        } catch (error) {
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
    //   async function claimtoken () {
    //       try{
    //           let tx = await staking.claimTokens(poolId);
    //           let reciept = await tx.wait();
    //           console.log ("ClaimToken: ", reciept);
    //           refreshData(signer)
    //         }              
    //       catch (error) {
    //         console.log (error);
    //         try {
    //           setError(error.error.data.message)
    //         } catch {
    //           setError("Something went wrong, please try again!")
    //         }
    //       }
       
    //   }
    
      async function unstakeTokens () {
        try{
          console.log("Button is connected to function")
          // let tx = await staking.unstakeTokens(poolId);
          // let reciept = await tx.wait();
          // console.log ("Unstake Tx Receipt: ", reciept);
          // refreshData(signer)
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
          console.log("Button is connected to function")
          // const _staking = new ethers.Contract(
          //   value.stakingAddress,
          //   stakingAbi,
          //   signer,
          // )
          
          // let tx = await _staking.emergencyWithdraw(poolId);
          // let reciept = await tx.wait();
          // console.log ("Emergency Withdraw Tx Receipt: ", reciept);
          // refreshData(signer)
        }catch (error) {
          console.log ("eeoeoeo", error.toString());
          try {
            setError(error.error.data.message)
          } catch {
            setError("Something went wrong, please try again!")
          }
        }
      }
     
    //   async function approve () {
    //     if(!istokenapproved){
    //       console.log('Not Approved')
    //       try{
    //         let _amount = ethers.utils.parseEther("10000000000000000000");
    //         let tx = await token.approve(value.stakingAddress, _amount);
    //         let reciept = await tx.wait();
    //         console.log ("Approve Tx Receipt: ", reciept);
    //       }catch (error) {
    //         console.log (error);
    //         // alert(error.data.message);
    //       }
    //     }
    //     else{
    //       console.log('already approved')
    //     }
        
    //   }
    
  
    
      // function handleChange(event) {
      //   const { name, value } = event.target;
      //   if (name === "tokenAmount"){
      //     console.log(value)
      //     setAmount(value);
      //     setMaxToken(value)
      //   }
      // }
    









  return (
    // <QueryClientProvider client={queryClient} contextSharing={true}>
    <div className='modal__background'>
      <div className='modal__card'>
              <CloseIcon className='modal__close' onClick={()=>setIsOpen(false)} />
        <div className='modal__cardSub'>
          <div className='modal__cardHeader'>
            <div className='modal__Menu'>
              <div
                className={'modal__Option ' + (Active
                ? 'modal--active'
                : '')} onClick={() => setActive(!Active)}>Stake</div>
              <div
                className={'modal__Option ' + (!Active
                ? 'modal--active'
                : '')} onClick={() => setActive(!Active)}>Unstake</div>
            </div>
          </div>
          { Active ?
            <>
            <div className='modal__desc'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris
          </div>

          <div className='modal__cardDesc'>
            <div className='modal__descOption'>
              <div className='modal__descTitle'>Reward Token</div>
              <div className='modal__descValue'><img src={light} alt='light'/>
              </div>
            </div>
            <div className='modal__descOption'>
              <div className='modal__descTitle'>APY</div>
              <div className='modal__descValue'>38.28%</div>
            </div>
            <div className='modal__descOption'>
              <div className='modal__descTitle'>Claimable Rewards</div>
              <div className='modal__descValue'>
                <span className='modal__val modal--val'>0.0000443 FTR
                </span>
                -$0.0022</div>
            </div>
            <div className='modal__descOption'>
              <div className='modal__descTitle'>Stake</div>
              <div className='modal__descValue'>Available : 1200</div>
            </div>
            <div className='modal__descBar'>
              <div className='modal__selectBox'>
                <form>
                  <label for="cars" className='modal__selectLabel'>USDC</label>
                  <select className='modal__selectDrop' id="cars" name="cars">
                    <option></option>
                    {/* <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option> */}
                  </select>
                </form>
              </div>
              <div className='modal__value'>
                0
              </div>
            </div>
            <div className='modal__descOption'>
              <div className='modal__descTitle'>Lock Period</div>
              <div className='modal__descValue modal--val'>7 Days</div>
            </div>
          </div>
          <div
            className={'modal__cardButton ' + (Active
            ? ''
            : 'modal--ended')}
            onClick={stakeTokens}>
            {Active
              ? "Stake"
              : "Ended"}
              </div>
            </>
            :
            <>
              <div className='modal__usTopBar'>
                <div className='modal__usInfo' >
                  <div className='modal__usOption'>Token</div>
                <div className='modal__usOption'>APY</div>
                  <div className='modal__usOption'>Claimable Reward</div>
                </div>
                <div className='modal__usInfo modal__usVal'>
                <div className='modal__usOption'><img className='modal__electro' src={electro} alt='light'/>FTR</div>
                <div className='modal__usOption'>228.28%</div>
                  <div className='modal__usOption'>5.6746719</div>
                </div>
              </div>
              
              <div className='modal__usDesc'>
            <div className='modal__descOption'>
              <div className='modal__descTitle'>Unstaked Fee</div>
              <div className='modal__descValue'>15%</div>
                </div>
                <div className='modal__descOption'>
              <div className='modal__descTitle'>Unlock Date/Time</div>
              <div className='modal__descValue'>28/09/2022 : 14:00</div>
                </div>
                <div className='modal__descOption'>
              <div className='modal__descTitle'>My balance</div>
              <div className='modal__descValue'>Available :55.67</div>
              </div>
              </div>

              <div className='modal__descBar'>
        
                  <div className='modal__usLabel'>USDC</div>
            
              <div className='modal__value'>
                22.753        </div>
              </div>
              
              <div className='modal__percent'>
                <div className={'modal__percentOption ' +  (perActive == "25" ? 'modal--perActive' : '')} onClick={()=>setperActive("25")}>25%</div>
                <div className={'modal__percentOption ' +  (perActive == "50" ? 'modal--perActive' : '')} onClick={()=>setperActive("50")}>50%</div>
                <div className={'modal__percentOption ' +  (perActive == "75" ? 'modal--perActive' : '')} onClick={()=>setperActive("75")}>75%</div>
                <div className={'modal__percentOption ' +  (perActive == "100" ? 'modal--perActive' : '')} onClick={()=>setperActive("100")}>100%</div>
              </div>

              <div className='modal__buttonBar'>
                <div className='modal__Button modal__us' onClick={unstakeTokens}>
                  Unstake
                </div>
                <div className='modal__Button modal__ew' onClick={emergencyWithdraw}>
                  Emergency Withdraw
                </div>
              </div>
            </>
          }
        </div>
      </div>
      {/* <Card setIsOpen={setIsOpen} /> */}
    </div>
    // </QueryClientProvider>
  )
}

export default Modal