/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import JobActivities from "./activities";
import Responsibilities from "./responsibilites";
import PreviousExperience from "./previous-experience";
import { useLocalStorage } from "../../../../../../middleware/storage";
import { useTemplateContext } from "../../../../../../middleware/resume";

const EmploymentExperience = ({ data, template }) => {
  const navigate = useNavigate();
  const { setTemplateData } = useTemplateContext();

  // Get a replica of the template data and store it as a separate Local State
  const [jobExperienceArray, setJobExperienceArray] = useLocalStorage(
    "jobExpr",
    data.jobExperience
  );

  // Set the job Experience being edited to the exact one using the currentEditedJob state
  const [jobExperience, setJobExperience] = useState(
    jobExperienceArray[data.currentEditedJob - 1]
  );

  // A re-effect to update the job Experience according to the exact jb being edited whenever the currentEditedjob is updated
  useEffect(() => {
    setJobExperience(jobExperienceArray[data.currentEditedJob - 1]);
  }, [data.currentEditedJob]);

  useEffect(() => {
    setJobExperienceArray((prev) =>
      Object.values(prev).map((obj, id) => {
        if (id === data.currentEditedJob - 1) {
          return jobExperience;
        }
        return obj;
      })
    );
  }, [jobExperience]);

  // Handles all changes in the input field of the form and updates the jobExperienceArray
  const handleStateChange = (name, value) => {
    setJobExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // add another empty valued object into the jobExperience and navigates to the first job field
  const addWorkExperience = () => {
    setJobExperienceArray([
      ...jobExperienceArray,
      {
        city: "",
        company: "",
        country: "",
        current: false,
        endMonth: "",
        endYear: "",
        jobTitle: "",
        startMonth: "",
        startYear: "",
        state: "",
        workDesc: "",
      },
    ]);

    setTemplateData((prev) => ({
      ...prev,
      currentEditedJob: prev.currentEditedJob + 1,
    }));

    navigate("/resume/builder/employment-experience/");
  };

  // Controls the activities go back functions
  const goBack = () => {
    // if the array contains more than one object it goes to the basicInfo page otherwise goes to the job responsibility page
    if (Object.keys(jobExperienceArray).length <= 1) {
      setTemplateData((prev) => ({
        ...prev,
        currentEditedJob: prev.currentEditedJob,
      }));

      navigate("/resume/builder/employment-experience/responsibilities");
      return;
    }

    navigate("/resume/builder/");
  };

  // Controls the previous experience page go back functions
  const handleBack = () => {
    // if the array contains more than one object it goes to the job activities page and set the array back to the normal otherwise goes to the basicInfo page
    if (Object.keys(jobExperienceArray).length >= 2) {
      setJobExperienceArray(data.jobExperience);
      navigate("/resume/builder/employment-experience/job-activities");
      return;
    }

    navigate("/resume/builder/");
  };

  const handleDelete = (index) => {
    jobExperienceArray.splice(index, 1);
    setTemplateData((prev) => ({
      ...prev,
      jobExperience: jobExperienceArray,
    }));

    setJobExperienceArray(jobExperienceArray);
  };

  const employment_components = [
    { element: PreviousExperience, path: "/" },
    { element: Responsibilities, path: "/responsibilities" },
    { element: JobActivities, path: "/job-activities" },
  ];

  return (
    <Routes>
      {employment_components.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <route.element
              data={jobExperience}
              jobArray={jobExperienceArray}
              handleInputChange={handleStateChange}
              addCompany={addWorkExperience}
              goBack={goBack}
              handleBack={handleBack}
              deleteExperience={handleDelete}
              template={template}
            />
          }
        />
      ))}
    </Routes>
  );
};

export default EmploymentExperience;