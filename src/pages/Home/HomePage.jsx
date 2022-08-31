import React, { useState } from 'react'
import sandclock from '../../images/sandclock.png';
import search from '../../images/search.png'
import './HomePage.css';
import Modal from './Modal'

import Card from './Card';

function HomePage() {

  const [Active, setActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


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
            <Card Active={ Active} setIsOpen={setIsOpen} />
              </>
              :
              <>
                <Card Active={Active} />
                <Card Active={Active} />
                <Card Active={ Active} />
              </>
            }
          </div>

        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} Active={ Active } />}
      
    </div>
  )
}

export default HomePage