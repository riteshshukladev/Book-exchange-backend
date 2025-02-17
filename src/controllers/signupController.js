import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../config/database.js";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";
import bcrypt from "bcrypt";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../services/auth.js";

dotenv.config();

const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await db
      .insert(users)
      .values({
        email,
        name: username,
        passwordHash,
      })
      .returning();

    const payload = {
      email: email,
      name: username,
    };

    const accessToken = accessTokenGenerator(payload);
    const refreshToken = refreshTokenGenerator(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "signing-up Success",
      status: 200,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "There was an error while signinig up in",
    });
  }
};

export default signupController;
