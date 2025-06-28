import pool from "../../shared/database/client";
import { User } from "./auth.model";

export class AuthRepository {
  public async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT id, email, password, created_at, updated_at FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  }

  public async createUser(email: string, hashedPassword: string): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) 
       RETURNING id, email, password, created_at, updated_at`,
      [email, hashedPassword]
    );
    return result.rows[0];
  }
}
