import React, { useState } from "react"
import { KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native"
import FeatherIcons from "@expo/vector-icons/Feather"
import useStore from "../store"
import clsx from "clsx"
import { useColorScheme } from "nativewind"

interface IProps {
  defaultValue?: string
}

function TaskForm({ defaultValue = "" }: IProps) {
  const addTask = useStore((state) => state.addTask)
  const [newTask, setNewTask] = useState(defaultValue)
  const [focused, setFocused] = useState(false)

  const handleSubmit = () => {
    if (newTask === "") return
    addTask(newTask)
    setNewTask("")
  }

  return (
    <KeyboardAvoidingView className="flex-row p-4">
      <TextInput
        className={clsx(
          "flex-1 mr-4 px-6 rounded-full bg-gray-100 dark:bg-gray-600 dark:text-gray-200",
          "text-lg border-2",
          focused ? "border-gray-500" : "border-gray-200 dark:border-gray-600"
        )}
        placeholder="New Task"
        placeholderTextColor="gray"
        value={newTask}
        onChangeText={setNewTask}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      />
      <TouchableOpacity
        className={clsx(
          "p-3 rounded-full bg-gray-700",
          !newTask.length && "opacity-60"
        )}
        onPress={handleSubmit}
        disabled={!newTask.length}
      >
        <FeatherIcons name="plus" size={32} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default TaskForm
