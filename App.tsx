import Routes from "@/routes/index.routes";
import theme from "@/theme/theme";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular, Roboto_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

