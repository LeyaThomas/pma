import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import axios from "axios";

function ProjectButton() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectObjective, setProjectObjective] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectId, setProjectId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState(null);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleOpenJoin = () => {
    setOpenJoin(true);
  };

  const handleClose = () => {
    setOpenCreate(false);
    setOpenJoin(false);
    setOpenModal(false);
  };

  const handleCreateProject = () => {
    const employeeId = localStorage.getItem("cususerid");
    axios
      .post(process.env.REACT_APP_API_URL + `projects/create`, {
     
        name: projectName,
        objective: projectObjective,
        deadline: projectDeadline,
        employeeId: employeeId,
      })
      .then((response) => {
        setCreatedProjectId(response.data.id); // Save the created project ID
        setOpenModal(true);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleJoinProject = () => {
    const employeeId = parseInt(localStorage.getItem("cususerid"));
    const projectIdValue = parseInt(projectId); // Parse projectId to integer
  
    console.log(`Employee ID: ${employeeId}, Project ID: ${projectIdValue}`);
  
    const data = {
      employee_id: employeeId,
      project_id: projectIdValue,
    };
  
    console.log("Sending the following data to the server:", data);
  
    axios
      .post(process.env.REACT_APP_API_URL + `projects/projectemployee`, data)
      .post("http://localhost:8000/projects/projectemployee/", data)
      .then((response) => {
        console.log(response.data);
        alert("You have successfully joined the project");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to join the project");
      });
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <Fab color="primary" aria-label="add" onClick={handleOpenCreate}>
        <AddIcon />
      </Fab>
      <Dialog open={openCreate} onClose={handleClose}>
        <DialogTitle>Create a Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Objective"
            type="text"
            fullWidth
            value={projectObjective}
            onChange={(e) => setProjectObjective(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Deadline"
            type="date"
            fullWidth
            value={projectDeadline}
            onChange={(e) => setProjectDeadline(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateProject} color="primary">
            Create
          </Button>
          <Button onClick={handleOpenJoin} color="secondary">
            Join a Project
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openJoin} onClose={handleClose}>
        <DialogTitle>Join a Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project ID"
            type="text"
            fullWidth
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJoinProject} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
      <Modal open={openModal} onClose={handleClose}>
        <div>
          <h2>
            Project created with ID: <b>{createdProjectId}</b>
          </h2>
          <button onClick={handleClose}>Continue</button>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectButton;