import PressureEmail from './PressureEmail';
import PressurePhone from './PressurePhone';
import React from 'react';

export default {
  editable: true,
  widget: {
    action_community: false,
    action_opportunity: false,
    block_id: 14287,
    count: 0,
    created_at: '2020-02-20T10:52:26.040-03:00',
    donations_count: 0,
    exported_at: null,
    form_entries_count: 0,
    goal: null,
    id: 24525,
    kind: 'draft',
    lg_size: 6,
    match_list: [],
    md_size: 6,
    settings: {
      content: {
        object: 'value',
        document: {
          object: 'document',
          data: {},
          nodes: [
            {
              object: 'block',
              type: 'line',
              data: {},
              nodes: [
                {
                  object: 'text',
                  leaves: [
                    {
                      object: 'leaf',
                      text: 'Click here to edit...',
                      marks: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    sm_size: 12,
    updated_at: '2020-04-20T2',
  },
  plugins: [
    {
      kind: 'content',
      options: {
        _draftPlugin: {
          icon: 'font',
          label: 'Text',
          action: (widget: any) => {
            console.log(`update widget ${widget.id}`);
          },
        },
      },
    },
    {
      kind: 'form',
      options: {
        _draftPlugin: {
          icon: 'list',
          label: 'Form',
          action: (widget: any) => {
            console.log(`update widget ${widget.id}`);
          },
        },
      },
    },
    {
      kind: 'pressure',
      options: {
        _draftPlugin: {
          label: 'Pressure',
          icon: () => <PressureEmail />,
          action: (widget: any) => {
            console.log(`update widget ${widget.id}`);
          },
        },
      },
    },
    {
      kind: 'pressure-phone',
      options: {
        _draftPlugin: {
          label: 'Pressão por telefone',
          icon: () => <PressurePhone />,
          action: (widget: any) => {
            console.log(`update widget ${widget.id}`);
          },
        },
      },
    },
    {
      kind: 'donation',
      options: {
        _draftPlugin: {
          icon: 'money',
          label: 'Donation',
          action: (widget: any) => {
            console.log(`update widget ${widget.id}`);
          },
        },
      },
    },
  ],
};
