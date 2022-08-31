import React from 'react'
import './Modal.css'
import light from '../../images/light.png'

function Modal({setIsOpen, Active}) {
  return (
    <div className='modal__background' >
      <div className='modal__card'>
        <div className='modal__cardSub'>
          <div className='modal__cardHeader'>
            <div className='modal__Menu'>
              <div
                className={'modal__Option ' + (Active
                ? 'modal--active'
                : '')}>Active</div>
              <div
                className={'modal__Option ' + (!Active
                ? 'modal--active'
                : '')}>Ended</div>
            </div>
          </div>
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
              <div className='modal__descValue'><span className='modal__val modal--val'>0.0000443 FTR </span> -$0.0022</div>
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
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
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
        <div className={'modal__cardButton '+(Active ? '' : 'modal--ended')} onClick={() => setIsOpen(true)}>
              { Active ? "Stake" : "Ended"}
              </div>
        </div>
      </div>
      {/* <Card setIsOpen={setIsOpen} /> */}
    </div>
  )
}

export default Modal