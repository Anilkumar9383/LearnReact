import React from 'react'
import '../Common/Loder.css'

function Loder() {
    return (
        <div id='loderdiv'>
            <div className="loader1">
                <div className="scanner" id='loader'>
                    <span>Loading...</span>
                    <div className="loader">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loder
