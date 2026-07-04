import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    Quiz Application
                </Typography>

                <Button
                    color="inherit"
                >
                    Logout
                </Button>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;