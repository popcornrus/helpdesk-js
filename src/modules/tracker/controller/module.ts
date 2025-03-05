import {ModuleBase} from "$core/module";
import {TrackerConfig} from "$trackerModule/types.ts";
import TrackerController from "$trackerModule/controller/service.ts";
import {ControllerDI} from "$src/modules";

export default class TrackerModule
    extends ModuleBase {

    actions: TrackerController;

    constructor(di: ControllerDI, config: TrackerConfig) {
        super();

        if (config === null) {
            throw new Error(`Config is required`);
        }

        this.actions = new TrackerController(di, config);
    }
}