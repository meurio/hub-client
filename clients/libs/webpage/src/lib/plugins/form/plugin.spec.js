import Form from './plugin'
import { Button } from './components'
import test from 'ava'
import { shallow } from 'enzyme'
import * as React from 'react'
import { IntlProvider } from 'react-intl'

const props = {
    "analyticsEvents": {
        formIsFilled: () => {}
    },
    "block": {
        // "id": 11840,
        // "mobilization_id": 1104,
        // "created_at": "2019-04-26T15:20:47.875-03:00",
        // "updated_at": "2019-04-26T15:20:47.875-03:00",
        // "bg_class": "{\"r\":0,\"g\":86,\"b\":255,\"a\":1}",
        // "position": 3,
        // "hidden": null,
        // "bg_image": null,
        // "name": null,
        // "menu_hidden": null,
        // "deleted_at": null,
        // "offsetTop": 416,
        // "scrollTopReached": false
    },
    "widget": {
        // "id": 20116,
        // "block_id": 11840,
        // "kind": "form",
        "settings": {
            // "fields": [{
            //     "uid": "field-1556543750971-46",
            //     "kind": "text",
            //     "label": "Nome",
            //     "placeholder": "nome da pessoa",
            //     "required": "false"
            // }],
            "count_text": "numero de pessoas q enviaram",
            "email_text": "Thank you for betting on the strength of collective networking action. Your participation is very important and we need your help now so that more people can collaborate with this mobilization. Share on your networks by clicking one of the links below. \n\nA hug",
            "button_text": "Enviar",
            "call_to_action": "Form1"
        },
        // "sm_size": 12,
        // "md_size": 6,
        // "lg_size": 6,
        // "form_entries_count": 3,
        // "donations_count": 0,
        // "created_at": "2019-04-26T15:20:47.955-03:00",
        // "updated_at": "2019-04-29T10:16:41.713-03:00",
        // "action_community": false,
        // "action_opportunity": true,
        // "exported_at": null,
        // "match_list": {},
        // "count": 0,
        // "goal": null
    },
    "mobilization": {
        // "id": 1104,
        // "name": "Mobilização 1",
        // "created_at": "2019-04-26T15:20:11.256-03:00",
        // "updated_at": "2019-04-29T10:16:41.715-03:00",
        // "user_id": 359,
        // "color_scheme": "comedoresdemelanciasemcaroco-scheme",
        // "google_analytics_code": null,
        // "goal": "Description1",
        "header_font": null,
        // "body_font": null,
        // "facebook_share_title": null,
        // "facebook_share_description": null,
        // "facebook_share_image": null,
        // "slug": "mobilizacao-1",
        // "custom_domain": null,
        // "twitter_share_text": "Acabei de colaborar com Mobilização 1. Participe você também: ",
        // "community_id": 179,
        // "tag_list": {},
        // "favicon": null,
        // "status": "active"
    },
}

test('check if send button is shown when no form fields is present', t => {
    const { intl } = new IntlProvider({ locale: "en" }, {}).getChildContext()
	const wrapper = shallow(
        <Form {...props} intl={intl} />
    );

    t.true(wrapper.find(Button).length === 0, 'O botão de envio não deveria aparecer!')
    // t.true(button.length === 0)
});