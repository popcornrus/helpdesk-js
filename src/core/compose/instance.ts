import {ConfigInterface, ModuleConnectorInterface, ModuleInterface} from "$core/module";
import {ControllerDI} from "$src/modules";
import {ComposeModulesInterface} from "$core/compose/interface.ts";

export default class Compose {
    modules: Modules;

    constructor() {
        this.modules = new Modules();
    }

    Modules(): Modules {
        return this.modules;
    }
}

class Modules implements ComposeModulesInterface {
    #instances: Map<string, ModuleInterface> = new Map<string, ModuleInterface>();
    readonly #di: ControllerDI;

    constructor() {
        this.#di = new ControllerDI();
    }

    Connect(
        moduleConnector: ModuleConnectorInterface,
        config: ConfigInterface,
    ): void {
        const moduleTitle = moduleConnector.GetTitle();

        if (this.#instances.has(moduleTitle)) {
            throw new Error(`Module ${moduleTitle} already exists`);
        }

        moduleConnector.Connect(this.#di, config);

        const moduleInstance = moduleConnector.GetInstance();

        this.#di.SetModule(moduleTitle, moduleInstance);
        this.#instances.set(moduleTitle, moduleInstance);
    }

    Exists(module: string): boolean {
        return this.#instances.has(module);
    }

    Get(module: string): ModuleInterface {
        const instance = this.#instances.get(module);
        if (!instance) {
            throw new Error(`Module ${module} not found`);
        }
        return instance;
    }
}