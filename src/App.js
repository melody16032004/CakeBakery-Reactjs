
import Shop from "./Account/Shop";
import Dashboard from "./components/Dashboard";
import NavigateLogin from "./components/navigate-login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Products from "./components/Product";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ListProduct";
import CreateCategory from "./components/CreateCategory";
import AdminDashboard from "./Account/AdminDashboard";
import Home from "./Account/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FF5722',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

const App = () => {
  return (
    // <Shop />
    <Home />
    // <NavigateLogin />
    // <ThemeProvider theme={theme}>
    //   <AdminDashboard />
    // </ThemeProvider>
  );
};

export default App;
