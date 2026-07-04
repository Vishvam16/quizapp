import { Container, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    return (
        <>
            <Navbar />

            <Container maxWidth="lg">

                <Box mt={4}>

                    <Typography variant="h4">
                        Dashboard
                    </Typography>

                    <Typography color="text.secondary">
                        Welcome back!
                    </Typography>

                </Box>

            </Container>
        </>
    );
};

export default Dashboard;