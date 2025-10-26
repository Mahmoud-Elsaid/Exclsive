



import React from 'react'
import useBasicData from '../../Hooks/getBasicData';
import Loading from '../../Components/Shared/Loading/Loading';
import FeatchError from '../../Components/Shared/FeatchError/FeatchError';


export default function Brands() {


    const{ data, isLoading, isError } = useBasicData("brands")

    
    if (isLoading) return <Loading/>
    if (isError) return <FeatchError/>

    console.log(data?data:"nodata")

    return (
        <div>
            <h2>Brands</h2>
        </div>
    )
}
