// components
import Page from "../components/Page";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { InputBase, Container, Card, CardMedia, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { fetchImages } from "../actions";

// ----------------------------------------------------------------------

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#9C9C9C", 0.15),
  "&:hover": {
    backgroundColor: alpha("#9C9C9C", 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Problem2() {
  const { images } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const [term, setTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchImages(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  console.log(images, "from component");

  return (
    <Page title="Problem 2">
      <RootStyle>
        <Container>
          <Search sx={{  mb: 5 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ width: "100%" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setTerm(e.target.value)}
            />
          </Search>

          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                  xl: "repeat(5, 1fr)",
                },
              }}
            >
              {images.map((el) => {
                return (
                  <Card sx={{ height: 194, width: '100%' }}>
                    <CardMedia
                      component="img"
                      height="194"
                      
                      image={el.url}
                      alt={el.alt}
                    />
                  </Card>
                );
              })}
            </Box>
          </Card>
        </Container>
      </RootStyle>
    </Page>
  );
}
