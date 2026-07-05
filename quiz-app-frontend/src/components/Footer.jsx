import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 3,
                textAlign: "center",
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
            }}
        >
            <Typography variant="body1" fontWeight="bold">
                Quiz Application
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                Built with ❤️ using Spring Boot • React • PostgreSQL
            </Typography>

            <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
            >
                © 2026 Vishvam
            </Typography>
        </Box>
    );
};

export default Footer;