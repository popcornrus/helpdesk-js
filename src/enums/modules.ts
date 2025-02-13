import {ModuleConnectorInterface} from "$core/module";
import HttpConnector from "$httpModule/connector";

const Modules: { [key: string]: ModuleConnectorInterface } = {
    Http: new HttpConnector()
};

export default Modules;
