-- CreateTable
CREATE TABLE "Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spotifyId" TEXT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "duration" REAL NOT NULL,
    "bitrate" INTEGER,
    "sampleRate" INTEGER,
    "codec" TEXT,
    "bpm" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasRecording" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "PitchFrame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" REAL NOT NULL,
    "frequency" REAL NOT NULL,
    "songId" INTEGER NOT NULL,
    CONSTRAINT "PitchFrame_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecordedFrame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" REAL NOT NULL,
    "frequency" REAL NOT NULL,
    "songId" INTEGER NOT NULL,
    CONSTRAINT "RecordedFrame_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_spotifyId_key" ON "Song"("spotifyId");
