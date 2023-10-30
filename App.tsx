import Routes from "@/routes/index.routes";
import theme from "@/theme/theme";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar translucent barStyle='light-content' />
        <Routes />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

