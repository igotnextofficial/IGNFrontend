import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import useHttp from "../../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../../config/app";
import { useErrorHandler } from "../../../contexts/ErrorContext";
import { Box, Typography, CircularProgress } from "@mui/material";
import IGNButton from "../../common/IGNButton";

const StripeOnBoarding = ({stripe_account_id}: {stripe_account_id: string }) => {
    const { get, post } = useHttp();
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { updateError } = useErrorHandler();

    const handleOnBoard = async () => {
        try {
            setLoading(true);
            const response = await post(APP_ENDPOINTS.PRODUCTS.GENERATE_STRIPE_LINK, {account_id: stripe_account_id});
            setUrl(response.data.url);
        } catch (error) {
            updateError(error instanceof Error ? error.message : 'An error occurred during Stripe onboarding');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Box>
                <IGNButton onClick={handleOnBoard} disabled={loading}>
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: "#FBFAF9" }} />
                    ) : (
                        <Typography sx={{color:"#FBFAF9"}}>Click here to Generate Stripe Link</Typography>
                    )}
                </IGNButton>
                {url && <a href={url} target="_blank" rel="noopener noreferrer">Click here to onboard your Stripe account</a>}
            </Box>
        </div>
    )
}

export default StripeOnBoarding;