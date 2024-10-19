// src/components/FeedbackForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete, Chip } from '@mui/material';

const FeedbackForm = ({ onFeedbackSubmit, availableCakes }) => {
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [selectedCakes, setSelectedCakes] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && feedback) {
            onFeedbackSubmit({ name, feedback, selectedCakes });
            setName('');
            setFeedback('');
            setSelectedCakes([]);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '600px',
                margin: 'auto',
                backgroundColor: '#f9f9f9',
                padding: 3,
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            <TextField
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Your Feedback"
                variant="outlined"
                multiline
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
            />
            <Autocomplete
                multiple
                options={availableCakes}
                getOptionLabel={(option) => option}
                value={selectedCakes}
                onChange={(e, newValue) => setSelectedCakes(newValue)}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Tag Loại Bánh"
                        placeholder="Chọn loại bánh"
                    />
                )}
            />
            <Button variant="contained" color="primary" type="submit">
                Submit Feedback
            </Button>
        </Box>
    );
};

export default FeedbackForm;
