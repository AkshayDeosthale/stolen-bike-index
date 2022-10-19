import { Box, BoxProps, Typography } from "@mui/material";
import { styled, Theme, TypographyProps } from "@mui/system";

export const DialogDetailTitle = styled(Typography)<TypographyProps>(
  ({ theme }: { theme: Theme }) => ({
    fontWeight: 600,
    fontSize: theme.spacing(2),
  })
);

export const FilterOptionContainer = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    width: "250px",
    padding: theme.spacing(2),
    cursor: "pointer",
  })
);
