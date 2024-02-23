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
