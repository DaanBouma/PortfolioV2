"use server"
import { prisma } from "@/lib/prisma"

export async function saveRecording(frames: any) {
  if (!frames.length) return

  const songId = frames[0].songId

  await prisma.recordedFrame.createMany({
    // @ts-expect-error
    data: frames.map(f => ({
      time: f.time,
      frequency: f.frequency,
      songId: f.songId,
    })),
  })

  await prisma.song.update({
    where: { id: songId },
    data: { hasRecording: true },
  })
}
