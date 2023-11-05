import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../store/rootReducer";
import {
  useTheme,
  useMediaQuery,
  Box,
  IconButton,
  InputBase,
  Typography,
  Badge,
  Avatar,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  ShoppingCart,
  FavoriteRounded,
  Person,
} from "@mui/icons-material";
import FlexBetween from "./UI/FlexBetween";
import NavbarCategory from "./NavbarCategory";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector((state) => state.token);
  const customerName = useSelector((state) => state.userName);
  const cartQty = useSelector((state) => state.cartQty);

  const handleSearch = () => {
    navigate(`/products/${searchQuery}`);
    setSearchQuery("");
    setIsSearchToggled(false);
  };

  // CSS
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const styles = {
    icon: {
      color: theme.palette.neutral.dark,
      fontSize: "25px",
    },
  };

  return (
    <Box>
      {/* Mobile toggle bar START */}
      <Box display={isDesktop ? "none" : undefined}>
        {!isDesktop && isMobileMenuToggled && (
          <Box
            position="fixed"
            zIndex="10"
            left="0"
            right="0"
            top="0"
            bottom="0"
            backgroundColor={theme.palette.background.alt}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>
            <NavbarCategory
              handleMobileMenuToggle={() => {
                setIsMobileMenuToggled(!isMobileMenuToggled);
              }}
            />
          </Box>
        )}
      </Box>
      {/* Mobile toggle bar END */}

      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: theme.palette.background.alt,
        }}
        padding={isDesktop ? "1rem 2rem 0rem" : "1rem 0.5rem"}
      >
        {!isDesktop && (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu style={styles.icon} />
          </IconButton>
        )}

        {/* Desktop START */}
        <Typography
          onClick={() => navigate("/")}
          fontWeight="bold"
          fontSize="1.75rem"
          color={theme.palette.primary.main}
          sx={{
            "&:hover": {
              color: theme.palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          LOGO
        </Typography>

        {isDesktop ? (
          <FlexBetween
            backgroundColor={theme.palette.neutral.light}
            borderRadius="9px"
            gap="2rem"
            padding="0.5rem 2rem"
            width="20rem"
          >
            <InputBase
              placeholder="Searching..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <IconButton onClick={handleSearch}>
              <Search style={styles.icon} />
            </IconButton>
          </FlexBetween>
        ) : (
          <>
            <Search
              style={styles.icon}
              onClick={() => setIsSearchToggled(!isSearchToggled)}
            />
          </>
        )}
        <IconButton onClick={() => navigate(token == null ? "/auth" : "/user")}>
          <Person style={styles.icon} />
          {isDesktop && (
            <Typography p="0.5rem">
              {token == null ? "Login" : customerName}
            </Typography>
          )}
        </IconButton>

        {isDesktop && (
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <>
                <LightMode style={styles.icon} />
                <Typography p="0.5rem">Light</Typography>
              </>
            ) : (
              <>
                <DarkMode style={styles.icon} />
                <Typography p="0.5rem">Dark</Typography>
              </>
            )}
          </IconButton>
        )}

        {isDesktop && (
          <IconButton onClick={() => navigate(`/wishlist`)}>
            <FavoriteRounded style={styles.icon} />
            <Typography p="0.5rem">Wishlist</Typography>
          </IconButton>
        )}

        <IconButton onClick={() => navigate(`/cart`)}>
          <ShoppingCart style={styles.icon} />
          {
            // eslint-disable-next-line
            cartQty != "0" && (
              <Avatar
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  width: "20px",
                  height: "20px",
                  margin: "3px -8px 25px",
                  zIndex: "5",
                  position: "relative",
                }}
              >
                <Badge
                  sx={{ color: theme.palette.primary.contrastText }}
                  badgeContent={cartQty}
                />
              </Avatar>
            )
          }
          {isDesktop && <Typography p="0.5rem">Cart</Typography>}
        </IconButton>
      </Box>
      {isDesktop && <NavbarCategory />}
      {/* Desktop END */}

      {isSearchToggled && (
        <FlexBetween
          backgroundColor={theme.palette.neutral.light}
          borderRadius="9px"
          gap="2rem"
          padding="0.5rem 2rem"
          margin="1rem"
        >
          <InputBase
            placeholder="Searching..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <IconButton onClick={handleSearch}>
            <Search style={styles.icon} />
          </IconButton>
        </FlexBetween>
      )}
    </Box>
  );
};

export default Navbar;
