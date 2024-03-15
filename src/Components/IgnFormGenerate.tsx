import React, { useEffect,useState } from "react"
import { structureDataType, displayType } from "../Types/DataTypes"
import { Typography, RadioGroup, Radio, Grid, TextField, Checkbox, FormControlLabel, FormLabel, FormGroup, FormControl } from "@mui/material"
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
    const { data, updateFormData } = useFormDataContext()
    const [dataValue,setDataValue] = useState("")
    useEffect(() => {
        if(data[structure.label]){
            setDataValue(data[structure.label])
        }
    },[data,structure.label])
    
    if (structure.display === displayType.InputValue) {

        return (
            <TextField
                label={structure.label}
                {...structure.props}
                onChange={(event) => { updateFormData(structure.label, event.target.value) }}
                value={dataValue}
                variant="outlined"
                fullWidth
            />
        )
    }

     if (structure.display === displayType.TextValue) {

         return (<TextField
             {...structure.props}
             multiline
             rows={12}
             onChange={(event) => { updateFormData(structure.label, event.target.value) }}
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