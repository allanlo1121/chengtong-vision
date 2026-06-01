import {
  generateRandomPassword,
  generateSalt,
  sha256WithSalt,
} from "@/lib/shared/security/password";

export function generateMqttInitialPassword() {
  return generateRandomPassword(12);
}

export function hashMqttPassword(password: string) {
  const salt = generateSalt();

  return {
    salt,
    passwordHash: sha256WithSalt(password, salt),
  };
}
