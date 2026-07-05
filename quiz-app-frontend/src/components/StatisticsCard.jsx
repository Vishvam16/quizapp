import { Card, CardContent, Typography } from "@mui/material";

const StatisticsCard = ({ title, value }) => {
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                textAlign: "center",
                height: "100%",
            }}
        >
            <CardContent>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                >
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatisticsCard;