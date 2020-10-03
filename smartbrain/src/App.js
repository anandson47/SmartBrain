import React from 'react';
import {Component} from 'react';
import Navigation from './Components/Navigation.js';
import Logo from './Components/Logo.js';
import Imagelinkform from './Components/Imagelinkform.js';
import Rank from './Components/Rank.js';
import Particles from 'react-particles-js';
import Facerecognition from './Components/Facerecognition.js'; 
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
      box: {}
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
    console.log(this.state.box);
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

    
   render(){
    return (
      <div className="App">
        <Particles className='particles' 
                params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <Imagelinkform onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <Facerecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
      );
    
 } 
    
}

export default App;
/*app.models.predict("aa7f35c01e0642fda5cf400f543e7c40","https://samples.clarifai.com/face_det.jpg").then(
      function(response){
        console.log(response)
      },
      function(err){
        //there was an error
      }
      );
   }*/
