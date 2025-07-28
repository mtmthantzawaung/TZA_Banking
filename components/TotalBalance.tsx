
import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalance = ({accounts,totalBanks,totalCurrentBalance}:TotlaBalanceBoxProps) => {
  return (
    <section className='flex !p-3 bg-neutral-100 rounded-xl sm:justify-start justify-center items-center  gap-8'>
        <div className='flex h-full w-full max-w-[100px] items-center'>
            <DoughnutChart accounts={accounts} />
        </div>


        <div className='flex flex-col gap-6'>
            <h2 className='font-bold text-xl'>
                Bank Account: {totalBanks}
            </h2>
            <div className='flex flex-col justify-center text-center gap-2'>
                <p className='text-base text-neutral-600'>
                    Total Current Balance
                </p>
                <div className='text-base'>
                    {<AnimatedCounter amount={totalCurrentBalance} />}
                </div>
            </div>

        </div>
    </section>
  )
}

export default TotalBalance