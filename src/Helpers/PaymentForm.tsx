import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box,Button,FormControl,Grid } from '@mui/material';

interface PaymentInformation{
  cardholderInformation: { 
    fullname:string, 
    address:string,
    zipCode:number,
    city:string,
    state:string
  },
  paymemtInformation:{
    cardNumber:number,
    cvc:number,
    expiration:Date
  }
  goals?:string,

}
const CheckoutForm = () => {


  const [errorMessage, setErrorMessage] = useState<PaymentInformation | null>(null);
  const [data,setData] = useState(null)

  const handleSubmit = async (event:HTMLElement) => {
   
  };

  return (
    <Box sx={styles.container}>
    <FormControl>
      <Grid container spacing={3}>
        <Grid item xs={12} > <TextField variant='filled'  required fullWidth placeholder='fullname' label="Fullname" /></Grid>
        <Grid item xs ={12}> <TextField variant='filled' required fullWidth placeholder='address' label="address" /></Grid>
        
        <Grid item xs={4}><TextField variant='filled' required fullWidth placeholder='Zip Code' label="Zip Code" /></Grid>
        <Grid item xs={4}><TextField variant='filled' required fullWidth placeholder='City' label="City" /></Grid>
        <Grid item xs={4}><TextField variant='filled' required fullWidth placeholder='State' label="State" /></Grid>
        
        <Grid item xs={8}><TextField variant='filled' required fullWidth placeholder='credit card number' label="credit card number" /></Grid>
        <Grid item xs={2}><TextField variant='filled' required fullWidth placeholder='cvc' label="cvc" /></Grid>
        <Grid item xs={2}><TextField variant='filled' required fullWidth placeholder='expiration date' label="exp" /></Grid>
        
        <Grid item  xs={12}><TextField variant='filled' multiline fullWidth rows={8} placeholder='Goals/Notes' label="goals/notes" /></Grid>

        <Grid item>  <Button variant='contained' onClick={() => {alert("somebody clicked me !")}}> Subscribe</Button> </Grid>   
      </Grid>
    

     
      </FormControl>
      </Box>
  );
 
};



const PaymentForm = () => (
  <>
    <CheckoutForm/>
  </>
);

const styles = {
  container:{
    padding:"2em 1em",
    border:"1px solid #f2c85b",
    borderRadius:"5px"
  }
}
export default PaymentForm;
