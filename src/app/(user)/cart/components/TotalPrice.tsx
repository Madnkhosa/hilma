import React from 'react'

const TotalPrice = ({total}:{total:number}) => {
  return (
    <div className="flex border-b justify-between mt-5 mx-6 pb-2">
    <div className="text-[16px] font-[700]">Total</div>
    <div className="text-[20px] font-[700]">€{ total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) }</div>
  </div>
  )
}

export default TotalPrice