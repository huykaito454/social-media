import bcryptjs from "bcryptjs";
let hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcryptjs.genSaltSync(saltRounds);
  const passwordHashed = await bcryptjs.hashSync(password, salt);
  return passwordHashed;
};
let comparePassword = async (password, hashPassword) => {
  return await bcryptjs.compareSync(password, hashPassword);
};
export { hashPassword, comparePassword };
