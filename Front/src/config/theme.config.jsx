import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const themeConfig = {
    BG: "#12181b",
    FONT_GLOBAL: "'Roboto', sans-serif",
}

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: themeConfig.BG,
        },
    },
    typography: {
        fontFamily: themeConfig.FONT_GLOBAL,
    },
});

export const ThemeConfig = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};