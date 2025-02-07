import {ModuleConnector, ModuleInterface} from "$core/module";

import HttpModule from "$httpModule/controller/module";

export default class TrackerConnector extends ModuleConnector {
    instance: ModuleInterface = new HttpModule(this.GetConfig());

    GetTitle(): string {
        return 'Http';
    }
}