import { Link } from "react-router-dom";
import TeamComponent from "./home/components/Team";
import ServicesComponent from "./home/components/Services";

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
                        Los Mejores Cortez del la Cuidad
                      </span>
                      <h1 data-animation="fadeInUp" data-delay="0.5s">
                        Nuestro peinado hace que tu look sea elegante.
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stock-text">
            <h2>TENGA MÁS CONFIANZA.</h2>
            <h2>TENGA MÁS CONFIANZA.</h2>
          </div>
          <div className="thumb-content-box">
            <div className="thumb-content">
              <h3>Saca tu Cita </h3>
              <a href="#">
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
                    <span>Sobre Nuestra Compañía</span>
                    <h2>¡12 Años De Experiencia En Corte De Cabello!</h2>
                  </div>
                  <p className="mb-30 pera-bottom">
                    Brook presenta sus servicios de forma flexible, cómoda y
                    diseños de cdpoe. Puede seleccionar sus diseños favoritos y
                    elementos para ts culares con personalización ilimitada
                    posibilidades. La perfección de píxeles de los diseñadores
                    es destinado.
                  </p>
                  <p className="pera-top mb-50">
                    Brook presenta sus servicios de forma flexible, cómoda y ent
                    diseños anipropósito. Puedes seleccionar tu favorito.
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

        <TeamComponent />

        <ServicesComponent />
      </main>
      <footer>
        <div
          className="footer-area section-bg bg-yellow-950"
          data-background="assets/img/gallery/footer_bg.png"
        >
          <div className="container">
            <div className="footer-top footer-padding">
              <div className="row d-flex justify-content-between">
                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-8">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-logo">
                      <a href="index.html">
                        <img src="assets/img/logo/logo2_footer.png" alt="" />
                      </a>
                    </div>
                    <div className="footer-tittle">
                      <div className="footer-pera">
                        <p className="info1">
                          Receive updates and latest news direct from Simply
                          enter.
                        </p>
                      </div>
                    </div>
                    <div className="footer-number">
                      <h4>
                        <span>+564 </span>7885 3222
                      </h4>
                      <p>youremail@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-5">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Location </h4>
                      <ul>
                        <li>
                          <a href="#">Advanced</a>
                        </li>
                        <li>
                          <a href="#"> Management</a>
                        </li>
                        <li>
                          <a href="#">Corporate</a>
                        </li>
                        <li>
                          <a href="#">Customer</a>
                        </li>
                        <li>
                          <a href="#">Information</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-5">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Explore</h4>
                      <ul>
                        <li>
                          <a href="#">Cookies</a>
                        </li>
                        <li>
                          <a href="#">About</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Proparties</a>
                        </li>
                        <li>
                          <a href="#">Licenses</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Location</h4>
                      <div className="footer-pera">
                        <p className="info1">
                          Subscribe now to get daily updates
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-xl-9 col-lg-8">
                  <div className="footer-copy-right">
                    <p>
                      Copyright &copy;
                      <script>
                        document.write(new Date().getFullYear());
                      </script>{" "}
                      All rights reserved | This template is made with{" "}
                      <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                      <a href="https://colorlib.com" target="_blank">
                        Colorlib
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4">
                  <div className="footer-social f-right">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.facebook.com/sai4ull">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fas fa-globe"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
