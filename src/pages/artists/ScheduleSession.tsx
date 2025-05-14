import React, { useEffect, useState } from "react"
import { Box, Typography, Button, CircularProgress } from "@mui/material"
import { useUser } from "../../contexts/UserContext"
import { MenteeDataType, MentorDataType, MentorSessionDataType } from "../../types/DataTypes"
import MainHolderComponent from "../../helpers/MainHolderComponent"
import ScheduleTime from "../../components/ScheduleTime"
import IgnPillComponent from "../../helpers/IgnPillComponent"
import dayjs from 'dayjs';
import { useErrorHandler } from "../../contexts/ErrorContext"
import { APP_ENDPOINTS } from "../../config/app"
import PaymentForm from "../../components/PaymentForm" // Moved payment form to separate component
import useHttp from "../../customhooks/useHttp"
import formatPrice from "../../utils/formatPrice"
const ScheduledSuccess = () => {
    return (
        <>
            <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="h4">
                Your session was scheduled successfully
            </Typography>
        </>
    )
}

const SessionPaymentForm = ({
    currentMentor,
    onPaymentSuccess
  }: {
    currentMentor: MentorDataType | null,
    onPaymentSuccess: () => void
  }) => {
    if (!currentMentor) return null;
  
    const { fullname, profile_photo_path, product } = currentMentor;
 
  
    return (
      <>
        <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="h4" align="center">
          Complete Payment to Schedule Session
        </Typography>
  
        <Box
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            mb: 4,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
            border: '1px solid #e0e0e0'
          }}
        >
          <IgnPillComponent description={`Mentor: ${fullname}`} link="" />
  
          <Box
            component="img"
            src={profile_photo_path}
            alt={fullname}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              border: '2px solid #ecdb22',
              mt: 2,
              mb: 3
            }}
          />
  
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Session Details
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              Product:
              <span style={{ fontWeight: 400 }}> Mentor Services with {fullname}</span>
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              Price:
              <span style={{ fontWeight: 400 }}>
                { formatPrice(product?.price)}
              </span>
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              Description:
              <span style={{ fontWeight: 400 }}>
              A private, 1-on-1 session with { fullname } designed to support your growth as a music artist through coaching, feedback, and industry advice.
              </span>
            </Typography>
          </Box>
  
          <PaymentForm
            amount={product?.price || 0}
            productId={product?.id || ''}
            mentorId={currentMentor?.id || ''}
            onSuccess={onPaymentSuccess}
          />
        </Box>
      </>
    );
  };
  

const Scheduler = ({ currentMentor,productPayment }: { currentMentor: MentorDataType | null,productPayment:string }) => {
    return (
        <>
            <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="h4">
                Schedule your session with {currentMentor?.fullname}
            </Typography>
            <Box sx={{ maxWidth: '600px' }}>
                <IgnPillComponent 
                    description={`Mentor: ${currentMentor?.fullname}`} 
                    link="" 
                />
                <img 
                    style={{ width: "100%", border: "2px solid #ecdb22" }} 
                    src={currentMentor?.profile_photo_path} 
                    alt={currentMentor?.fullname} 
                />
                <ScheduleTime productPayment={productPayment} />
            </Box>
        </>
    )
}

const ScheduleSession = () => {
    const { user,accessToken } = useUser()
    const { get } =  useHttp(accessToken)
    const [currentMentor, setCurrentMentor] = useState<MentorDataType | null>(null)
    const [scheduledSuccessfully, setScheduledSuccessfully] = useState<boolean>(false)
    const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false)
    const [productPayment, setProductPayment] = useState<string>("")

    useEffect(() => {
      const getProductPayment = async () => {
        try {
        
            if (!user) return;
            const url = APP_ENDPOINTS.PAYMENT.RETRIEVE_PRODUCT_PAYMENT.replace(':userId',user?.id  )
            const response = await get(url)
            const product_payment_id = response.data[0].id ?? ""
            if(product_payment_id.length > 0){
                setProductPayment( product_payment_id)
                setPaymentCompleted(true);
            }
        } catch (error) {
            console.log(`error in the get product payment is ${error}`)
        }
        
      }
      getProductPayment()
    }, [])


    useEffect(() => {
        if (!user) return;
        console.log(`the current user is ${JSON.stringify(user,null,2)}`)

        let currentUser = user as MenteeDataType;
        if (currentUser && 'mentorSession' in currentUser) {
            const sessions = currentUser.mentorSession;
            if (sessions && Array.isArray(sessions)) {
                const upcomingSession = sessions.find(session => 
                    dayjs(session.nextSession) >= dayjs()
                );
                if (upcomingSession) {
                    setScheduledSuccessfully(true);
                }
            }
        }
    }, [user])
    
    useEffect(() => {
        if (currentMentor === null) {
            if (user && 'mentor' in user) {
                setCurrentMentor(user?.mentor as MentorDataType)
            }
        }
    }, [user, currentMentor])

    const handlePaymentSuccess = () => {
        setPaymentCompleted(true);
    };

    return (
        <MainHolderComponent>
            {scheduledSuccessfully ? (
                <ScheduledSuccess />
            ) : paymentCompleted ? (
                <Scheduler currentMentor={currentMentor} productPayment={productPayment} />
            ) : (
                <SessionPaymentForm 
                    currentMentor={currentMentor} 
                    onPaymentSuccess={handlePaymentSuccess} 
                />
            )}
        </MainHolderComponent>
    )
}

export default ScheduleSession