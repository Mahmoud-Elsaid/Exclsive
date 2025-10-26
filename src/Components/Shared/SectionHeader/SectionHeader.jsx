




import React from 'react'

export default function SectionHeader({sectionName , sectionContent}) {
    return (
        <div  className=' my-10'>
            <div className="">
                <div className="flex justify-start my-4">
                    <div className=" w-[20px] h-[60px] bg-mainColor mr-2 rounded-sm"></div>
                        <h5 className=" text-2xl ml-3 pt-2 text-mainColor">
                            {sectionName}
                        </h5>
                    </div>
                    <h3 className="mb-5 text-[36px] font-[600] leading-[48px] tracking-[3%] ">{sectionContent}</h3>
                </div>
        </div>
    )
}






// .sideitem
// {
//     width: 20px;
//     height: 40px;
//     background-color: var(--main-color);
// }

// .sectionHead h3
// {
//     font-size: 36px;
//     font-weight: 600;
//     line-height: 48px;
//     letter-spacing: 3%;
// }
