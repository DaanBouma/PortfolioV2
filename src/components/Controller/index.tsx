import { useEffect, useState, useRef } from "react"
import styles from "./styles.module.css"
import getClassNameFactory from "@/lib/get-class-name-factory"
const getClassName = getClassNameFactory("Controller", styles)
import { ArrowUp, ArrowDown, Circle } from "lucide-react"

export const Controller = ({
  currentSong,
  currentSecond,
  onSave,
}: {
  currentSong: { id: number }
  currentSecond: number
  onSave: (frames: { time: number; frequency: number; songId: number }[]) => void
}) => {
  const [active, setActive] = useState<"up" | "down" | null>(null)
  const [recording, setRecording] = useState(false)
  const frames = useRef<{ time: number; frequency: number; songId: number }[]>([])

  const addFrame = (direction: "up" | "down") => {
    if (!recording) return

    const freq = direction === "up" ? 440 : 220
    frames.current.push({
      time: currentSecond,
      frequency: freq,
      songId: currentSong.id,
    })
  }

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "W") {
        setActive("up")
        addFrame("up")
      }
      if (e.key === "s" || e.key === "S") {
        setActive("down")
        addFrame("down")
      }
    }

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "W") setActive(null)
      if (e.key === "s" || e.key === "S") setActive(null)
    }

    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, [recording, currentSecond, currentSong])

  const saveRecording = () => {
    onSave(frames.current)
    frames.current = []
    setRecording(false)
  }

  return (
    <div className={getClassName()}>
      <button
        className={getClassName("button")}
        onClick={() => setRecording(!recording)}
        style={{ backgroundColor: recording ? "red" : "" }}
      >
        <Circle />
      </button>

      <button
        className={getClassName("button")}
        style={{ backgroundColor: active === "up" ? "green" : "" }}
      >
        <ArrowUp />
      </button>

      <button
        className={getClassName("button")}
        style={{ backgroundColor: active === "down" ? "green" : "" }}
      >
        <ArrowDown />
      </button>

      {recording && (
        <button className={getClassName("button")} onClick={saveRecording}>
          Save
        </button>
      )}
    </div>
  )
}
