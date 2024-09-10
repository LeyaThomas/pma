import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../Theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mt="-140px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What is the purpose of this web app
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          This web app serves as a tool for managing and monitoring various aspects of a team or project.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Is the web app mobile-friendly?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, the web app is designed to be responsive and accessible on various devices, including smartphones and tablets.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Is the data stored securely?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, the web app employs robust security measures to ensure data confidentiality, integrity, and availability. It may utilize encryption, authentication, and access controls to protect sensitive information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Is there a roadmap for future updates and enhancements?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, the development team may have a roadmap outlining upcoming updates, features, and enhancements based on user feedback and industry trends. Users can expect continuous improvements and new functionalities over time.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Is there a trial or demo version available
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, a trial or demo version of the web app may be available for users to explore its features and functionalities before making a purchase or subscription.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
