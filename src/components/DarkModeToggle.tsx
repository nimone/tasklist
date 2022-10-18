import { useColorScheme } from "nativewind"
import { TouchableOpacity } from "react-native"
import FeatherIcons from "@expo/vector-icons/Feather"

interface IProps {}

function DarkModeToggle({}: IProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  return (
    <TouchableOpacity onPress={toggleColorScheme}>
      <FeatherIcons
        name={colorScheme === "dark" ? "moon" : "sun"}
        style={{ color: colorScheme === "dark" ? "white" : "black" }}
        size={32}
      />
    </TouchableOpacity>
  )
}

export default DarkModeToggle
