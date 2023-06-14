import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Example from './examplate'

const Home = () => {
  const tinhtoan =()=>{
    for(let i =0;i<5;i++){
      setTimeout(() => {
        console.log(i+1)
      }, 500);
    }
  };tinhtoan()
  return (

    // <>
    // <Example/>
    // </>
    <div className='home'>
  <div className="container"> 
       <Sidebar/>
       <Chat/>
 </div> 
    </div>
  )
}

export default Home