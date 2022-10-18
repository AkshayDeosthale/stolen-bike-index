import React from "react";
import {
  MainHeaderDescriptionText,
  MainHeaderDescriptionTextContainer,
} from "./MainHeaderStyles";

const HeaderDescription: React.FC = () => {
  return (
    <MainHeaderDescriptionTextContainer>
      <MainHeaderDescriptionText>
        Stolen bikes are a typical problem in Sydney. The Police want to be more
        efficient in resolving stolen bike cases. We have decided to build a
        software that can automate their processes.
      </MainHeaderDescriptionText>
    </MainHeaderDescriptionTextContainer>
  );
};

export default HeaderDescription;
