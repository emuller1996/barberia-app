import { useEffect } from "react";
import { useServicios } from "../../../hooks/useServicios";
import { ViewDollar } from "../../../utils";

export default function ServicesComponent() {
  const { data, getAllServicios, loading } = useServicios();

  useEffect(() => {
    getAllServicios();
  }, []);

  return (
    <div
      id="services"
      className="best-pricing section-padding2 position-relative"
    >
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-xl-7 col-lg-7">
            <div className="section-tittle mb-50 ">
              <span>Nuestro Mejor Precio</span>
              <h2>
                Ofrecemos el mejor precio.
                <br /> en la ciudad
              </h2>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="pricing-list">
                  <ul>
                    {data.map((c) => (
                      <li className="flex justify-between" key={c.id}>
                        {c.name}
                        <span>{ViewDollar(c.price)}</span>
                      </li>
                    ))}
                   
                   
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
  );
}
