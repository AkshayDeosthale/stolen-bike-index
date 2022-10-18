import { Box, BoxProps, styled, Theme, Typography } from "@mui/material";

export const MainHeaderContainer = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    width: "100%",
    display: "flex",
  })
);
export const MainHeaderLogoNameContainer = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    display: "flex",
    fontWeight: 600,
    fontSize: "40px",
    alignItems: "center",
    gap: "16px",
  })
);
export const MainHeaderNameText = styled(Typography)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    fontWeight: 600,
    fontSize: "30px",
  })
);

//description
export const MainHeaderDescriptionText = styled(Typography)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    fontWeight: 600,
    fontSize: "20px",
  })
);

export const MainHeaderDescriptionTextContainer = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    width: "25%",
    height: "70%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  })
);
