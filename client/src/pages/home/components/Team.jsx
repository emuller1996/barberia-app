import { useEffect } from "react";
import { useBarbers } from "../../../hooks/useBarbers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function TeamComponent() {
  const { data, getAllBarbers } = useBarbers();

  useEffect(() => {
    getAllBarbers();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="team-area section-padding2 pb-180" id="team">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-11 col-sm-11">
            <div className="section-tittle text-center mb-100">
              <h2>Equipo profesional</h2>
              <span>
                Nuestros expertos en cortes de cabello dispobiles para usted
              </span>
            </div>
          </div>
        </div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          autoPlay={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {data.map((c) => (
            <div key={c} className=" px-4">
              <div className="single-team mb-80 text-center ">
                <div className="team-img h-[500px] bg-cover">
                  <img
                    className="bg-cover h-[500px] "
                    src={c.img_url}
                    alt="JAJ"
                  />
                </div>
                <div className="team-caption">
                  <span>{c.title}</span>
                  <h3>
                    <a href="#">{c.name}</a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="row team-active dot-style">
          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
