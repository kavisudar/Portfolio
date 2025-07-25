import React from 'react'
import './Home.css';
import {useTypewriter,Cursor} from'react-simple-typewriter';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
function Home() {
    const [text]=useTypewriter({
        words:['a Creative Coder','a Web Developer','a Problem Solver'],
        loop:Infinity,
    })
  return (
    <>
    <div style={{margin:"5rem",display:"flex",justifyContent:"space-between",flexDirection:"column",zIndex:"5"}}>
        <center>
        <h1 id='intro'>HEY !</h1>
        <h2>I'm 
            <span> Kavisudar, </span> 
            <span style={{color:"#FACC15"}}>{text}</span>
        <span style={{color:"greenyellow"}}>
        <Cursor/>
        </span>
            </h2>
            <img src='kavisudar.png' style={{marginRight:"80rem"}}/>
            </center>
              <img src="home.svg" alt="img errr" id='home-svg'/>
            <div>
              <h3 style={{width:"30rem",position:"relative",left:"30rem",bottom:"50rem",color:"#4C1D95",letterSpacing:"1px"}}>I am a passionate Frontend Developer with a strong foundation in <span style={{color:"cyan"}}>Web Development</span>  and <span style={{color:"cyan"}}>Problem Solving</span>. I am dedicated to creating visually appealing and user-friendly websites that provide an exceptional user experience.</h3>
            </div>
            <div className='home-icon'>
              <div className='info-icon'>
                <FaLinkedin style={{fontSize:"3rem",color:"#2F6CB4"}}/>
                <a href='https://www.linkedin.com/in/kavisudarbe1411/' target='_blank' rel="noreferrer">LinkedIn</a>
              </div>
              <div className='info-icon'>
                <FaGithub style={{fontSize:"3rem",color:"#000"}}/>
                <a href='https://github.com/kavisudar' target='_blank' rel="noreferrer">Github</a>
              </div>
              <div className='info-icon'>
                <a className='a' href='https://drive.google.com/file/d/1542LOTL9juj1nHbZXETFfYD0qhxigcib/view?usp=sharing' target='_blank' style={{color:"white"}}>Resume</a>
              </div>
            </div>
    </div>
    <div className="about">
      <h1>About Me</h1>
      <div className="about-header">
      <h2>Turning ideas into interactive web interfaces</h2>
      <div className='about-me'>
      <p>As a front-end web developer, I specialize in creating responsive, intuitive, and visually engaging user interfaces. My focus is on writing efficient code using modern technologies such as HTML, CSS, JavaScript, React, and Java. I’m committed to continuous learning and building solutions that combine functionality with great user experience.</p>
      <img src="about-me.svg" alt="something error" />
      </div>
      </div>
    </div>
    </>
  )
}

export default Home;