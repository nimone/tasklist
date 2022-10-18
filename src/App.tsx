import { StatusBar } from "expo-status-bar"
import { useEffect, useRef } from "react"
import { SafeAreaView, Text, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, { SlideInLeft } from "react-native-reanimated"
import DarkModeToggle from "./components/DarkModeToggle"
import Task from "./components/Task"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import useStore from "./store"

export default function App() {
  const tasks = useStore((state) => state.tasks)
  const initial = useRef<boolean>(true)

  useEffect(() => {
    initial.current = false
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800">
        <StatusBar style="auto" />
        <View className="flex-row justify-between m-6 mt-16">
          <Text className="text-5xl font-bold text-gray-800 dark:text-gray-200">
            Your Tasks
          </Text>
          <DarkModeToggle />
        </View>
        {tasks.length ? (
          <TaskList>
            {tasks.map((task, i) => {
              const animate = SlideInLeft.springify().stiffness(65).damping(11)
              return (
                <Animated.View
                  key={task.id}
                  entering={initial.current ? animate.delay(50 * i) : animate}
                >
                  <Task task={task} />
                </Animated.View>
              )
            })}
          </TaskList>
        ) : (
          <View className="items-center justify-center flex-1">
            <Text className="text-2xl font-light text-gray-400">
              You are all caught up!
            </Text>
          </View>
        )}
        <TaskForm />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
