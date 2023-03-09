import sha1 from "js-sha1";

export default function hashPassword(password: string) {
  const salt = password.substring(0, password.length / 2);
  return sha1(sha1(password) + salt);
}
