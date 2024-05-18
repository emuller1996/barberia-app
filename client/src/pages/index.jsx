import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <header>
        <div className="header-area header-transparent pt-20">
          <div className="main-header header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-1">
                  <div className="logo">
                    <a href="index.html">
                      <img src="assets/img/logo/logo.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-10">
                  <div className="menu-main d-flex align-items-center justify-content-end">
                    <div className="main-menu f-right d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li className="active">
                            <a href="#home">Inicio</a>
                          </li>
                          <li>
                            <a href="#about">Sobre Nosotros</a>
                          </li>
                          <li>
                            <a href="#services">Servicios</a>
                          </li>
                          <li>
                            <a href="#team">Nuestro Equipo</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="header-right-btn f-right d-none d-lg-block ml-30">
                      <Link to="dashboard" className="btn header-btn">
                        Admin
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="slider-area position-relative fix" id="home">
          <div className="slider-active">
            <div className="single-slider slider-height d-flex align-items-center">
              <div className="container">
                <div className="row">
                  <div className="col-xl-8 col-lg-9 col-md-11 col-sm-10">
                    <div className="hero__caption">
                      <span data-animation="fadeInUp" data-delay="0.2s">
                        with patrick potter
                      </span>
                      <h1 data-animation="fadeInUp" data-delay="0.5s">
                        Our Hair Style make your look elegance
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stock-text">
            <h2>Get More confident</h2>
            <h2>Get More confident</h2>
          </div>
          <div className="thumb-content-box">
            <div className="thumb-content">
              <h3>make an appointment now</h3>
              <a href="#">
                {" "}
                <i className="fas fa-long-arrow-alt-right"></i>
              </a>
            </div>
          </div>
        </div>

        <section
          id="about"
          className="about-area section-padding30 position-relative"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-11">
                <div className="about-img ">
                  <img src="assets/img/gallery/about.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="about-caption">
                  <div className="section-tittle section-tittle3 mb-35">
                    <span>About Our company</span>
                    <h2>52 Years Of Experience In Hair cut!</h2>
                  </div>
                  <p className="mb-30 pera-bottom">
                    Brook presents your services with flexible, convenient and
                    cdpoe layouts. You can select your favorite layouts &
                    elements for cular ts with unlimited ustomization
                    possibilities. Pixel-perfreplication of the designers is
                    intended.
                  </p>
                  <p className="pera-top mb-50">
                    Brook presents your services with flexible, convefnient and
                    ent anipurpose layouts. You can select your favorite.
                  </p>
                  <img src="assets/img/gallery/signature.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="about-shape">
            <img src="assets/img/gallery/about-shape.png" alt="" />
          </div>
        </section>

        <div className="team-area pb-180" id="team">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8 col-md-11 col-sm-11">
                <div className="section-tittle text-center mb-100">
                  <span>Professional Teams</span>
                  <h2>Our award winner hair cut exparts for you</h2>
                </div>
              </div>
            </div>
            <div className="row team-active dot-style">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
                <div className="single-team mb-80 text-center">
                  <div className="team-img">
                    <img src="assets/img/gallery/team1.png" alt="" />
                  </div>
                  <div className="team-caption">
                    <span>Master Barber</span>
                    <h3>
                      <a href="#">Guy C. Pulido bks</a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
                <div className="single-team mb-80 text-center">
                  <div className="team-img">
                    <img src="assets/img/gallery/team2.png" alt="" />
                  </div>
                  <div className="team-caption">
                    <span>Color Expart</span>
                    <h3>
                      <a href="#">Steve L. Nolan</a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
                <div className="single-team mb-80 text-center">
                  <div className="team-img">
                    <img src="assets/img/gallery/team3.png" alt="" />
                  </div>
                  <div className="team-caption">
                    <span>Master Barber</span>
                    <h3>
                      <a href="#">Edgar P. Mathis</a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="services"
          className="best-pricing section-padding2 position-relative"
        >
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-xl-7 col-lg-7">
                <div className="section-tittle mb-50">
                  <span>Our Best Pricing</span>
                  <h2>
                    We provide best price
                    <br /> in the city!
                  </h2>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="pricing-list">
                      <ul>
                        <li>
                          Styling. . . . . . . . . . . . . . . . . . . . . . . .
                          . . . . <span>$25</span>
                        </li>
                        <li>
                          Styling + Color. . . . . . . . . . . . . . . . . . .{" "}
                          <span>$65</span>
                        </li>
                        <li>
                          Styling + Tint. . . . . . . . . . . . . . . . . . . .
                          . .<span>$65</span>
                        </li>
                        <li>
                          {" "}
                          Semi-permanent wave. . . . . . . . . . . . .
                          <span>$65</span>
                        </li>
                        <li>
                          {" "}
                          Cut + Styling. . . . . . . . . . . . . . . . . . . . .
                          .<span>$63</span>
                        </li>
                        <li>
                          {" "}
                          Cut + Styling + Color. . . . . . . . . . . . .{" "}
                          <span>$100</span>
                        </li>
                        <li>
                          {" "}
                          Cut + Styling + Tint. . . . . . . . . . . . . . . .
                          <span>$100</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="pricing-list">
                      <ul>
                        <li>
                          Cut. . . . . . . . . . . . . . . . . . . . . . . . . .
                          . . .<span>$25</span>
                        </li>
                        <li>
                          Shave. . . . . . . . . . . . . . . . . . . . . . . . .
                          . <span>$65</span>
                        </li>
                        <li>
                          Beard trim. . . . . . . . . . . . . . . . . . . . . .{" "}
                          <span>$65</span>
                        </li>
                        <li>
                          Cut + beard trim. . . . . . . . . . . . . . . . .{" "}
                          <span>$65</span>
                        </li>
                        <li>
                          Cut + shave. . . . . . . . . . . . . . . . . . . . . .
                          .<span>$63</span>
                        </li>
                        <li>
                          Clean up. . . . . . . . . . . . . . . . . . . . . . .
                          . .<span>$100</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pricing-img">
            <img
              className="pricing-img1"
              src="assets/img/gallery/pricing1.png"
              alt=""
            />
            <img
              className="pricing-img2"
              src="assets/img/gallery/pricing2.png"
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  );
}
