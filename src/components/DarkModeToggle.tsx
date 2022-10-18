import { useColorScheme } from "nativewind"
import { TouchableOpacity } from "react-native"
import FeatherIcons from "@expo/vector-icons/Feather"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme()

  const x = useSharedValue(0)
  const animStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${x.value * Math.PI}rad` }],
  }))

  return (
    <TouchableOpacity
      onPress={() => {
        x.value = withSpring(x.value + 1)
        toggleColorScheme()
      }}
    >
      <Animated.View style={animStyles}>
        <FeatherIcons
          name={colorScheme === "dark" ? "moon" : "sun"}
          style={{ color: colorScheme === "dark" ? "white" : "black" }}
          size={32}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

export default DarkModeToggle
