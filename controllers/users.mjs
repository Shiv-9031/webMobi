import sql from "../database.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
  try {
    //check table exist or not
    await sql`create table if not exists register(id serial primary key,name text not null,email text not null ,password text not null,isadmin boolean default false,avatar text default 'update profile pic')`;

    //validation for email
    const isEmail =
      await sql`select  email from register where email=${req.body.email} `;

    if (isEmail.length != 0) {
      return res.status(200).json({
        success: false,
        message: "user already existed",
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const columns = ["name", "email", "password"];
    const newUser = await sql`insert into register ${sql(
      { ...req.body, password: hashPassword },
      columns
    )} returning *`;

    return res.status(200).json({
      success: true,
      message: "user created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    //check user exist or not
    const isUser =
      await sql`select * from register where email=${req.body.email}`;

    if (isUser.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Either email or password is wrong",
      });
    }

    //check is password correct or not
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      isUser[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(200).json({
        success: false,
        message: "Either email or password is wrong",
      });
    }

    //generate token
    const token = jwt.sign({ id: isUser[0].id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: `welcome ${isUser[0].name}`,
      user: isUser[0],
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "internal server error",
      error,
    });
  }
};

export const profile = async (req, res) => {
  try {
    //check user exist or not
    const isUser = await sql`select * from register where id=${req.body.id}`;

    return res.status(200).json({
      success: true,

      user: isUser[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "internal server error",
      error,
    });
  }
};
