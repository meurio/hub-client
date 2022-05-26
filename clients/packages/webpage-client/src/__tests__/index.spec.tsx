// __tests__/index.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import Home from '../pages/index'
import '@testing-library/jest-dom'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    domainPublic: 'bonde.devel'
  }
}));

const mobilization = {
  "id": 1116,
  "name": "Template",
  "created_at": "2019-03-11T14:00:13.328724",
  "color_scheme": "minhabeaga-scheme",
  "google_analytics_code": "G-",
  "goal": "Testar inserção de widgets e montagem de template!!!",
  "header_font": null,
  "body_font": null,
  "facebook_share_title": "asdasdasd",
  "facebook_share_description": null,
  "facebook_share_image": "https://s3.amazonaws.com/hub-central/uploads/1635189778_nossas.png",
  "slug": "teste-de-widgets",
  "custom_domain": "",
  "twitter_share_text": "Acabei de colaborar com Template. Participe você também: ",
  "community_id": 75,
  "language": "pt-BR",
  "community": {
    "image": null,
    "name": "Minha Beagá",
    "signature": null
  },
  "favicon": null,
  "status": "active"
};
const blocks = [
  {
    "id": 11945,
    "menu_hidden": null,
    "hidden": null,
    "bg_class": "{\"r\":250,\"g\":252,\"b\":245,\"a\":1}",
    "bg_image": null,
    "name": "Block 3",
    "position": 2,
    "mobilization_id": 1116
  },
  {
    "id": 11944,
    "menu_hidden": null,
    "hidden": false,
    "bg_class": "{\"r\":240,\"g\":133,\"b\":133,\"a\":1}",
    "bg_image": null,
    "name": "Home",
    "position": 3,
    "mobilization_id": 1116
  },
  {
    "id": 13564,
    "menu_hidden": null,
    "hidden": null,
    "bg_class": "{\"r\":18,\"g\":27,\"b\":172,\"a\":1}",
    "bg_image": null,
    "name": "Seção 03",
    "position": 4,
    "mobilization_id": 1116
  },
  {
    "id": 14096,
    "menu_hidden": null,
    "hidden": null,
    "bg_class": null,
    "bg_image": null,
    "name": null,
    "position": 5,
    "mobilization_id": 1116
  },
  {
    "id": 14823,
    "menu_hidden": null,
    "hidden": null,
    "bg_class": null,
    "bg_image": "https://s3.amazonaws.com/hub-central/uploads/1635536257_CapturadeTela2021-10-26as19.45.33.png",
    "name": null,
    "position": 6,
    "mobilization_id": 1116
  }
];
const widgets = [
  {
    "id": 20291,
    "kind": "content",
    "goal": null,
    "settings": {
      "content": "{\"object\":\"value\",\"document\":{\"object\":\"document\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"Clique para editar a \",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":16,\"g\":15,\"b\":15,\"a\":1}}}]},{\"object\":\"leaf\",\"text\":\"ferramenta asdsadasdasd \",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]},{\"object\":\"inline\",\"type\":\"image\",\"data\":{\"src\":\"https://s3.amazonaws.com/hub-central-dev/uploads/1648043309_nossas.png\"},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"asdsad asdas dasd asdadads\",\"marks\":[{\"object\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":0,\"g\":255,\"b\":255,\"a\":1}}}]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]},{\"object\":\"inline\",\"type\":\"embed\",\"data\":{\"embed\":\"<a href=\\\"https://twitter.com/share?ref_src=twsrc%5Etfw\\\" class=\\\"twitter-share-button\\\" data-size=\\\"large\\\" data-text=\\\"Sen. @mariamercedg ¿usted está a favor o en contra de una regulación de la cannabis con perspectiva de justicia social que garantice derechos, como lo propone la coalición @regulacionxpaz? \\\" data-url=\\\"http://www.regulacion-por-la-paz.bonde.org/#block-34648\\\" data-hashtags=\\\"#RegulaciónPorLaPaz #CannabisLegal\\\" data-show-count=\\\"false\\\">Tweet</a><script async src=\\\"https://platform.twitter.com/widgets.js\\\" charset=\\\"utf-8\\\"></script>\"},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]}]}}"
    },
    "block_id": 11944,
    "created_at": "2019-03-11T14:00:19.940042",
    "updated_at": "2022-03-23T13:48:37.36183",
    "sm_size": 12,
    "md_size": 12,
    "lg_size": 12,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 0
      }
    }
  },
  {
    "id": 20292,
    "kind": "form",
    "goal": null,
    "settings": {
      "fields": "[{\"uid\":\"field-1552312909841-49\",\"kind\":\"text\",\"label\":\"Nome Completo 2\",\"placeholder\":\"Insira seu nome\",\"required\":\"true\"},{\"uid\":\"field-1552312920353-15\",\"kind\":\"email\",\"label\":\"Email\",\"placeholder\":\"Insira seu e-mail\",\"required\":\"true\"},{\"uid\":\"field-1552312933368-45\",\"kind\":\"dropdown\",\"label\":\"Estado\",\"placeholder\":\"Acre; Alagoas; Amapá; Amazonas\",\"required\":\"true\"},{\"uid\":\"field-1636404742422-3\",\"kind\":\"number\",\"label\":\"Whatsapp\",\"placeholder\":\"Seu whatsapp\",\"required\":\"false\"}]",
      "count_text": "completaram",
      "email_text": "Obrigado por apostar na força da ação coletiva! Sua participação é muito importante e, agora, precisamos da sua ajuda para potencializar nosso impacto. Compartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço",
      "main_color": "rgba(63,122,207,1)",
      "button_text": "enviar",
      "sender_name": "Teste",
      "sender_email": "teste@nossas.org",
      "email_subject": "Obrigado por preencher o formulário",
      "call_to_action": "Formulario"
    },
    "block_id": 11945,
    "created_at": "2019-03-11T14:00:29.563986",
    "updated_at": "2022-01-14T17:56:10.864561",
    "sm_size": 12,
    "md_size": 6,
    "lg_size": 6,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 27
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 0
      }
    }
  },
  {
    "id": 20293,
    "kind": "draft",
    "goal": 40000,
    "settings": {
      "main_color": "#f23392",
      "title_text": "Envie um email para quem pode tomar essa decisão",
      "button_text": "Enviar email"
    },
    "block_id": 11945,
    "created_at": "2019-03-11T14:00:29.571271",
    "updated_at": "2021-08-20T20:55:55.340308",
    "sm_size": 12,
    "md_size": 6,
    "lg_size": 6,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 5
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 0
      }
    }
  },
  {
    "id": 23193,
    "kind": "draft",
    "goal": null,
    "settings": {
      "targets": "Teste <+55321321312312312321>",
      "show_city": "city-false",
      "main_color": "#f23392",
      "title_text": "Ligue para quem pode tomar essa decisão",
      "button_text": "Ligar"
    },
    "block_id": 13564,
    "created_at": "2019-09-05T17:15:02.769159",
    "updated_at": "2020-05-21T14:59:50.715789",
    "sm_size": 12,
    "md_size": 6,
    "lg_size": 4,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 0
      }
    }
  },
  {
    "id": 23194,
    "kind": "pressure",
    "goal": null,
    "settings": {
      "targets": [
        "teste <teste@nossas.org>"
      ],
      "show_city": "city-true",
      "count_text": "",
      "email_text": "Lorem ipsum dolor sit caelum",
      "mail_limit": 1000,
      "main_color": "#7ed321",
      "show_state": "s",
      "title_text": "Send an email to anyone who can make this decision",
      "batch_limit": 50,
      "button_text": "Send Email",
      "sender_name": "Teste",
      "sender_email": "teste@nossas.org",
      "email_subject": "Obrigado por pressionar",
      "pressure_body": "blablabla",
      "pressure_type": "group",
      "finish_message": {
        "object": "value",
        "document": {
          "data": {},
          "nodes": [
            {
              "data": {},
              "type": "paragraph",
              "nodes": [
                {
                  "leaves": [
                    {
                      "text": "Uma linha de texto em um ",
                      "marks": [],
                      "object": "leaf"
                    }
                  ],
                  "object": "text"
                },
                {
                  "data": {
                    "href": "asdasd.com",
                    "text": "parágrafo",
                    "title": "asdads",
                    "target": "_blank"
                  },
                  "type": "link",
                  "nodes": [
                    {
                      "leaves": [
                        {
                          "text": "parágrafo",
                          "marks": [],
                          "object": "leaf"
                        }
                      ],
                      "object": "text"
                    }
                  ],
                  "object": "inline"
                },
                {
                  "leaves": [
                    {
                      "text": ".",
                      "marks": [],
                      "object": "leaf"
                    }
                  ],
                  "object": "text"
                }
              ],
              "object": "block"
            },
            {
              "data": {},
              "type": "paragraph",
              "nodes": [
                {
                  "leaves": [
                    {
                      "text": "",
                      "marks": [],
                      "object": "leaf"
                    }
                  ],
                  "object": "text"
                }
              ],
              "object": "block"
            },
            {
              "data": {},
              "type": "paragraph",
              "nodes": [
                {
                  "leaves": [
                    {
                      "text": "",
                      "marks": [],
                      "object": "leaf"
                    }
                  ],
                  "object": "text"
                }
              ],
              "object": "block"
            },
            {
              "data": {},
              "type": "paragraph",
              "nodes": [
                {
                  "leaves": [
                    {
                      "text": "",
                      "marks": [],
                      "object": "leaf"
                    }
                  ],
                  "object": "text"
                },
                {
                  "data": {
                    "src": "https://s3.amazonaws.com/hub-central/uploads/1612909116_WhatsAppImage2020-06-22at20.12.12.jpeg"
                  },
                  "type": "image",
                  "nodes": [
                    {
                      "leaves": [
                        {
                          "text": "",
                          "marks": [],
                          "object": "leaf"
                        }
                      ],
                      "object": "text"
                    }
                  ],
                  "object": "inline"
                },
                {
                  "leaves": [
                    {
                      "text": "",
                      "marks": [],
                      "object": "leaf"
                    }
                  ],
                  "object": "text"
                }
              ],
              "object": "block"
            }
          ],
          "object": "document"
        }
      },
      "pressure_subject": "bla",
      "disable_edit_field": "n",
      "finish_message_type": "share",
      "optimization_enabled": false
    },
    "block_id": 13564,
    "created_at": "2019-09-05T17:15:02.778494",
    "updated_at": "2020-07-27T18:46:36.860267",
    "sm_size": 12,
    "md_size": 6,
    "lg_size": 8,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 24
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 0
      }
    }
  },
  {
    "id": 24146,
    "kind": "donation",
    "goal": 10000,
    "settings": {
      "email_text": "Obrigado",
      "main_color": "#54d0f6",
      "title_text": "Clique para editar a ferramenta",
      "button_text": "Doar agora",
      "sender_name": "Teste",
      "payment_type": "unique",
      "sender_email": "teste@nossas.org",
      "email_subject": "Obrigado",
      "donation_value1": "5",
      "donation_value2": "10",
      "donation_value3": "15",
      "donation_value4": "25",
      "donation_value5": "",
      "goal_date_limit": "02/06/2020",
      "payment_methods": "true",
      "recurring_period": 30,
      "external_resource": 300,
      "default_donation_value": "2"
    },
    "block_id": 14096,
    "created_at": "2019-12-04T18:31:38.247293",
    "updated_at": "2020-08-10T20:25:43.294045",
    "sm_size": 12,
    "md_size": 6,
    "lg_size": 4,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 18
      }
    }
  },
  {
    "id": 24147,
    "kind": "draft",
    "goal": null,
    "settings": {
      "email_text": "obrigada",
      "main_color": "#54d0f6",
      "title_text": "Click to set up your donation block",
      "button_text": "Give Now",
      "sender_name": "teste",
      "sender_email": "teste@nossas.org",
      "email_subject": "vc doou"
    },
    "block_id": 14096,
    "created_at": "2019-12-04T18:31:38.256936",
    "updated_at": "2020-05-21T15:00:58.675032",
    "sm_size": 12,
    "md_size": 6,
    "lg_size": 8,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 2
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 0
      }
    }
  },
  {
    "id": 25516,
    "kind": "content",
    "goal": null,
    "settings": {
      "content": "{\"object\":\"value\",\"document\":{\"object\":\"document\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"Clique para editar a ferramenta\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"line\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]}]}}"
    },
    "block_id": 14823,
    "created_at": "2020-04-16T23:17:29.902835",
    "updated_at": "2021-10-29T19:37:28.501411",
    "sm_size": 12,
    "md_size": 12,
    "lg_size": 12,
    "activist_pressures_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "form_entries_aggregate": {
      "aggregate": {
        "count": 0
      }
    },
    "donations_aggregate": {
      "aggregate": {
        "count": 0
      }
    }
  }
];


describe('Index Page', () => {
  it('renders mobilization with block and widget donation plugin buton', () => {
    act(() => {
      render(<Home mobilization={mobilization} blocks={blocks} widgets={widgets} />)
    });

    const heading = screen.getByRole('button', {
      name: /Doar agora/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders mobilization with 404', () => {
    act(() => {
      render(<Home mobilization={false} blocks={blocks} widgets={widgets} />)
    });

    const heading = screen.getByRole('img', {
      name: /404 Not Found/i,
    })

    expect(heading).toBeInTheDocument()
  })
})