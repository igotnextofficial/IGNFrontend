// import {React , useState, useEffect} from "react";

// const FormTest = () => {

//     const Fields = () => {
//         const [username,setUsername] = useState('')
//         const [firstname,setFirstname] = useState('')
//         const [formData,setFormData] = useState({username:''});
//         useEffect(()=>{(`The username is ${formData['username']}`)},[formData])      
//         return (
//         <>
//                 <input
//                     type='text'
//                     name='username'
//                     placeholder="username"
//                     value = {formData['username']}
//                     onChange={e => setFormData((prev) => {
//                         return {
//                             ...prev,
//                             'username': e.target.value
//                         }
//                     })}
//                 />

//                 <input
//                     type='text'
//                     name='firstname'
//                     placeholder="firstname"
//                     value = {firstname}
//                     onChange={e => setFirstname(e.target.value)}
//                 />
//         </>
//     )}

//     return (
       
//         <Fields/>
       
//     )

// }

// export default FormTest;