import React, {Component} from 'react';
import './assets/style/style.scss';

class Button extends Component {
    constructor() {
        super();
        this.state = {
            counter: null,
            buttonText: 'Take picture or record video',
            inactiveClass: '', //making sure that the button can't be clicked until the picture or video is not processed to start a new one, check style.scss
            pictureClass: '',
            cameraEffect: new Audio(require('./assets/sound/camera.mp3')),
            videoEffect: new Audio(require('./assets/sound/video.mp3'))
        }
    }
    
    handleButtonPress() {
        //Setting up time for video
        this.timer = setInterval(() => {
            this.setState({counter: (this.state.counter + 1)})

            //Play video sound
            this.state.videoEffect.play();

        }, 1000);

        //If counter is not null, change button text after 1 second
        setTimeout(() => {
            if (this.state.counter) {
                this.setState({
                    buttonText: 'Video Recording started',
                })

                console.log('Video Recording started')
            }
        }, 1000)

        //Pause video sound
        this.state.videoEffect.pause();
    }

    handleButtonRelease () {
        //Clear timer
        clearTimeout(this.timer);

        //Pause camera sound
        this.state.cameraEffect.pause();

        //Set counter to null
        this.setState({
            counter: null,
        })

        //if counter null than picture will be taken with a picture class
        if(this.state.counter == null) {
            this.setState({
                buttonText: 'Picture taken',
                inactiveClass: 'inactive', //adding inactive class for the button
                pictureClass: 'picture'
            })

            //Play camera sound
            this.state.cameraEffect.play();
            console.log('Picture taken')

            //After 2 second change button text and remove picture and button class
            setTimeout(() => {
                this.setState({
                    buttonText: 'Take picture or record video',
                    inactiveClass: '',
                    pictureClass: ''
                })
            }, 2000)

        } else {
            //else chnage button text for video 
            this.setState({
                buttonText: 'Video recording stoped',
                inactiveClass: 'inactive', //adding inactive class for the button
                pictureClass: ''
            })
            console.log('Video recording stoped')

            //After 2 second change button text and remove button class
            setTimeout(() => {
                this.setState({
                    buttonText: 'Take picture or record video',
                    inactiveClass: '',
                })
            }, 2000)
        }
    }

    videoAnimation() {
        //If counter is not null show videoAnimation function which is the circle animation
        if (this.state.counter) {
            return <div className="video-animation" style={{height: this.state.counter + 'rem', width: this.state.counter + 'rem'}}></div>
        }
    }

    render() {
        return(
            <div className={"button-container " + this.state.pictureClass}>
                <p>
                    Please enable sound! <br/>
                    For video recording press button and don't release it.
                    For taking picture simply click and release.
                </p>

                {this.videoAnimation()}

                <button className={this.state.inactiveClass}
                    onTouchStart={(e) => this.handleButtonPress()} 
                    onTouchEnd={(e) => this.handleButtonRelease()} 
                    onMouseDown={(e) =>this.handleButtonPress()} 
                    onMouseUp={(e) =>this.handleButtonRelease()}
                >
                    {this.state.buttonText} {this.state.counter}
                </button>
            </div>
        )
    }
}

export default Button;