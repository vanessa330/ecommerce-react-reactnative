import { useNavigate } from "react-router-dom";
import { useCategories } from "../Hooks/useCategories";
import { useBrands } from "../Hooks/useBrands";
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";

const NavbarCategory = ({ handleMobileMenuToggle }) => {
  const navigate = useNavigate();

  const categories = useCategories();
  const brands = useBrands();

  // CSS
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-start",
        alignItems: "center",
        flexDirection: isDesktop ? "row" : "column",
        padding: "0.5rem 4rem",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Select
        labelId="brand-select-label"
        id="brand-select"
        value={""}
        onChange={(e) => e.target.value}
        displayEmpty
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          margin: "0.5rem",
          bgcolor: "background.paper",
          "&:focus": {
            bgcolor: "background.paper",
          },
        }}
      >
        <MenuItem value="" onClick={() => navigate(`/products`)}>
          ALL
        </MenuItem>
        {brands.map((b) => (
          <MenuItem
            key={b.id}
            value={b.id}
            onClick={() => {
              navigate(`/products/${b.name}`);
              if (!isDesktop) {
                handleMobileMenuToggle();
              }
            }}
          >
            {b.name}
          </MenuItem>
        ))}
      </Select>

      {categories.map((c) => (
        <Typography
          key={c.id}
          p="1rem"
          sx={{
            "&:hover": {
              color: theme.palette.primary.main,
              cursor: "pointer",
            },
          }}
          onClick={() => {
            navigate(`/products/${c.name}`);
            if (!isDesktop) {
              handleMobileMenuToggle();
            }
          }}
        >
          {c.name}
        </Typography>
      ))}
    </Box>
  );
};

export default NavbarCategory;
