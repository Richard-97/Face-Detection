import React, { Component } from 'react';
import './App.css';
import  Navigation  from './Components/Navigation/navigation';
import  Logo  from './Components/Logo/Logo';
import  FaceRecognition  from './Components/FaceRecognition/FaceRecognition';
import  ImageLinkForm  from './Components/ImageLinkForm/ImageLinkForm';
import  Register  from './Components/Register/Register';
import  SignIn  from './Components/SignIn/SignIn';
import  Rank  from './Components/Rank/Rank';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'd39ffc1819b34790a2121157ab7bace1'
 });

const particlesOptions  = {
  particles: {
        number: {
          value: 180,
          density: {
            enable: true,
            value_area: 800
          }
        }
      }
    }
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(width, height);
      return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height),
      }
  }

  displayFaceBox = (myBox) => {
    console.log(myBox);
    this.setState({box: myBox})
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('button clicked');
    console.log('checking url: ', this.state.input)
    this.setState( {imageURL: this.state.input} )
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
                      this.state.input).then( response =>
                      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
                      this.displayFaceBox(this.calculateFaceLocation(response)))
                      .catch(err =>  console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' 
              params={particlesOptions}
        />

        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
                    box = {this.state.box} 
                    imageURL={this.state.imageURL}/>
            </div>
            :
            (
              this.state.route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
