import { SUPABASE_URL } from "~/configs/supabase";
import supabase from "./supabase";

export const signup = async function ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.log("Error", error);
    throw new Error(error.message);
  }

  return data;
};

export const login = async function ({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("Error", error);
    throw new Error("Email or password is not correct");
  }

  return data;
};

export const logout = async function () {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const getCurrentUser = async function () {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
};

export const updateProfile = async function ({
  fullName,
  avatar,
  password,
}: {
  fullName?: string;
  avatar?: File;
  password?: string;
}) {
  // console.log(avatar);
  let updateUserData = {};
  if (password) updateUserData = { password };
  if (fullName)
    updateUserData = {
      data: {
        fullName,
      },
    };
  //1 update fullName of Image
  const { error, data: updatedUser1 } = await supabase.auth.updateUser(updateUserData);

  if (error) throw new Error(error.message);

  if (!avatar) return updatedUser1;

  //2 upload avatar image
  const fileName = `avatar-${updatedUser1.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar!);

  if (storageError) throw new Error(storageError.message);

  const filePath = `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;

  //3 update user with avatar
  const { error: error2, data: updatedUser2 } = await supabase.auth.updateUser({
    data: {
      avatar: filePath,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser2;
};
