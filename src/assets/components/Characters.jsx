import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Characters = ( {charac}) => {

const [resident, setResident] = useState([])

useEffect(()=>{
    axios.get(`${charac}`)
    .then(res => setResident(res.data))
},[])
    return (
        <div className='character-card'>
            <p className={`status-${resident.status}`}> Status: <span>{resident.status}</span></p>
            <img src={resident.image} alt="" />
            <h3>{resident.name}</h3>
            <div>
                <p>Species: <span>{resident.species}</span></p>
                <p>Origin: <span>{resident.origin?.name}</span></p>
                <p>Episodes: <span>{resident.episode?.length}</span></p>
            </div>
        </div>
    );
};

export default Characters;  