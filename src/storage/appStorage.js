import { MMKV } from "react-native-mmkv";

export const loginStorage = new MMKV({
  id: "login-store",
});
