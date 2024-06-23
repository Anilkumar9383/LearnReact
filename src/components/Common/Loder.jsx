import React, { useEffect } from 'react';
import '../Common/Loder.css'
import { useLocation } from 'react-router-dom';

function Loder() {
    const location = useLocation();
    useEffect(() => {
        const loader = document.getElementById('loader').classList;
        if (window.innerWidth < 768) {
            loader.add('activemaindiv');
        }
        else{
            document.getElementById('maincontainar').classList.contains('activemaindiv') ? loader.add('activemaindiv') : loader.remove('activemaindiv');
        }
    });
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
