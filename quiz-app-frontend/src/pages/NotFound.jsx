import { Container, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack
                spacing={3}
                alignItems="center"
            >
                <ErrorOutlineRoundedIcon
                    color="primary"
                    sx={{ fontSize: 100 }}
                />

                <Typography
                    variant="h2"
                    fontWeight="bold"
                >
                    404
                </Typography>

                <Typography
                    variant="h5"
                    textAlign="center"
                >
                    Page Not Found
                </Typography>

                <Typography
                    color="text.secondary"
                    textAlign="center"
                >
                    The page you're looking for doesn't exist.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/dashboard")}
                >
                    Go to Dashboard
                </Button>
            </Stack>
        </Container>
    );
};

export default NotFound;