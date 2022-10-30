declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAILER_USERNAME: string;
      MAILER_PASSWORD: string;
      MAILER_HOST: string;
      MAILER_PORT: string;
      MAILER_SECURE?: string;
    }
  }
}

// We need this `export` to augment the global scope.
export {};
