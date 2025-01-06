import React, {  useEffect,useState } from "react"
import { structureDataType, displayType } from "../types/DataTypes"
import {SelectChangeEvent,RadioGroup,InputLabel, Radio, Grid, TextField, FormControlLabel,MenuItem,Select, FormLabel, FormControl,FormGroup, Checkbox } from "@mui/material"
import { useFormDataContext } from "../contexts/FormContext"
 



const Generate = ({ formStructures }: { formStructures: structureDataType[] }) => {
    let sortedFields = [...formStructures].sort((a, b) => a.order - b.order)
    let output = sortedFields.map((formStructure,index) => {

        if (formStructure.visibility) {
            return <DisplayFormField key={index} structure={formStructure} />
        }
        return null
    })

    return (
        <>
            {output}
        </>
    )
}

const FieldOutput = ({ structure }: { structure: structureDataType }) => {
    const { updateFormData,updateFileData,hasError } = useFormDataContext()
    const [dataValue, setDataValue] = useState("")
    const [current_key,setCurrentKey] = useState("")
 
    useEffect(() => {
        setDataValue(structure.default ?? "")
  
    },[])

 
    useEffect(() => {
        setCurrentKey(structure.label.toLowerCase())
    },[structure.label])


    if (structure.display === displayType.Image) {

        return (
            <TextField
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if(event.target.files){
              
               
                    // console.log(JSON.stringify(event.currentTarget.files))
                    updateFileData('media',event.target.files[0])}
                }
           
            }
            inputProps={{ accept: 'image/*' }} // Accept only images
          />
        )
    }


    if (structure.display === displayType.InputValue) {
        return (
            <TextField
                label={structure.label}
                {...structure.props}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDataValue(event.currentTarget.value) 
                    updateFormData(current_key,event.currentTarget.value)
                }}
                value={dataValue}
                variant="outlined"
                fullWidth
                error={current_key in hasError ? !(hasError[current_key].valid) : dataValue.trim() === "" }
                helperText={current_key in hasError ? hasError[current_key].message : ``}
            />
        )
    }

     if (structure.display === displayType.TextValue) {

         return (<TextField
             {...structure.props}
             multiline
             rows={12}
             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDataValue(event.currentTarget.value) 
                updateFormData(current_key,event.currentTarget.value)
            }}
             value={dataValue}
             label={structure.label}
             fullWidth

         />)

     }

        if (structure.display === displayType.MultiChoiceList) {

            return (
                <Grid container>
            
                        {       structure.options?.map((option, index) => (
                                <Grid key={index} item xs={4}>
                                    <FormControlLabel  value={option} control={<Checkbox onChange={(e) => {
                                        let current_selection = e.target.value;
                        
                                        let current_value_as_array = dataValue.split(',');
                                        // console.log(`Current value as array ${current_value_as_array}`)

                                        if(current_value_as_array.includes(current_selection)){
                                            current_value_as_array = current_value_as_array.filter((item) => item !== current_selection)
                                        }else{
                                            current_value_as_array.push(current_selection)
                                        }
                                        const data_to_string = current_value_as_array.filter(item => item.trim() !== "").join(',');
                                        setDataValue(current_value_as_array.join(','))
                                        updateFormData(current_key,data_to_string)
                              
                                    }} />} label={option} />
                                </Grid>
                            ))
                        }
           
                    
                </Grid>
            );
        }

    if(structure.display === displayType.DropDown){
        return (
            <FormControl fullWidth variant='filled'>
                <InputLabel id="role-label">{structure.label}</InputLabel>
                <Select 
                    labelId='role-label' 
                    value={dataValue} label="Role" 
                    onChange={(event: SelectChangeEvent<typeof dataValue>) => {
                        
                        setDataValue(event.target.value) 
                        updateFormData(current_key,event.target.value)
                    }}
                >
                    {structure.options?.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                 
                        ))}
                </Select>
            </FormControl>
        )
    }
    if (structure.display === displayType.ChoiceList) {
        return (
            <Grid container>
                <FormControl>
                    <FormLabel id="row-radio-buttons-group-label">{structure.label}</FormLabel>
                    <RadioGroup row value={dataValue} onChange={(event) => { 
                        setDataValue(event.target.value)
                        updateFormData(structure.label, event.target.value) 
                        
                        }}>
                        {structure.options?.map((option, index) => (
                            <Grid key={index} item xs={3}>
                                <FormControlLabel  value={option} control={<Radio />} label={option} />
                            </Grid>
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
        );
    }

    return null

}

const DisplayFormField = ({ structure }: { structure: structureDataType }) => {


    return (<>

        <Grid item xs={12}> <FieldOutput structure={structure} /> </Grid>
    </>)
}


const IgnFormGenerate = ({ formStructures }: { formStructures: structureDataType[] }) => {
    return (
        <>
        
            <Grid container spacing={2}><Generate formStructures={formStructures} /></Grid>
        </>
    )

}

export default IgnFormGenerate