import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './slides.css';
import { Link } from 'react-router-dom'

import Slider from "react-slick";

import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView,
    MDBContainer,
    MDBMask,
    MDBCarouselCaption
} from "mdbreact";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);





const Slides = ({ postsOngoing, postsUpcoming }) => {
    const [posts, setPosts] = useState([]);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    let maxSteps = 2;
    if (posts != undefined)
        maxSteps = posts.length;
    else
        maxSteps = 0;


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    useEffect(() => {
        let temp = postsOngoing;
        temp = temp.concat(postsUpcoming)
        setPosts(temp)
    }, [])

    const Settings = {
        arrows: true,
        autoplay: true,
        centerMode: true,
        centerPadding: "50px",
        sliderToShow: 1,
        infinite: true,
        sliderToScroll: 1,
        speed: 500,
    };
    const SettingsMd = {
        arrows: true,
        autoplay: true,
        centerMode: true,
        centerPadding: "60px",
        sliderToShow: 1,
        infinite: true,
        sliderToScroll: 1,
        speed: 500,
    };
    const SettingSm = {
        arrows: true,
        autoplay: true,
        centerMode: true,
        centerPadding: "30px",
        sliderToShow: 1,
        infinite: true,
        sliderToScroll: 1,
        speed: 500,
    };
    const images = ["https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjBtYW5hZ2VtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHVibGljJTIwc3BlYWtpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1510511233900-1982d92bd835?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1518890569493-668df9a00266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGV2ZW50JTIwcGxhbm5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"]

    return (
        <>
            <div className='hidden lg:block'>
                <Slider {...Settings}>
                    {images.map((image) => (
                        <div className='w-full h-80 pr-1 pt-1 '>
                            <img src={image} alt="loading..." className='w-full h-full' />
                        </div>
                    ))}
                </Slider>

            </div>
            <div className='hidden md:block lg:hidden'>
                <Slider {...SettingsMd}>
                    {images.map((image) => (
                        <div className='w-full h-60 pr-1 '>
                            <img src={image} alt="loading..." className='w-full h-full' />
                        </div>
                    ))}
                </Slider>

            </div>

            <div className='md:hidden'>
                <Slider {...SettingSm}>
                    {images.map((image) => (
                        <div className='w-full h-48 pr-1 '>
                            <img src={image} alt="loading..." className='w-full h-full' />
                        </div>
                    ))}
                </Slider>
            </div>
        </>

        // <div className="carousel-container" style={{ backgroundColor: "transparent" }}>
        //     <div className="carousel">
        //         <Box sx={{}} className='text-center'>
        //             <Paper
        //                 square
        //                 elevation={0}
        //                 sx={{
        //                     display: 'flex',
        //                     alignItems: 'center',
        //                     height: 40,
        //                     pl: 2,
        //                     bgcolor: "aquamarine",
        //                 }}
        //             >

        //             </Paper>
        //             <AutoPlaySwipeableViews
        //                 axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        //                 index={activeStep}
        //                 onChangeIndex={handleStepChange}
        //                 enableMouseEvents
        //             >
        //                 {posts?.map((step, index) => (
        //                     <div key={step.title}>
        //                         {Math.abs(activeStep - index) <= 2 ? (
        //                             <>
        //                                 <div className="typograph">{step.title}</div>
        //                                 <Link to={`/event/${step.eventId}`}>
        //                                     <Box
        //                                         component="img"
        //                                         sx={{
        //                                             display: 'block',
        //                                             height: 400,
        //                                             overflow: 'hidden',
        //                                             width: '100%'
        //                                         }}
        //                                         src={`${process.env.REACT_APP_API_URL}/admin/getimg/${step.eventId}`}
        //                                         alt={step.title}
        //                                     />
        //                                 </Link>
        //                             </>
        //                         ) : null}
        //                     </div>
        //                 ))}
        //             </AutoPlaySwipeableViews>
        //             <div className='navigationColor'>
        //                 <MobileStepper
        //                     variant='text'
        //                     steps={maxSteps}
        //                     position="static"
        //                     activeStep={activeStep}
        //                     nextButton={
        //                         <Button
        //                             size="small"
        //                             onClick={handleNext}
        //                             disabled={activeStep === maxSteps - 1}
        //                         >
        //                             Next
        //                             {theme.direction === 'rtl' ? (
        //                                 <KeyboardArrowLeft />
        //                             ) : (
        //                                 <KeyboardArrowRight />
        //                             )}
        //                         </Button>
        //                     }
        //                     backButton={
        //                         <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //                             {theme.direction === 'rtl' ? (
        //                                 <KeyboardArrowRight />
        //                             ) : (
        //                                 <KeyboardArrowLeft />
        //                             )}
        //                             Back
        //                         </Button>
        //                     }
        //                 />
        //             </div>
        //         </Box>
        //     </div>
        // </div>
    );
}

export default Slides;
