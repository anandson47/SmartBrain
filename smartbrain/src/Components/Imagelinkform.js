import React from 'react';
import './Imagelinkform.css';



const Imagelinkform = ({ onInputChange , onSubmit }) => {
	return( 
		
		<div>	
			<p className = 'f3'>
					This magic brain will detect faces in your pictures, give it a try
			</p>
			<div className='form center shadow-5 '>
				<div className=' center pa4 br3   '>
					<input className=' f4 pa2 w-70 pv2 bg-light-blue' type='text' onChange={onInputChange}/><br/>
					<button className='w-30 f4 link ph3 pv2 dib grow  white bg-light-purple  pointer' onClick={onSubmit}>Detect</button>
				</div>
			
			</div>
		</div>
		);
}
export default Imagelinkform;
