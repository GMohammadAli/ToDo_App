import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [ category, setCategory] = useState('todos')

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    } 
  };

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
        sx={{ m: 1 }}
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          sx={{ m: 1 }}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
          sx={{ m: 1 }}
        />

        <FormControl className={classes.field} sx={{ m: 1 }}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          sx={{ display: "flex" , m: 1 }}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
