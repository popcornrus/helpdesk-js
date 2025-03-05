import {ConfigInterface, ModuleInterface} from "$core/module";
import {ControllerDI} from "$src/modules";

export interface ModuleConnectorInterface {
    instance : ModuleInterface | null;

    Connect: (di: ControllerDI, config: ConfigInterface) => void;

    GetTitle: () => string;
    GetInstance: () => ModuleInterface;

    GetConfigType: () => string;
}