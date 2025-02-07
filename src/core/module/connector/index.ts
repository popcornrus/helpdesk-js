import {ModuleConnectorInterface, ModuleInterface} from "$core/module";
import {ConfigInterface} from "$core/module/config";

export default class ModuleConnector implements ModuleConnectorInterface {
    config: ConfigInterface | null = null;
    instance: ModuleInterface;

    SetConfig(config: ConfigInterface) {
        this.config = config;
    }

    GetConfig(): ConfigInterface {
        return this.config;
    }

    connect() {
        throw new Error("Method not implemented.");
    }

    GetConfigType(): string {
        throw new Error("Method not implemented.");
    }

    GetTitle(): string {
        throw new Error("Method not implemented.");
    }

    GetInstance(): ModuleInterface {
        return this.instance;
    }
}