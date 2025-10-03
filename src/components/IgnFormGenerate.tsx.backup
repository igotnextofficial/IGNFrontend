import React, { useEffect, useState } from "react"
import { FormField, displayType } from "../types/DataTypes"
import { SelectChangeEvent, RadioGroup, InputLabel, Radio, Grid, TextField, FormControlLabel, MenuItem, Select, FormLabel, FormControl, FormGroup, Checkbox, Box, Typography, CircularProgress, FormHelperText } from "@mui/material"
import { useFormDataContext } from "../contexts/FormContext"
import LoadingScreen from "./LoadingScreen"

function formatNumber(num: number) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
}

const Generate = ({ formStructures }: { formStructures: FormField[] }) => {
    const sortedFields = [...formStructures].sort((a, b) => a.order - b.order)
    const output = sortedFields.map((formStructure, index) => {
        if (formStructure.visibility) {
            return <DisplayFormField key={index} structure={formStructure} />
        }
        return null
    })

    return <>{output}</>
}

interface FieldOutputProps {
    structure: FormField;
}

const FieldOutput = ({ structure }: FieldOutputProps) => {
    const { data, updateFormData } = useFormDataContext();
    const [dataValue, setDataValue] = useState("");
    const [isFieldLoading, setIsFieldLoading] = useState(false);
    const [current_key, setCurrentKey] = useState("");
    const [hasError, setHasError] = useState<Record<string, { valid: boolean; message: string }>>({});

    useEffect(() => {
        setCurrentKey(structure.label.toLowerCase());
    }, [structure.label]);

    useEffect(() => {
        if (structure.defaultValue) {
            setDataValue(structure.defaultValue);
        }
    }, [structure.defaultValue]);

    const handleChange = async (field: string, value: any) => {
        try {
            setIsFieldLoading(true);
            setDataValue(value);
            await updateFormData(field, value);
        } finally {
            setIsFieldLoading(false);
        }
    };

    if (structure.display === displayType.Image) {
        return (
            <Box sx={{ position: 'relative' }}>
                <TextField
                    key={structure.label}
                    fullWidth
                    type="file"
                    label={structure.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files?.[0];
                        if (file) {
                            handleChange(structure.label, file);
                        }
                    }}
                    {...structure.props}
                    helperText={structure.helperText}
                    error={!!hasError[current_key]?.message}
                />
                {isFieldLoading && (
                    <CircularProgress
                        size={20}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10
                        }}
                    />
                )}
            </Box>
        );
    }

    if (structure.display === displayType.InputValue) {
        return (
            <Box sx={{ position: 'relative' }}>
                <TextField
                    key={structure.label}
                    fullWidth
                    label={structure.label}
                    value={dataValue}
                    onChange={(e) => handleChange(structure.label, e.target.value)}
                    {...structure.props}
                    error={current_key in hasError ? !hasError[current_key].valid : dataValue.trim() === ""}
                    helperText={current_key in hasError ? hasError[current_key].message : structure.helperText}
                    disabled={isFieldLoading}
                />
                {isFieldLoading && (
                    <CircularProgress
                        size={20}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10
                        }}
                    />
                )}
            </Box>
        );
    }

    if (structure.display === displayType.TextValue) {
        return (
            <Box sx={{ position: 'relative' }}>
                <TextField
                    key={structure.label}
                    fullWidth
                    multiline
                    rows={4}
                    label={structure.label}
                    value={dataValue}
                    onChange={(e) => handleChange(structure.label, e.target.value)}
                    {...structure.props}
                    error={current_key in hasError ? !hasError[current_key].valid : dataValue.trim() === ""}
                    helperText={current_key in hasError ? hasError[current_key].message : structure.helperText}
                    disabled={isFieldLoading}
                />
                {isFieldLoading && (
                    <CircularProgress
                        size={20}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10
                        }}
                    />
                )}
            </Box>
        );
    }

    if (structure.display === displayType.MultiChoiceList) {
        return (
            <FormControl key={structure.label} fullWidth error={!!hasError[current_key]?.message}>
                <InputLabel>{structure.label}</InputLabel>
                <Select
                    multiple
                    value={dataValue ? dataValue.split(",") : []}
                    onChange={(e) => handleChange(structure.label, (e.target.value as string[]).join(","))}
                    label={structure.label}
                    {...structure.props}
                >
                    {structure.options?.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {structure.helperText && <FormHelperText>{structure.helperText}</FormHelperText>}
                {hasError[current_key]?.message && (
                    <FormHelperText error>{hasError[current_key].message}</FormHelperText>
                )}
            </FormControl>
        );
    }

    if (structure.display === displayType.DropDown) {
        return (
            <FormControl key={structure.label} fullWidth error={!!hasError[current_key]?.message}>
                <InputLabel>{structure.label}</InputLabel>
                <Select
                    value={dataValue}
                    onChange={(e) => handleChange(structure.label, e.target.value)}
                    label={structure.label}
                    {...structure.props}
                >
                    {structure.options?.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {structure.helperText && <FormHelperText>{structure.helperText}</FormHelperText>}
                {hasError[current_key]?.message && (
                    <FormHelperText error>{hasError[current_key].message}</FormHelperText>
                )}
            </FormControl>
        );
    }

    if (structure.display === displayType.ChoiceList) {
        return (
            <FormControl key={structure.label} fullWidth error={!!hasError[current_key]?.message}>
                <InputLabel>{structure.label}</InputLabel>
                <Select
                    value={dataValue}
                    onChange={(e) => handleChange(structure.label, e.target.value)}
                    label={structure.label}
                    {...structure.props}
                >
                    {structure.options?.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {structure.helperText && <FormHelperText>{structure.helperText}</FormHelperText>}
                {hasError[current_key]?.message && (
                    <FormHelperText error>{hasError[current_key].message}</FormHelperText>
                )}
            </FormControl>
        );
    }

    return null;
};

const DisplayFormField = ({ structure }: { structure: FormField }) => {
    return (
        <Grid item xs={12}>
            <FieldOutput structure={structure} />
        </Grid>
    )
}

const IgnFormGenerate = ({ formStructures }: { formStructures: FormField[] }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeForm = async () => {
            try {
                setIsLoading(true);
                // Simulate a small delay to prevent flash of loading screen
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load form');
            } finally {
                setIsLoading(false);
            }
        };

        initializeForm();
    }, [formStructures]);

    if (error) {
        return (
            <Box sx={{ p: 2, color: 'error.main' }}>
                <Typography variant="body1">{error}</Typography>
            </Box>
        );
    }

    if (isLoading) {
        return <LoadingScreen message="Loading form..." />;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {formStructures.map((field) => field.visibility && <FieldOutput key={field.label} structure={field} />)}
        </Box>
    );
}

export default IgnFormGenerate