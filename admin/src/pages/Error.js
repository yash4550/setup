
import React, { useEffect } from "react";
import Main from "../components/layout/Main";
import ErorTexi from "../assets/images/eror-texi.png"
const Error = () => {

  const StyleCSS = `@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet");

        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700");
        
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }
        
        body{
          overflow:hidden;
          background-color: #f4f6ff;
        }
        
        .container{
          width:100vw;
          height:100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
          position: relative;
          left:6vmin;
          text-align: center;
        }
        
        h1, a{
          margin: 0;
          padding: 0;
          text-decoration: none;
        }

        .section{
          padding: 4rem 2rem;
          position: relative;
        }
        .taxi-img {
          position: absolute;
          z-index: -1;
          max-width: 188px;
          left: 193px;
          top: 72px;
      }

        .section .error{
          font-size: 300px;
          color: #fecb00;
          text-shadow: 
            1px 1px 1px #ff9800,    
            2px 2px 1px #ff9800,
            3px 3px 1px #ff9800,
            4px 4px 1px #ff9800,
            5px 5px 1px #ff9800,
            6px 6px 1px #ff9800,
            7px 7px 1px #ff9800,
            8px 8px 1px #ff9800,
            25px 25px 8px rgba(0,0,0, 0.2);
        }

        .page{
          margin: 2rem 0;
          font-size: 20px;
          font-weight: 600;
          color: #444;
        }

        .back-home{
          display: inline-block;
          border: 2px solid #222;
          color: #fff;
          text-transform: uppercase;
          font-weight: 600;
          padding: 0.75rem 1rem 0.6rem;
          transition: all 0.2s linear;
          box-shadow: 0 15px 15px -11px rgba(0,0,0, 0.4);
          background: #222;
          border-radius: 6px;
        }
        .back-home:hover{
          background: #222;
          color: #ddd;
        }`;

  return (
    <Main>

      <div className="container">
        <div class="section">
          <div className="taxi-img">
            <img src={ErorTexi} />
          </div>
          <h1 class="error">404</h1>
          <div class="page">Ooops!!! The page you are looking for is not found</div>
          <a class="back-home" href="#!">Back to home</a>
        </div>

        <style>
          {StyleCSS}
        </style>
      </div>

    </Main>
  )
}

export default Error