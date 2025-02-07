import {ConfigInterface, ModuleInterface} from "$core/module";

export interface ModuleConnectorInterface {
    instance : ModuleInterface | null;

    connect: () => void;

    SetConfig: (config: unknown) => void;
    GetConfig: () => ConfigInterface;
    GetConfigType: () => string;

    GetTitle: () => string;
    GetInstance: () => ModuleInterface;
}