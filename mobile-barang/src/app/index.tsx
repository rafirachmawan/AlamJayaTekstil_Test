import { Redirect } from "expo-router";

export default function Index() {
  // 🔥 nanti bisa ditambah logic cek login di sini
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/list" />;
  }

  return <Redirect href="/login" />;
}
