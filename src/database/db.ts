// Importar modulos
import mongoose from 'mongoose';

// Configuración para conectarse a mongo
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }   
};

export default connectDB;