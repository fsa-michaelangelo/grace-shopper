import React from 'react'
import {Link} from 'react-router-dom'

export class Homepage extends React.Component {
  render() {
    return (
      <>
        <div className="homepage-header">
          <h1 id="title"> U P P E R - C R U S T </h1>
          <Link to="/breads">Crumb on in...</Link>
        </div>
        <div className="homepage-breads-container">
          <img
            src="./Homemade-Sourdough-Bread-004.jpg"
            className="homepage-breads"
          />
          <img src="./french-bread2.jpg" className="homepage-breads" />
          <img src="./oat-bread-sliced.jpg" className="homepage-breads" />
        </div>
      </>
      ///FOR BOOTSRAP IMPLEMENTATION
      //     <div id="demo" className="carousel slide" data-ride="carousel">

      //     <div className="carousel-inner">

      //      <div className="carousel-item active">
      //         <img src="./public/Homemade-Sourdough-Bread-004.jpg"
      //         alt="sourdough" className="d-block w-100"/>
      //     </div>
      //       <div className="carousel-item">
      //         <img src="./oat-bread-sliced.jpg"
      //         alt="oat-bread" className="d-block w-100"/>
      //       </div>
      //       <div
      //     className="carousel-item">
      //         <img src="./french-bread2.jpg"
      //          alt="french" className="d-block w-100"/>
      //       </div>
      //     </div>

      //     <a className="carousel-control-prev"
      //     href="#demo" data-slide="prev">
      //       <span
      //     className="carousel-control-prev-icon"></span>
      //     </a>
      //     <a
      //     className="carousel-control-next" href="#demo" data-slide="next">

      //     <span className="carousel-control-next-icon"></span>
      //     </a>

      //   </div>
    )
  }
}

export default Homepage
