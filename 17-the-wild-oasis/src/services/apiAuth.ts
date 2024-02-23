import supabase from "./supabase";

export const login = async function ({ email, password }: { email: string; password: string }) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("Error", error);
    throw new Error("Email or password is not correct");
  }

  return user;
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
