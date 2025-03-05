import {ModuleConnectorInterface, ModuleControllerInterface} from "$core/module";

export interface ComposeModulesInterface {
    Connect: (module: ModuleConnectorInterface, config: unknown) => void;
    Exists: (module: string) => boolean;
    Get: (module: string) => ModuleControllerInterface;
}

