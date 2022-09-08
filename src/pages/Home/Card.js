import React from 'react'
import './Card.css'
import bitlogo from '../../images/abit.png'
import bitcoin from '../../images/bitcoin.png'
import light from '../../images/light.png'
import gift from '../../images/gift.png'

function Card({ Active ,setIsOpen,onChangeInput,stakeToken}) {

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
                  320.78%
                </div>
                <div className='home__cardName'>
                  APR
                </div>
              </div>
              <div className='home__cardDesc'>
                <div className='home__descOption'>
                  <div className='home__descTitle'>Reward Token</div>
                  <div className='home__descValue'><img src={light} alt='light' /> </div>
                </div>
                <div className='home__descOption'>
                  <div className='home__descTitle'>Value Locked</div>
                  <div className='home__descValue'>$867,566.11</div>
                </div>
                <div className='home__descOption'>
                  <div className='home__descTitle'>My Share</div>
                  <div className='home__descValue'>$0(0%)</div>
                </div>
                <div className='home__descOption'>
                  <div className='home__descTitle'>Available Balance</div>
                  <div className='home__descValue'>$0</div>
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