import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import User from './models/User.js'

async function updateIndexes() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    await User.collection.dropIndex('name_1')
    console.log('Index `name_1` supprimé')
  } catch {
    console.log('Index `name_1` introuvable, rien à supprimer')
  }

  await User.collection.createIndex(
    { email: 1 },
    { unique: true }
  )
  console.log('Index unique sur `email` créé')

  process.exit(0)
}

updateIndexes()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
