import { RootParamsList } from "@/routes/type.routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";



type Nav = NavigationProp<RootParamsList>
export const useAppNavigation = () => useNavigation<Nav>()