import React, { useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, TextField, MenuItem, Button } from '@mui/material';

const initialDistributorData = {
  Backlog: [
    { name: "Integrate Dashboard", Responsible: "Alice", Author: "Zara", Description: "Connect the dashboard with real-time data so users can view insights, the UI with backend APIs to render live data and metrics" },
    { name: "API Gateway", Responsible: "Bob", Author: "Maya", Description: "Set up a single entry point that manages how data flows between different parts of the system, (e.g., AWS API Gateway, Kong, or NGINX) to route and manage microservice communication securely." },
    { name: "CI/CD Pipeline", Responsible: "Libra", Author: "Maya", Description: "Set up automated steps to test and deploy new updates quickly and safely, implement automated pipelines (e.g., using GitHub Actions, Jenkins, or GitLab CI) for build, test, and deployment workflows." }
  ],
  "In Progress": [
    { name: "Ingest Shipment Quantity", Responsible: "Carol", Author: "Liam", Description: "Develop a feature that records the number of items shipped, create a service to process and store incoming shipment quantity data, possibly via message queues or API calls." }
  ],
  "In Review": [
    { name: "Collect Metrics", Responsible: "Bob", Author: "Maya", Description: "Create a tool that tracks and collects performance or usage data, develop a microservice to collect system and business KPIs, possibly integrating with Prometheus or similar tools." },
    { name: "Scaffold Dashboard", Responsible: "Leo", Author: "Maya", Description: "Create the basic layout and structure for a user interface to display data, generate the front-end project structure using a framework like React, Angular, or Vue, with initial routing and components." }
  ],
  Done: [
    { name: "Collect Distributors", Responsible: "Dave", Author: "Noah", Description: "Build a small app that gathers data about product distributors, a service that fetches and aggregates distributor data via APIs or data feeds." },
    { name: "Database Provision", Responsible: "Alice", Author: "Maya", Description: "Set up a secure place to store all the system’s data, Deploy and configure a PostgreSQL instance for persistent data storage." }
  ]
};

const statusList = ["Backlog", "In Progress", "In Review", "Done"];

const DistributorCard = ({ distributor, onClick, onDelete }) => (
  <Card
    sx={{
      m: 1,
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
      position: 'relative',
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      maxWidth: '100%',
    }}
    onClick={onClick}
  >
    <CardContent sx={{ padding: '8px 16px' }}>
      <Typography variant="body1" fontWeight="bold" component="div">
        {distributor.name}
      </Typography>
    </CardContent>

    {/* Delete Button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        border: 'none',
        background: 'transparent',
        color: '#888',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
        lineHeight: '1',
        padding: '0 6px',
      }}
      aria-label="Delete task"
      title="Delete task"
    >
      ×
    </button>
  </Card>
);

const DistributorBoard = () => {
  const [distributorData, setDistributorData] = useState(initialDistributorData);
  const [selectedDistributor, setSelectedDistributor] = useState(null);

  // Form state
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState(statusList[0]);
  const [responsible, setResponsible] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = (distributor) => setSelectedDistributor(distributor);
  const handleClose = () => setSelectedDistributor(null);

  const handleDelete = (status, distributorName) => {
    setDistributorData(prevData => {
      const newList = prevData[status].filter(d => d.name !== distributorName);
      return { ...prevData, [status]: newList };
    });
    if (selectedDistributor && selectedDistributor.name === distributorName) handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !responsible.trim() || !author.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = { 
      name: taskName.trim(), 
      Responsible: responsible.trim(),
      Author: author.trim(),
      Description: description.trim(),
    };

    setDistributorData(prevData => ({
      ...prevData,
      [category]: [...prevData[category], newTask]
    }));

    // Reset form fields after submitting
    setTaskName('');
    setCategory(statusList[0]);
    setResponsible('');
    setAuthor('');
    setDescription('');
  };

  return (
    <Box sx={{ p: 2, height: '100vh', boxSizing: 'border-box', bgcolor: 'transparent' }}>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        color="white" 
        mb={3} 
        sx={{ userSelect: 'none' }}
      >
        TrackDevX
      </Typography>

      <Box
        sx={{
          display: 'flex',
          height: 'calc(100% - 56px)',
          gap: 2,
          overflow: 'hidden',
          flexWrap: 'nowrap',
        }}
      >
        {/* Left side: Categories container */}
        <Box
          sx={{
            flex: '1 1 0',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          {statusList.map(status => (
            <Paper
              key={status}
              elevation={3}
              sx={{
                flex: '1 1 0',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#eee',
                borderRadius: 2,
                padding: 2,
                minWidth: 0,
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom color="#008080" sx={{ flexShrink: 0 }}>
                {status}
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  minHeight: 0,
                }}
              >
                {distributorData[status].map((d, i) => (
                  <DistributorCard
                    key={i}
                    distributor={d}
                    onClick={() => handleOpen(d)}
                    onDelete={() => handleDelete(status, d.name)}
                  />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Right side: Form */}
        <Paper
          elevation={3}
          sx={{
            width: 320,
            padding: 3,
            borderRadius: 2,
            backgroundColor: '#fffde7', // Lightest yellow shade
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            mb={2} 
            color="#008080" // Teal blue color
          >
            Add New Task
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <TextField
              label="Task Name"
              fullWidth
              margin="normal"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <TextField
              select
              label="Category"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {statusList.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Responsible Name"
              fullWidth
              margin="normal"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
            />
            <TextField
              label="Author Name"
              fullWidth
              margin="normal"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Popover */}
      {selectedDistributor && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 24,
              minWidth: 300,
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'none',
                border: 'none',
                fontSize: 20,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              aria-label="Close popover"
            >
              ×
            </button>

            <Typography variant="h5" fontWeight="bold" mb={1}>
              {selectedDistributor.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Description: {selectedDistributor.Description}
            </Typography>
            <Typography variant="body1" mb={0.5}>
              Responsible: {selectedDistributor.Responsible}
            </Typography>
            <Typography variant="body1">
              Author: {selectedDistributor.Author}
            </Typography>
          </div>
        </div>
      )}
    </Box>
  );
};

export default DistributorBoard;
