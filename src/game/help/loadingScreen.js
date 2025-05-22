import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import ENDPOINTS from '../../constants/endpoints.js';

const LoadingScreen = ({ flagFiles }) => {
    function MainCarousel() {
        const [emblaRef] = useEmblaCarousel({ loop: true },
            [Autoplay({ playOnInit: true, delay: 3000 }), Fade({ duration: 1500})]);

        return <div className='embla overflow-hidden mt-10' ref={emblaRef}>
            <div className='embla__container flex'>
                {flagFiles.map((file) => (
                    <div className='embla__slide flex-[0_0_100%] min-w-0 flex justify-center' key={file}>
                        <img className='embla__slide__img d-block h-48 my-2' src={`${ENDPOINTS.IMAGE_BACKEND_URL}/flags/${file}`} />
                    </div>
                ))}
            </div>
        </div>
    }

    return <div className='flex flex-col items-center mt-20rem'>
        <MainCarousel />
        <p className='text-xl mt-10'>Loading...</p>
        <p className='text-lg'>It can take up to 1 minute.</p>
    </div>
}

export default LoadingScreen;