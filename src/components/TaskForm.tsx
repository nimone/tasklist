import React, { useState } from "react"
import { KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native"
import FeatherIcons from "@expo/vector-icons/Feather"
import useStore from "../store"
import clsx from "clsx"

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
          "flex-1 mr-4 px-6 rounded-full",
          "text-lg border-2 border-gray-200",
          focused && "border-gray-600"
        )}
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      />
      <TouchableOpacity
        className={clsx(
          "p-3 rounded-full",
          newTask.length ? "bg-gray-800" : "bg-gray-600"
        )}
        onPress={handleSubmit}
      >
        <FeatherIcons name="plus" size={32} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default TaskForm
