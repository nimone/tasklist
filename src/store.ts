import AsyncStorage from "@react-native-async-storage/async-storage"
import create from "zustand"
import { persist } from "zustand/middleware"

export type TaskItem = {
  id: string
  done: boolean
  content: string
}

interface IStoreState {
  tasks: TaskItem[]
}
interface IStoreMutations {
  addTask: (content: string) => void
  editTask: (id: string, changes: Partial<TaskItem>) => void
  deleteTask: (id: string) => void
}

const useStore = create<IStoreState & IStoreMutations>()(
  persist(
    (set) => ({
      tasks: [
        { id: "0", done: false, content: "task 1" },
        { id: "1", done: true, content: "task 2" },
        { id: "2", done: false, content: "task 3" },
      ],

      addTask: (content: string) => {
        const id = Date.now().toString()
        set(({ tasks }) => ({
          tasks: [...tasks, { id, done: false, content }],
        }))
      },
      editTask: (id: string, changes: Partial<TaskItem>) =>
        set(({ tasks }) => ({
          tasks: tasks.map((task) =>
            task.id === id ? { ...task, ...changes } : task
          ),
        })),

      deleteTask: (id: string) =>
        set(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== id) })),
    }),
    { name: "app-store", getStorage: () => AsyncStorage }
  )
)

export default useStore
