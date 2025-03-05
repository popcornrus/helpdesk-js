import {ConfigInterface, ModuleConnectorInterface, ModuleInterface} from "$core/module";

export class ModuleBaseConnector
    implements ModuleConnectorInterface {
    instance : ModuleInterface | null;

    GetConfigType(): string {
        throw new Error("Method not implemented.");
    }

    GetTitle(): string {
        throw new Error("Method not implemented.");
    }

    GetInstance(): ModuleInterface {
        throw new Error("Method not implemented.");
    }

    Connect(di: any, config: ConfigInterface): void {
        throw new Error("Method not implemented.");
    }
}