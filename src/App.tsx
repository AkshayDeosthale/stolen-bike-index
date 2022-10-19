import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled, Theme } from "@mui/system";
import "./App.css";
import MainHeader from "./Components/PageHeaderComponent";
import HeaderDescription from "./Components/PageHeaderComponent/HeaderDescription";
import PageBodyComponent from "./Components/PageBodyComponent";
import { getStolenBikeDetails } from "./Utility/FetchData";

const HeaderContainer = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "10px 30px 10px 30px",
    height: "97vh",
    backgroundImage: "url(/resources/illustration.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  })
);

const ContentContainer = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "10px 30px 10px 30px",
    height: "97vh",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
    },
  })
);

function App() {
  React.useEffect(() => {
    getStolenBikeDetails("1", "10");
  }, []);

  return (
    <Box>
      <HeaderContainer>
        <MainHeader />
        <HeaderDescription />
      </HeaderContainer>
      <ContentContainer>
        <PageBodyComponent />
      </ContentContainer>
    </Box>
  );
}

export default App;
