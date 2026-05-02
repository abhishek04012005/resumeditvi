"use client";
import React, { useState } from "react";
import EnquiryPopup from "../enquiryPopup/EnquiryPopup";

interface SampleResumeDetails {
  modelNumber: string;
  language: string;
  type: string;
  amount: number;
}

const LeadMagnet: React.FC = () => {
  const [showGetNow, setShowGetNow] = useState<boolean>(true);
  const [showLeadMagnet, setShowLeadMagnet] = useState<boolean>(true);

  const sampleResumeDetails: SampleResumeDetails = {
    modelNumber: "0000",
    language: "English",
    type: "Guest",
    amount: 0,
  };

  return (
    <>
      {showLeadMagnet && (
        <EnquiryPopup
          heading="Enquiry Now for Resume Templates"
          paragraph="Please fill the details"
          buttonTitle="Submit"
          isOpen={showGetNow}
          onClose={() => {
            setShowGetNow(false);
            setShowLeadMagnet(false);
          }}
          modelDetails={sampleResumeDetails}
          isLeadMagnet={true}
        />
      )}
    </>
  );
};

export default LeadMagnet;