
import HeroCarousel from "../../components/hero/HeroCarousel"
import Logo from '../../assets/Navbar/ReactHQ logo.png'
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './signin-styles.scss'
const Signin: React.FC = () => {
    return(
        <div className="signin">
            <Container>
                <div className="sign-in-container"> 
                    <Row>

                        <Col>
                            <Link to="/" className='flex items-center justify-center'>
                                <img src={Logo} alt="logo"  className='w-full h-auto md:max-w-[300px] max-w-[92px] object-contain'/>
                            </Link>
                        </Col><Col></Col>
                    
                    </Row>
                
                    <Row>

                        <Col lg={6}>
                            <div className='carousel flex-1 w-full md:flex hidden items-center justify-center relative lg:overflow-hidden xl:h-[40rem] lg:h-[28rem] md:py-12 lg:py-1 xl:py-0'>
                                <HeroCarousel/>
                            </div>
                        </Col>
                        
                        
                        <Col lg={6}> 
                            <div className="content-container">
                                <div className="content">

                                    <div className="title">
                                        Sign in to your <span className="orange"> Account  </span>
                                    </div>

                                    <div className="input-sign-in-info">
                                        <input className="input-box" type='email' placeholder="Email address "/> <br/>
                                        <input className="input-box" type='password' placeholder="Password"/>
                                    </div>

                                    <div className="forgot-password orange">
                                        <p> Forgot password? </p>
                                    </div>
                                    
                                    <div className="sign-in-button">
                                        <Link to='/dashboard'> <button className="button"> Sign in </button> </Link>
                                        <p> Don't have an account? <span className="orange"> Register </span></p>
                                    </div>
                                    

                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
            </Container>
        </div>
            
    )
};

export default Signin