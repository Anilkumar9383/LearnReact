import React from 'react'
import Marquee from "react-fast-marquee";

function MarqueeText() {
    return (
        <div className='marqueedata'><Marquee className='text-danger'>
            - Welcome to our project. Last Login time: - <label className='d-flex'>{window.sessionStorage.getItem('LastLogin')}</label>
        </Marquee></div>
    )
}

export default MarqueeText
