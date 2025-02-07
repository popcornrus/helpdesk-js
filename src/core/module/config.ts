export class ConfigError {
    message: string;
    type: string;
    value: unknown;

    constructor(message: string, value: unknown) {
        this.message = message;
        this.value = value;
    }
}

export interface ConfigInterface {
    validate: (params: any) => ConfigError|null;
}