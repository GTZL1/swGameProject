import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

const LoadingScreen = () => {
    const flagFiles = [
        'empire.png',
        'rebels.png',
        'chiss_ascendancy.svg'];

    function MainCarousel() {
        const [emblaRef] = useEmblaCarousel({ loop: true },
            [Autoplay({ playOnInit: true, delay: 3000 }), Fade({ duration: 1500})]);

        return <div className='embla overflow-hidden' ref={emblaRef}>
            <div className='embla__container flex'>
                {flagFiles.map((file) => (
                    <div className='embla__slide flex-[0_0_100%] min-w-0 flex justify-center' key={file}>
                        <img className='embla__slide__img d-block h-48' src={`/resources/flags/${file}`} />
                    </div>
                ))}
            </div>
        </div>
    }

    return <div className='flex flex-col items-center'>
        <MainCarousel />
        <p>Loading...</p>
    </div>
}

export default LoadingScreen;