import React from "react"
import { ScrollView } from "react-native-gesture-handler"

interface IProps {
  children: React.ReactNode
}

function TaskList({ children }: IProps) {
  return (
    <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  )
}

export default TaskList
