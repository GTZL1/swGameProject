import React from 'react'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import useEmblaCarousel from 'embla-carousel-react';

const LoadingScreen = () => {

    function MainCarousel() {
        const [emblaRef] = useEmblaCarousel();

        return <div className='embla overflow-hidden' ref={emblaRef}>
            <div className='embla__container flex'>
                <div className='embla__slide flex-[0_0_100%] min-w-0 flex justify-center'>
                    <img className='h-48' src='/resources/flags/empire.png' />
                </div>
                <div className='embla__slide flex-[0_0_100%] min-w-0 flex justify-center'>
                    <img className='h-48' src='/resources/flags/rebels.png' />
                </div>
            </div>
        </div>
    }

    return <div className='flex flex-col items-center'>
        <MainCarousel />
        <p>Loading...</p>
    </div>
}

export default LoadingScreen;