import {ModuleInterface} from "$core/module";

export class ControllerDI {
    #modules: Map<string, ModuleInterface> = new Map();

    SetModule(key: string, module: ModuleInterface): void {
        this.#modules.set(key, module);
    }

    GetModule<T>(key: string): T {
        return this.#modules.get(key) as T;
    }
}