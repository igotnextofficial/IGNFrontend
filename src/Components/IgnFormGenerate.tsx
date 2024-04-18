import React, {  useEffect,useState } from "react"
import { structureDataType, displayType } from "../Types/DataTypes"
import {SelectChangeEvent,RadioGroup,InputLabel, Radio, Grid, TextField, FormControlLabel,MenuItem,Select, FormLabel, FormControl } from "@mui/material"
import { useFormDataContext } from "../Contexts/FormContext"



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
    const [dataValue,setDataValue] = useState("")
    const [current_key,setCurrentKey] = useState("")


    useEffect(() => {
        setCurrentKey(structure.label.toLowerCase())
    },[structure.label])


    if (structure.display === displayType.Image) {

        return (
            <TextField
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if(event.target.files){
                    updateFileData('image',event.target.files[0])}
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
                error={current_key in hasError ? !(hasError[current_key].valid) : true }
                helperText={current_key in hasError ? hasError[current_key].message : `label does not exist ${current_key}`}
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

    //     if (display === displayType.MultiChoiceList) {

    //         return (<FormGroup>
    //             <FormControlLabel control={<Checkbox />} label="Required" />
    //         </FormGroup>)
    //     }

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
                    <RadioGroup row value={dataValue} onChange={(event) => { updateFormData(structure.label, event.target.value) }}>
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