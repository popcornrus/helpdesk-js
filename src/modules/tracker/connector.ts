import {ConfigInterface, ModuleBase} from "$core/module";
import TrackerModule from "$trackerModule/controller/module";
import {TrackerConfig} from "$trackerModule/types";
import {ModuleBaseConnector} from "$core/module/connector";
import {ControllerDI} from "$src/modules";

export default class TrackerConnector
    extends ModuleBaseConnector {
    config: TrackerConfig | null = null;
    instance: ModuleBase | null = null;

    Connect(di: ControllerDI, config: ConfigInterface): void {
        this.instance = new TrackerModule(di, <TrackerConfig>config);
    }

    GetConfigType(): string {
        return "TrackerConfig";
    }

    GetTitle(): string {
        return "Tracker";
    }

    GetInstance(): ModuleBase {
        return this.instance;
    }
}