import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import classes from "./CarouselBigCourses.module.css";
import { Link } from "react-router-dom";
import {
  HTTP_METHODS,
  httpRequest,
} from "../../../../core/utils/httpRequest.js";
import APP_CONFIG from "../../../../core/utils/apiConfig.js";

export default function CarouselBigCourses() {
  const [bigCourses, setBigCourses] = useState([]);

  useEffect(() => {
    //  todo: change this endpoint according to the UI requirements
    httpRequest(
      APP_CONFIG.endpoints.jobs.getJobs,
      HTTP_METHODS.GET,
      {},
      {},
      {
        size: 5,
        skip: 0,
      },
    ).then((res) => {
      if (res.status === 200) {
        setBigCourses(res.data);
      }
    });
  }, []);

  return (
    <div
      style={{
        margin: "-20px 0px 0px",
        padding: "0px 0px 70px 0px",
        backgroundColor: "#eef6ff",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p className={classes.title}>Placement guarantee courses</p>
        <div className={classes.upOption}>
          <span className={classes.option}>
            <i className="fa-solid fa-check"></i> Guaranteed placement
          </span>
          <span className={classes.option}>
            <i className="fa-solid fa-check"></i> Get 100% refund if not hired
          </span>
          <span className={classes.option}>
            <i className="fa-solid fa-check"></i> Become job ready
          </span>
        </div>
      </div>{" "}
      <Carousel
        height={500}
        controlsOffset="xs"
        controlSize={40}
        className={classes.carousel}
        style={{ margin: "0px 20px", padding: "0px 0px" }}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align="start"
      >
        {bigCourses.map((item) => (
          <Carousel.Slide key={item.id} style={{ padding: "0px 20px" }}>
            <div className={classes.box}>
              <Link to="" style={{ textDecoration: "none" }}>
                <img
                  src={item.img}
                  className={classes.img}
                  width={"100%"}
                  height={"35%"}
                />
                <div className={classes.description}>
                  <p
                    className={classes.titleBigCourse}
                    style={{
                      fontWeight: 700,
                      fontSize: "20px ",
                      marginBottom: "0px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p className={classes.hint}>{item.hint}</p>
                  <p className={classes.details}>
                    {" "}
                    <i
                      className="fa-regular fa-clock"
                      style={{ paddingRight: "2px" }}
                    ></i>{" "}
                    {item.time} months course
                  </p>
                  <p className={classes.details}>
                    <i
                      className="fa-solid fa-dollar-sign"
                      style={{ paddingRight: "2px" }}
                    ></i>
                    {item.price}
                  </p>
                  <p className={classes.details}>
                    {" "}
                    <i
                      className="fa-solid fa-suitcase"
                      style={{ paddingRight: "3px" }}
                    ></i>
                    {item.offer}
                    <span className={classes.opp}>opportunities</span>
                  </p>
                  <a className={classes.knowMore}>
                    Know more <i className="fa-solid fa-angle-right"></i>{" "}
                  </a>
                </div>
              </Link>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
