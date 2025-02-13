import HelpDeskJS from "$src/index.ts";
import {HttpConfig} from "$httpModule/types.ts";
import {WebsocketConfig} from "$websocketModule/types.ts";

const httpConfig = {
    url: 'http://localhost:42000/api/v1',
    Token: 'f96b3c4ca7611c03f10825f0374d83f2eb081e68740c7f084f321c330633cb1f'
} as HttpConfig;

const websocketConfig = {
    url: 'ws://localhost:42006/ws/echo',
    Token: '1051edec2254a6f348a30f94bed4e712fd3086c5f37868447b4cdc7978b8f476',
} as WebsocketConfig;

describe('HelpdeskJS index test', () => {
    const helpdesk = new HelpDeskJS(httpConfig, websocketConfig);

    test('Test initialisation', () => {
        expect(helpdesk).not.toBeNull();
    })

    test('Check Http instance', () => {
        expect(helpdesk.compose.Modules.Get('Http')).not.toBeNull();
    });

    test('Check Websocket instance', () => {
        expect(helpdesk.compose.Modules.Get('Websocket')).not.toBeNull();
    });
})