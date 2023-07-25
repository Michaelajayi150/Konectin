import { useRef, useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";

export const TemplateOne = ({ data }) => {
  const page = useRef(null);
  const parentPage = useRef(null);

  const [pageMax, setPageMax] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const pageContainer = page.current;
    setPageMax(Math.ceil(pageContainer.clientHeight / 810));
  }, []);

  const nextPage = () => {
    if (pageNumber !== pageMax) setPageNumber((prev) => prev + 1);
  };

  const previousPage = () => {
    if (pageNumber !== 1) setPageNumber((prev) => prev - 1);
  };

  useEffect(() => {
    parentPage.current.scrollTo({
      top: (pageNumber - 1) * 805,
    });
  }, [pageNumber]);

  return (
    <div className="doc-body">
      <div className="parent-container top-head no-scrollbar">
        <div className="main-content"></div>
        <div className="side-content"></div>
      </div>

      <div id="template">
        <div>
          <div>
            <style>
              {`
                * {
                  margin: 0;
                  padding: 0;
                }

                @page  {
                  margin: 0;
                  size: letter; /*or width then height 150mm 50mm*/
                }
            
                h1,
                h2,
                h3,
                h4 {
                  font-family: "Merriweather", sans-serif;
                }
            
                .doc-body {
                  position: relative;
                }
            
                .parent-container {
                  position: relative;
                  width: 100%;
                  max-width: 560px;
                  min-width: 460px;
                  height: 810px;
                  display: flex;
                  display: -webkit-box;
                  align-items: items-stretch;
                  background: white;
                }
            
                .top-head {
                  max-width: 560px;
                  height: 10px;
                }
            
                .main-content {
                  height: max-content;
                  display: flex;
                  flex-direction: column;
                  width: 66.666667%;
                  padding: 1rem 1.5rem;
                }

                .main-content > section {
                  -webkit-box-flex: 1;
                  -webkit-flex: 1;
                  flex: 1;
                  margin-top: .5rem;
                }

                .main-content > section:first-child {
                  margin-top: 0;
                }
            
                .side-content {
                  display: flex;
                  flex-direction: column;
                  background: #332A66;
                  width: 33.333333%;
                  height: ${pageMax * 100}%;
                  padding: 1rem 1.5rem;
                }

                .side-content > section {
                  margin-top: 1.5rem;
                }

                .side-content > section:first-child {
                  margin-top: 0;
                }
            
                .top-head .side-content {
                  height: 10px;
                  padding: 0;
                }
            
                .sub-section {
                  display: flex;
                  flex-direction: column;
                }

                .sub-section > div {
                  -webkit-box-flex: 1;
                  -webkit-flex: 1;
                  flex: 1;
                  margin-top: 4px;
                }

                .sub-section > div:first-child {
                  margin-top: 0;
                }
            
                .capitalize {
                  text-transform: capitalize;
                }
            
                .font-black {
                  font-weight: 900;
                }
            
                .headings {
                  font-size: 14px;
                  font-weight: 900;
                  margin-bottom: 4px;
                }
            
                .smallest-text {
                  font-size: 10px;
                }
            
                .text-white {
                  color: white;
                }
            
                .text-neutral-200 {
                  color: rgba(63, 64, 68,1);
                }
            
                .text-neutral-300 {
                  color: rgb(102, 102, 106);
                }
            
                .text-neutral-500 {
                  color: rgb(178, 179, 180);
                }
            
                .leading-relaxed {
                  line-height: 1.625;
                }
            
                .leading-4 {
                  line-height: 1rem;
                }
            
                .leading-8 {
                  line-height: 2rem;
                }
            
                .list-none div ul,
                .list-none {
                  list-style-type: none;
                  margin: 0;
                  padding: 0;
                }
            
                .small-text {
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                  font-weight: bold;
                }
            
                .job-desc {
                  padding-left: 1.5rem;
                }

                .job-desc ul li {
                  margin-bottom: .5rem;
                }

                .skillbar {
                  height: 3px;
                  width: 72.666667%;
                  background-color: rgb(229, 231, 235);
                  border-radius: 6px;
                  margin-top: 4px;
                }

                .mb-2 {
                  margin-bottom: 0.5rem;
                }
            `}
            </style>
          </div>

          <div
            ref={parentPage}
            className="parent-container overflow-y-scroll no-scrollbar pointer-events-none"
          >
            <div ref={page} className="main-content">
              <section className="sub-section">
                <h2 className="capitalize font-black headings">
                  {data?.basicInfo.firstName && data?.basicInfo.lastName
                    ? `${data.basicInfo.firstName} ${data.basicInfo.lastName}`
                    : data?.basicInfo.firstName
                    ? `${data.basicInfo.firstName}`
                    : data?.basicInfo.lastName
                    ? `${data.basicInfo.lastName}`
                    : "Your Name"}
                </h2>
                <p className="smallest-text capitalize text-neutral-300">
                  {data?.basicInfo.profession
                    ? data.basicInfo.profession
                    : "Your Profession"}
                </p>
              </section>

              <section>
                <h3 className="headings">Profile</h3>
                <div className="smallest-text leading-relaxed list-none text-neutral-300">
                  {data?.bio ? (
                    <div dangerouslySetInnerHTML={{ __html: data.bio }} />
                  ) : (
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ducimus cupiditate soluta eum alias quo consectetur, laudantium, accusantium, eveniet dolore accusamus labore est. Non dolorem iusto culpa officiis ipsam! Quia!"
                  )}
                </div>
              </section>

              <section>
                <h3 className="headings">Employment History</h3>
                <div className="sub-section">
                  {data?.jobExperience.map((experience, index) => (
                    <div key={index} className="sub-section">
                      <p className="small-text font-semibold text-neutral-200">
                        {experience.jobTitle === "" &&
                        experience.company === "" &&
                        (experience.state === "") & (experience.country === "")
                          ? "Carpenter, Konectin | Lagos, Nigeria"
                          : `${experience.jobTitle}, ${experience.company} | ${experience.state}
                , ${experience.country}`}
                      </p>
                      <span className="smallest-text text-neutral-500">
                        {experience.startMonth === "" &&
                        experience.startYear === ""
                          ? "November 2022 - Present"
                          : `${experience.startMonth} ${experience.startYear} - `}
                        {experience.current
                          ? "Present"
                          : `${experience.endMonth} ${experience.endYear}`}
                      </span>
                      <div className="job-desc smallest-text">
                        {experience.workDesc === "" ? (
                          <ul>
                            <li>
                              Compiled Lists to describe product/service
                              offerings.
                            </li>
                            <li>
                              Directed hiring, training and performance
                              evaluations of marketing staff.
                            </li>
                            <li>
                              Developed pricing strategies to balance firm
                              objectives and customer satisfaction.
                            </li>
                          </ul>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: experience.workDesc,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="headings">Education</h3>
                <div className="sub-section">
                  {data?.education.map((edu, index) => (
                    <div key={index}>
                      <p className="small-text text-neutral-200">
                        {edu.degree === "" &&
                        edu.schoolName === "" &&
                        edu.state === "" &&
                        edu.country === ""
                          ? "Connecticut Carpenters Apprenticeship, Charter Oak State College, New Britain"
                          : `${edu.degree ? `${edu.degree} , ` : ""}${
                              edu.schoolName
                            } | ${edu.state}, ${edu.country}`}
                      </p>
                      <p className="smallest-text text-neutral-500">
                        {edu.startMonth === "" && edu.startYear === ""
                          ? "November 2022 - "
                          : `${edu.startMonth} ${edu.startYear} - `}
                        {edu.graduated
                          ? `${edu.endMonth} ${edu.endYear}`
                          : "Present"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="headings">Reference</h3>
              </section>
            </div>

            <div className="side-content">
              <section className="details">
                <h6 className="text-white text-sm leading-8">Details</h6>
                <p className="text-neutral-500 smallest-text leading-4">
                  {data?.basicInfo.state === "" &&
                  data?.basicInfo.country === ""
                    ? "Your address"
                    : `${data.basicInfo.state}, ${data.basicInfo.country}`}
                </p>
                <p className="text-neutral-500 smallest-text leading-4">
                  {data?.basicInfo.phoneNumber === ""
                    ? "Your phone number"
                    : data.basicInfo.phoneNumber}
                </p>
                <p className="text-neutral-500 smallest-text leading-4">
                  {data?.basicInfo.email === ""
                    ? "Your mail"
                    : data.basicInfo.email}
                </p>
              </section>

              <section className="skills">
                <h6 className="text-white text-sm leading-8">Skills</h6>
                <ul className="text-neutral-500 smallest-text capitalize list-none sub-section">
                  {data?.skills.map((item, index) => {
                    return (
                      <li key={index} className="mb-2">
                        {item === "" ? `Skill ${index + 1}` : item}
                        <div className="skillbar" />
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="parent-container top-head no-scrollbar">
        <div className="main-content"></div>
        <div className="side-content"></div>
      </div>

      <div className="flex w-full justify-end items-center gap-2 mt-3 text-neutral-300">
        <MdIcons.MdArrowBackIos
          onClick={previousPage}
          size="0.6rem"
          className="cursor-pointer text-neutral-200"
        />
        <span className="text-xs">
          {pageNumber} of {pageMax}
        </span>
        <MdIcons.MdArrowForwardIos
          onClick={nextPage}
          size="0.6rem"
          className="text-neutral-200 cursor-pointer"
        />
      </div>
    </div>
  );
};