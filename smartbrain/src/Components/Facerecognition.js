import React from 'react';
import './Facerecognition.css';

const Facerecognition = ({ imageUrl , box}) => {
	return(
		<div className='center ma'>
			<div className= 'mt2  absolute'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
				<div className=' bounding-box' style={{top:box.toprow ,left:box.leftcol ,right:box.rightcol ,bottom:box.bottomrow}}></div>
			</div>


		</div>
		);
}
export default Facerecognition;