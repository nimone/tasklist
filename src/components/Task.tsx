import React from "react"
import {
  Dimensions,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native"
import useStore, { TaskItem } from "../store"
import FeatherIcons from "@expo/vector-icons/Feather"
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import clsx from "clsx"

interface IProps {
  task: TaskItem
}

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const SWIPE_LEFT_THRESHOLD = -SCREEN_WIDTH * 0.3
const SWIPE_RIGHT_THRESHOLD = SCREEN_WIDTH * 0.2

function Task({ task }: IProps) {
  const deleteTask = useStore((state) => state.deleteTask)
  const editTask = useStore((state) => state.editTask)

  const toggleComplete = () => {
    Vibration.vibrate(task.done ? 5 : [5, 10, 15])
    editTask(task.id, { done: !task.done })
  }

  const x = useSharedValue(1)
  const translateX = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX
    })
    .onEnd((e) => {
      if (translateX.value < SWIPE_LEFT_THRESHOLD) {
        runOnJS(Vibration.vibrate)(8)
        translateX.value = withTiming(-SCREEN_WIDTH)
        x.value = withTiming(0, undefined, (finished) => {
          if (finished) runOnJS(deleteTask)(task.id)
        })
      } else if (translateX.value > SWIPE_RIGHT_THRESHOLD) {
        translateX.value = withTiming(0, undefined, (finished) => {
          if (finished) runOnJS(toggleComplete)()
        })
      } else translateX.value = withTiming(0)
    })

  const animStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    marginVertical: x.value * 6,
    height: x.value * 65,
    borderWidth: x.value * 2,
    opacity: x.value,
  }))

  const rightIconStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SCREEN_WIDTH, SWIPE_LEFT_THRESHOLD, SWIPE_LEFT_THRESHOLD * 0.8, 0],
      [0, 1, 0.4, 0]
    ),
  }))
  const leftIconStyles = useAnimatedStyle(() => ({
    opacity: translateX.value / SWIPE_RIGHT_THRESHOLD,
  }))

  return (
    <View className="flex justify-center mx-4">
      <Animated.View
        style={rightIconStyles}
        className="absolute p-2 bg-red-500/10 right-4 rounded-xl"
      >
        <FeatherIcons name="trash-2" size={24} color="red" />
      </Animated.View>
      <Animated.View
        style={leftIconStyles}
        className="absolute p-2 bg-sky-500/10 left-4 rounded-xl"
      >
        {task.done ? (
          <FeatherIcons name="minus" size={24} color="rgb(14, 165, 233)" />
        ) : (
          <FeatherIcons name="check" size={24} color="rgb(14, 165, 233)" />
        )}
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={animStyles}
          className={clsx(
            "flex-row items-center rounded-2xl px-3",
            task.done
              ? "border-sky-200 dark:border-sky-700 bg-sky-100 dark:bg-sky-900"
              : "border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 "
          )}
        >
          <TouchableOpacity
            className="p-1.5 mr-4 bg-sky-500/10 rounded-xl"
            onPress={toggleComplete}
          >
            <FeatherIcons
              name="check"
              size={24}
              style={{ opacity: task.done ? 1 : 0 }}
              color="rgb(14, 165, 233)"
            />
          </TouchableOpacity>
          <Text
            className={clsx(
              "text-lg font-medium",
              task.done
                ? "text-gray-600 dark:text-gray-400"
                : "text-gray-800 dark:text-gray-100"
            )}
          >
            {task.content}
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

export default Task
