import dotenv from "dotenv";
import pool from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected Successfully");

    connection.release();

    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("MySQL Connection Failed:", error);
  }
};

startServer();
  