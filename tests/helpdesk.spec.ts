import HelpDeskJS from "$src/index";
import {HttpConfig} from "$httpModule/types";
import {WebsocketConfig} from "$websocketModule/types";

import {log} from "console";

let helpdesk = new HelpDeskJS();

describe('Helpdesk connect Http instance', () => {
    test('Connect Http instance', () => {
        log({
            BaseUrl: 'http://localhost:42000/api/v1/validate',
            Token: 'f96b3c4ca7611c03f10825f0374d83f2eb081e68740c7f084f321c330633cb1f'
        } as HttpConfig)

        helpdesk.setHttp({
            BaseUrl: 'http://localhost:42000/api/v1/validate',
            Token: 'f96b3c4ca7611c03f10825f0374d83f2eb081e68740c7f084f321c330633cb1f'
        } as HttpConfig);
    });

    test('Check Http instance', () => {
        expect(helpdesk.compose.modules.Get('Http')).not.toBeNull();
    });
})

describe('Helpdesk connect Websocket instance', () => {
    test('Connect Websocket instance', () => {
        const config = {
            BaseUrl: 'ws://localhost:3000',
            Token: '1051edec2254a6f348a30f94bed4e712fd3086c5f37868447b4cdc7978b8f476'
        } as WebsocketConfig;

        helpdesk.setWebsocket(config);
    });

    test('Check Websocket instance', () => {
        expect(helpdesk.compose.modules.Get('Websocket')).not.toBeNull();
    });
})