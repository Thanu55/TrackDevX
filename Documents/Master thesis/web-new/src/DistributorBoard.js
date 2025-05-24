import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const distributorData = {
  "Backlog": [
    { name: "Org A", lastMonth: 2455, ytdAverage: 2000, forecasted: 2500 },
    { name: "Org B", lastMonth: 500, ytdAverage: 643, forecasted: 455 }
  ],
  "In Progress": [
    { name: "Org C", lastMonth: 7600, ytdAverage: 8600, forecasted: 7000 }
  ],
  "In Review": [],
  "Done": [
    { name: "Org D", lastMonth: 65432, ytdAverage: 67654, forecasted: 64321 }
  ]
};

const statusList = ["Backlog", "In Progress", "In Review", "Done"];

const DistributorCard = ({ distributor }) => (
  <Card sx={{ m: 1, backgroundColor: '#f5f5f5' }}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold">{distributor.name}</Typography>
      <Typography variant="body2">Last Month: {distributor.lastMonth}</Typography>
      <Typography variant="body2">YTD Avg: {distributor.ytdAverage}</Typography>
      <Typography variant="body2">Forecasted: {distributor.forecasted}</Typography>
    </CardContent>
  </Card>
);

const DistributorBoard = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" color="white" mb={3}>TrackDevX</Typography>
    <Grid container spacing={2}>
      {statusList.map(status => (
        <Grid item xs={12} md={3} key={status}>
          <Paper elevation={3} sx={{ backgroundColor: '#eee', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>{status}</Typography>
            {distributorData[status].map((d, i) => (
              <DistributorCard key={i} distributor={d} />
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default DistributorBoard;
