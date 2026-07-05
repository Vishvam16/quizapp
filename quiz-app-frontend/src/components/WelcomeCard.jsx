import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

const WelcomeCard = () => {

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Card
            elevation={0}
            sx={{
                mt: 4,
                mb: 5,
                borderRadius: 4,
                background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                color: "white",
            }}
        >
            <CardContent sx={{ p: 5 }}>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    gutterBottom
                >
                    👋 Welcome Back!
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        opacity: 0.95,
                        mb: 1,
                    }}
                >
                    Ready to test your knowledge today?
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        opacity: 0.9,
                    }}
                >
                    Attempt any available quiz below and keep improving your skills.
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            opacity: 0.85,
                        }}
                    >
                        📅 {today}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default WelcomeCard;