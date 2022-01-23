import InfiniteCarousel from 'react-leaf-carousel';
import "../css/carousel.css";
import Nletter from "./nletter";

const NlCarousel = ({nletters}) =>{

    return(
        <div id="nl-popular">
            <h1>Our Most Popular newsletters</h1>
                <InfiniteCarousel
                breakpoints={[
                {
                    breakpoint: 500,
                    settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    },
                },
                ]}
                dots={true}
                showSides={false}
                // sidesOpacity={0.5}
                sideSize={0.1}
                slidesToScroll={4}
                slidesToShow={4}
                scrollOnDevice={true}
                autoCycle={true}
                pauseOnHover
                lazyLoad
            >
                
                {nletters.map((nl,index) => {
                    if(index > 20){
                        return '';
                    } else{
                        return <Nletter key={index} nl={nl} />
                    }
                })}
            </InfiniteCarousel>
        </div>
    )
}
export default NlCarousel;