import {ModuleConnectorInterface, ModuleInterface} from "$core/module";

export default class Compose {
    modules: Modules = new Modules();

    get Modules(): Modules {
        return this.modules;
    }
}

class Modules {
    #instances: Map<string, ModuleInterface> = new Map<string, ModuleInterface>();

    Connect(
        module: ModuleConnectorInterface,
        config: unknown,
    ): void {
        module.SetConfig(config)
        module.connect();

        this.#instances.set(module.GetTitle(), module.GetInstance());
    }

    Exists(module: string): boolean {
        return this.#instances.has(module);
    }

    Get(module: string): ModuleInterface {
        return this.#instances.get(module);
    }
}