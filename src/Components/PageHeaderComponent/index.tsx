import React from "react";
import {
  MainHeaderContainer,
  MainHeaderLogoNameContainer,
  MainHeaderNameText,
} from "./MainHeaderStyles";
import { RiBikeFill } from "react-icons/ri";

const MainHeader: React.FC = () => {
  return (
    <MainHeaderContainer>
      <MainHeaderLogoNameContainer>
        <RiBikeFill color="orange" />
        <MainHeaderNameText>Stolen Bike Index</MainHeaderNameText>
      </MainHeaderLogoNameContainer>
    </MainHeaderContainer>
  );
};

export default MainHeader;
