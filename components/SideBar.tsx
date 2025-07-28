'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = ({user}:SiderbarProps) => {
    const pathname = usePathname(); 
  return (
    <section className='sticky left-0 top-0 flex flex-col h-screen w-fit justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:!p-4 xl:!p-6 2xl:w-[355px]'>
        <nav className='flex flex-col gap-4'>
            <Link href={'/'}
            className='mb-3 cursor-pointer items-center gap-2 flex'
            >
                <Image 
                    src="/icons/logo.svg"
                    alt='logo'
                    width={34}
                    height={34} 
                    className='size-[24px] max-xl:size-14'
                />
                <h1 className='2xl:text-2xl font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden'>Horizon</h1> 
            </Link> 

            {sidebarLinks.map((item)=>{
                const isActive = pathname == item.route || pathname.startsWith(`${item.route}/`)
                return (
                    <Link 
                    key={item.label} 
                    href={item.route} 
                    className={cn('flex gap-3 items-center !py-1 md:!p-3 2xl:!p-4 rounded-lg justify-center xl:justify-start',
                    {'bg-bankGradient':isActive})} >
                        <div className='relative size-6'>
                            <Image src={item.imgURL} alt={item.label} fill className={
                                cn({'brightness-[3] invert-0':isActive})
                                } />
                        </div>
                        <p className={cn('text-base font-semibold text-black-2 max-xl:hidden',{
                            '!text-white': isActive
                        })}>    
                        {item.label}
                        </p>
                    </Link>
                );
            })

            }
        </nav>
    </section>
  )
}

export default SideBar