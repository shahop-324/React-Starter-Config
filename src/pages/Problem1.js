// @mui
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  TextField,
  Stack,
  Button,
} from "@mui/material";

import * as Yup from "yup";
import { useFormik } from "formik";

// components
import Page from "../components/Page";
import { TwitterPicker } from "react-color";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// sections

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  
  input1: (props) => ({
    color: props[0].color,
    fontWeight: props[0].bold ? "700" : "400",
    fontStyle: props[0].italic ? "italic" : "normal",
    fontSize: props[0].fontSize,
    textDecoration: props[0].underline ? "underline" : "none",
  }),
  input2: (props) => ({
    color: props[1].color,
    fontWeight: props[1].bold ? "700" : "400",
    fontStyle: props[1].italic ? "italic" : "normal",
    fontSize: props[1].fontSize,
    textDecoration: props[1].underline ? "underline" : "none",
  }),
  input3: (props) => ({
    color: props[2].color,
    fontWeight: props[2].bold ? "700" : "400",
    fontStyle: props[2].italic ? "italic" : "normal",
    fontSize: props[2].fontSize,
    textDecoration: props[2].underline ? "underline" : "none",
  }),
  input4: (props) => ({
    color: props[3].color,
    fontWeight: props[3].bold ? "700" : "400",
    fontStyle: props[3].italic ? "italic" : "normal",
    fontSize: props[3].fontSize,
    textDecoration: props[3].underline ? "underline" : "none",
  }),
}));

const RootStyle = styled("div")(({ theme }) => ({
  minHeight: "100%",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  const values = [
    "He's not the sharpest knife in the drawer.",
    "The Big Building was Blazing with Lights",
    "Now you must answer some big questions",
    "Get your act together",
  ];

  const generatedRows = values.map((el) => ({
    index: uuidv4(),
    bold: false,
    italic: false,
    underline: false,
    fontSize: 12,
    color: "#A94723",
    value: el,
  }));

  const formik = useFormik({
    initialValues: {
      storeName: "",
      state: "",
      city: "",
      address: "",
      pincode: "",
      landmark: "",
      phone: "",
      gstin: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      storeName: Yup.string().required("Store Name is required"),
      address: Yup.string().required("Address is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      phone: Yup.string().required("Phone number is required"),

      landmark: Yup.string().required("Landmark is required"),
      pincode: Yup.string().required("Pincode is required"),
      gstin: Yup.string(),
    }),
    onSubmit: async (values) => {
      // Dispatch action to send data to API
    },
  });

  const [rows, setRows] = useState([]);
  const [props, setProps] = useState(
    values.map((el) => ({
      bold: false,
      italic: false,
      underline: false,
      fontSize: 12,
      color: "#A94723",
    }))
  );

  useEffect(() => {
    setProps(generatedRows);
    setRows(generatedRows);
  }, []);

  const updateRow = (index, values) => {
    console.log(index, values);
    const newRows = rows.map((e, ind) => (ind !== index ? e : values));

    console.log(newRows);

    setRows(newRows);
    setProps(newRows);
  };

  const classes = useStyles(props);

  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            React Form
          </Typography>
          <Typography align="center" sx={{ color: "text.secondary" }}>
            Click on Buttons to See Effect
          </Typography>

          <Box sx={{ my: 5 }}>{/* {} */}</Box>

          <form onSubmit={formik.handleSubmit}>
            <Grid className="px-4 pt-3" container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "grid",
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                      },
                    }}
                  >
                    {rows.map((e, index) => (
                      <>
                        <Box
                          sx={{
                            display: "grid",
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: {
                              xs: "repeat(1, 1fr)",
                              sm: "repeat(2, 1fr)",
                              md: "repeat(2, 1fr)",
                              lg: "repeat(3, 1fr)",
                              xl: "repeat(4, 1fr)",
                            },
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              updateRow(index, {
                                ...e,
                                bold: !e.bold,
                              });
                            }}
                          >
                            {" "}
                            Bold{" "}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              updateRow(index, {
                                ...e,
                                italic: !e.italic,
                              });
                            }}
                          >
                            {" "}
                            Italic{" "}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              updateRow(index, {
                                ...e,
                                underline: !e.underline,
                              });
                            }}
                          >
                            {" "}
                            Underline{" "}
                          </Button>

                          <TextField
                            type="number"
                            value={e.fontSize}
                            onChange={(event) => {
                              // Update e with new value
                              console.log(event.target.value);
                              updateRow(index, {
                                ...e,
                                fontSize:
                                  event.target.value !== undefined
                                    ? event.target.value * 1
                                    : 15,
                              });
                            }}
                            label="Font Size"
                            variant="outlined"
                            name="fontSize"
                          />

                          <TwitterPicker
                            width="100"
                            colors={["#538Bf7", "#53F165", "#F1C453"]}
                            color={e.color}
                            onChangeComplete={(color) => {
                              // Update e with new value
                              updateRow(index, {
                                ...e,
                                color: color.hex,
                              });
                              // setColor(color.hex);
                            }}
                          />
                        </Box>
                        <TextField
                          InputProps={{
                            className:
                              index === 0
                                ? classes.input1
                                : index === 1
                                ? classes.input2
                                : index === 2
                                ? classes.input3
                                : classes.input4,
                          }}
                          value={e.value}
                          onChange={(value) => {
                            // Update e with new value
                          }}
                          fullWidth
                          label={`${`Field ${index + 1}`}`}
                          variant="outlined"
                        />
                      </>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Container>
      </RootStyle>
    </Page>
  );
}
