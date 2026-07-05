import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={2}
                sx={{
                    bgcolor: "white",
                    color: "black",
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            flexGrow: 1,
                        }}
                    >
                        <QuizRoundedIcon
                            color="primary"
                            sx={{ fontSize: 32 }}
                        />

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                        >
                            Quiz Application
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<LogoutRoundedIcon />}
                        onClick={() => setOpenLogoutDialog(true)}
                        sx={{
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Dialog
                open={openLogoutDialog}
                onClose={() => setOpenLogoutDialog(false)}
            >
                <DialogTitle>
                    Logout
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setOpenLogoutDialog(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Navbar;