import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest", // Usando o ts-jest para arquivos .ts
  },
};

export default config;
