import React, { JSX } from "react";
import ResumeCard from "../../structure/resume/resume";
import resumeList from "../../data/resume";

const Resume: React.FC = (): JSX.Element => {
  return (
    <div className="resume">
      <ResumeCard
        title="Traditional Resume Templates"
        subtitle="Professionally structured resume templates for modern career presentation"
        resumeDetails={resumeList}
        isSlider={true}
      />
    </div>
  );
};

export default Resume;
