import { Redis } from 'ioredis'
import { Queue, RedisConnection, Worker } from 'bullmq'
import { PrismaClient } from '@prisma/client'

const RedisOption = {
  host: '127.0.0.1',
  port: 6378,
  password: '',
  maxRetriesPerRequest: null
}

const db = new PrismaClient()

interface MoveData {
  from: string
  to: string
}

interface JobData {
  data: {
    movesData: MoveData
    gameId: string
    ChessId: string
    player1: string
    player2: string
  }
  headers: {
    'Content-Type': string
  }
}

const myQueue = new Queue('chessQueue', {
  connection: RedisOption
})

const myWorker = new Worker('chessQueue', async (job) => {
  console.log('Worker processing job:', job.id)
  
  const jobData = job.data as JobData
  const { movesData, gameId, ChessId, player1, player2 } = jobData.data
  
  if (!ChessId || !gameId || !player1 || !player2 || !movesData) {
    throw new Error('Missing required data fields')
  }

  try {
    let chessExist = await db.chess.findUnique({
      where: { chessId: ChessId }
    })

    if (!chessExist) {
      console.log(`Creating new chess instance with ID: ${ChessId}`)
      chessExist = await db.chess.create({
        data: {
          chessId: ChessId,
          createdAt: new Date()
        }
      })
    }

    const gameExist = await db.game.findUnique({
      where: { gameId: gameId }
    })

    const moveStr = JSON.stringify(movesData)

    if (gameExist) {
      console.log(`Updating game with ID: ${gameId}`)
      await db.game.update({
        where: { gameId },
        data: {
          moves: [...gameExist.moves, moveStr]
        }
      })
    } else {
      console.log(`Creating new game with ID: ${gameId}`)
      await db.game.create({
        data: {
          gameId,
          player1,
          player2,
          moves: [moveStr],
          createdAt: new Date(),
          chessId: chessExist.id // Use the Chess model's id, not chessId
        }
      })
    }

    console.log('Job processed successfully')
  } catch (err) {
    console.error('Error processing job:', err)
    throw err // Re-throw to mark job as failed
  }
}, { connection: RedisOption })

async function addJobs(data: JobData) {
  if (!data?.data?.ChessId || !data?.data?.gameId) {
    throw new Error('Invalid job data')
  }

  const job = await myQueue.add('myChessQueue', data)
  console.log(`Job added with ID: ${job.id}`)
  return job
}

export default addJobs

myWorker.on('completed', job => {
  console.log(`${job.id} completed`)
})

myWorker.on('failed', (job, err) => {
  console.log(`${job?.id} failed: ${err.message}`)
})