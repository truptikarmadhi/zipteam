import React from 'react'
import Modals from '../ui/Modals';

const FancyModal = () => {
    return (
        <Modals modalClass={'fancy-modal'} id={'fancy_modal'} modalLabel={"fancy_modalLabel"}>
            <div className='tpt-150 tpb-100'>
                <h4 className='tk-degular fontSS leadingSS textdark fw-semibold dmb-20 res-text-white'>
                    Ready to book a  <span className='textblue res-text-white'> Demo? </span>
                </h4>
                <h5 className='tk-degular fontS leadingM textdark fw-normal dmb-30 tmb-35 res-text-white'>
                    Discover how Zipteam empowers companies to boost organizational agility. Book your demo today and see it in action!
                </h5>
            </div>
        </Modals>
    )
}

export default FancyModal
