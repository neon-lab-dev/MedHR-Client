import React from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import { IMAGES } from '@/assets'
import Image from 'next/image'


const Successfully = () => {
    return (
        <div>   <div className='flex flex-col gap-5'>
            <div className=' text-xl flex justify-center'>
                <span className=' text-xl font-extrabold'>Your Profile is created successfully</span>
            </div>
            <div className="flex justify-center w-full ">
                <Image src={IMAGES.success} alt='completed' />
            </div>
            <div className=' flex justify-center'>
                <Link href='/'><Button variant="primary" type="submit" className=' max-md:w-[230px] max-lg:w-[400px]'>
                    Go to Homepage
                </Button>
                </Link>
            </div>
        </div></div>
    )
}

export default Successfully