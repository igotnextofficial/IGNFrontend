import React, { useState } from 'react';
import IgnRequest from '../http/Request';
import FormGroup from '@mui/material/FormGroup';
import { FormControlLabel, TextField, Checkbox, Button } from '@mui/material';

const CreatePageForm = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [display, setDisplay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = {
      title,
      slug,
      description,
      display,
    };

    let config = {
      url: `${window.location.protocol}//${window.location.hostname}:8000/api`, // update this should get from env file
      method: 'POST',
      data: form_data,
      headers: '', // should send token
    };
    config.data = form_data;

    const ign_request = new IgnRequest();
    let update = ign_request.init(config);
    update.then((res) => {
      // console.dir(res);
      // console.dir(ign_request.responseData);
    });
  };

  const sluggify = (data) => {
    return data.replace(/\s+/g, ' ').trim().replaceAll(' ', '-');
  };

  const updateTitleAndSlug = (e) => {
    setTitle(e.target.value);
    setSlug(sluggify(e.target.value));
  };

  const updateDisplay = (e) => {
    setDisplay(e.target.checked);
    (`should i display: ${e.target.checked}`);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          id="title"
          label="Page Title"
          variant="outlined"
          onChange={updateTitleAndSlug}
          className="input-field"
          value={title}
        />
        <TextField
          id="slug"
          label="Page Slug"
          variant="outlined"
          value={slug}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id="description"
          label="Description"
          multiline
          maxRows={4}
          variant="standard"
          className="input-field"
          onChange={updateDescription}
          value={description}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Make Page Visible"
          onClick={updateDisplay}
          value={display}
        />
        <Button variant="outlined" type="submit">
          Create Page
        </Button>
      </FormGroup>
    </form>
  );
};

export default CreatePageForm;
