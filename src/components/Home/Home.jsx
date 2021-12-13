import React from "react";
import { Carousel } from "react-bootstrap";
import "./home.css";

const Home = () => {
  return (
    <React.Fragment>
      <div class="accordion" id="home-accordian">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Paint Projects
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#home-accordian"
          >
            <div class="accordion-body">
              <strong>Start a new project and begin painting!</strong>
              <code>
                <div className="row mt-4">
                  <div className="col">
                    <h3>Create a project so others can see your work!</h3>
                  </div>
                  <div className="col">
                    <img
                      src="/static/img/painting-miniatures-adobe.jpeg"
                      alt="Miniature Painting"
                      className="img-15"
                    />
                  </div>
                </div>
              </code>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Post Updates
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#home-accordian"
          >
            <div class="accordion-body">
              <strong>
                Post updates for follows to see the progress you've made
              </strong>
              <code>
                <div className="row mt-4">
                  <div className="col">
                    <h3> Turn you backlog into a gallery!</h3>
                  </div>
                  <div className="col">
                    <img
                      src="/static/img/painting-miniatures-adobe.jpeg"
                      alt="Miniature Painting"
                      className="img-15"
                    />
                  </div>
                </div>
              </code>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Find others to follow
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#home-accordian"
          >
            <div class="accordion-body">
              <strong>Get inspired</strong>
              <code>
                <div className="row mt-4">
                  <div className="col">
                    <h3>Experience the amazing creativity of other painters!</h3>
                  </div>
                  <div className="col">
                    <img
                      src="/static/img/painting-miniatures-adobe.jpeg"
                      alt="Miniature Painting"
                      className="img-15"
                    />
                  </div>
                </div>
              </code>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
