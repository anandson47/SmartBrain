import React from 'react';
import {Component} from 'react';
import Navigation from './Components/Navigation.js';
import Logo from './Components/Logo.js';
import Imagelinkform from './Components/Imagelinkform.js';
import Rank from './Components/Rank.js';
import Particles from 'react-particles-js';
import Facerecognition from './Components/Facerecognition.js';
import SignIn from './Components/SignIn.js'; 
import Register from './Components/Register.js'; 
import './App.css';
import Clarifai from 'clarifai'; 
import 'tachyons';
const app = new Clarifai.App({
 apiKey: '6832ae6b98b5414fb5ce1c8e4383e4f0'
});
const particlesOptions =  {
  particles: {
                number:{
                  value:80,
                  density:{
                    enable:true,
                    value_area: 700
                  }
                }
              }

}
class App extends Component {
   constructor(){
    super();
    this.state= {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn: false
    }
   }
   calculateFaceLocation = (data) => {
    const Faceloc=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width = Number(image.width);
    const height= Number(image.height);
    console.log(Faceloc);
    return{
      toprow: Faceloc.top_row * height,
      bottomrow:height-(Faceloc.bottom_row * height),
      leftcol:Faceloc.left_col * width,
      rightcol:width-(Faceloc.right_col * width)
    }
   }
   FaceBox=(box)=>{
    this.setState({box: box});
    
   }
   onInputChange= (event) =>{
    this.setState({input: event.target.value});
   }

   onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.FaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route==='signout'){
          this.setState({isSignedIn:false})
        }
        else if (route==='home'){
          this.setState({isSignedIn:true})
        }
        
        this.setState({route:route});

        }
    
   render(){ 
    const {isSignedIn, route, imageUrl, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
                params={particlesOptions} />
        
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {this.state.route==='home' 
           ?<div>
              <Logo />
              <Rank />
              <Imagelinkform onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <Facerecognition imageUrl={imageUrl} box={box}/>
            </div>
            :(route === 'signin' ?
                <SignIn onRouteChange={this.onRouteChange}/>
                :<Register onRouteChange={this.onRouteChange}/>  
              )
      }</div>
      );
    
 } 
    
}

export default App;

