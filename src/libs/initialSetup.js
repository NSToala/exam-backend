import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";


export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
        new Role({ name: "administrador" }).save(),
        new Role({ name: "usuario" }).save(),
    ]);

  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["administrador"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
  }
};

export const createUser = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "user@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["usuario"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      email: "user@localhost",
      password: await bcrypt.hash("user", 10),
      roles: roles.map((role) => role._id),
    });
  }
};
