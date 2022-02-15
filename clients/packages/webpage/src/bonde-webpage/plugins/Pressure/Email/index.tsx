import React, { useReducer } from 'react';

import { Translate } from '../../../components/MobilizationClass';
import { Count, Form, Targets } from '../components';
import { GroupTarget } from '../components/Targets';
import FetchTargets from '../FetchTargets';
import { Header } from '../styles';
import { getTargetList } from '../utils';
import EmailFields from './EmailFields';

/* TODO: Change static content by props
 * - title
 * - bgColor
 */

type Props = {
  /* Below props are from root parent */
  editable: boolean;
  mobilization: any;
  widget: {
    id: number;
    count: number;
    settings: {
      main_color: string;
      call_to_action?: string;
      title_text: string;
      button_text: string;
      pressure_subject?: string;
      pressure_body?: string;
      disable_edit_field: string;
      targets: string;
      finish_message_type?: string;
      finish_message?: Record<any, any>;
      finish_message_background?: string;
      count_text?: string;
      show_city?: string;
      show_state?: string;
      pressure_type?: string | 'unique' | 'group';
      optimization_enabled?: boolean;
    };
  };
  block: any;
  // ApolloClient instance
  client?: any;
  pressureTargets?: GroupTarget[];
  overrides: {
    FinishCustomMessage: {
      component?: any;
      props: any;
    };
    FinishDefaultMessage: {
      component?: any;
      props: any;
    };
  };
  analyticsEvents: {
    pressureIsFilled: () => void;
    pressureSavedData: () => void;
  };
  asyncFillWidget: (_params: {
    payload: Record<string, any>;
    widget: Record<string, any>;
  }) => Promise<any>;
};

const initialState = {
  loading: false,
  data: undefined,
  errors: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'fetching':
      return { ...state, loading: true, data: undefined, errors: [] };
    case 'success':
      return { ...state, loading: false, data: action.payload, errors: [] };
    case 'failed':
      return {
        ...state,
        loading: false,
        errors: action.payload,
        data: undefined,
      };
    default:
      throw new Error('action.type not found');
  }
};

export const EmailPressure = ({
  pressureTargets,
  widget,
  asyncFillWidget,
  mobilization,
  analyticsEvents,
  overrides,
}: Props): any => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    main_color: mainColor,
    call_to_action: callToAction,
    title_text: titleText,
    // Maybe `reply_email` is necessary...
    // reply_email,
    count_text: countText,
    optimization_enabled: optimizationEnabled = true,
    finish_message_type: finishMessageType,
    disable_edit_field: disableEditField,
    targets,
    pressure_type,
  } = widget.settings;

  let targetList: string[] = [];
  const pureTargets: GroupTarget[] = pressureTargets || [];

  if (!!targets && pressure_type !== 'group') {
    targetList = getTargetList(targets) || [];
  }

  const handleSubmit =
    (t: any) =>
    ({ targetsInput, ...data }: any): Promise<any> | any => {
      if (targetList.length < 1 && !targetsInput) {
        dispatch({
          type: 'failed',
          payload: [t('Pressure TargetBlank Validation')],
        });
      } else {
        dispatch({ type: 'fetching' });

        const payload = {
          activist: {
            firstname: data.name,
            lastname: data.lastname,
            email: data.email,
            city: data.city || null,
            state: data.state || null,
          },
          targets_id: targetsInput,
          mail: {
            disableEditField,
            subject: data.subject,
            body: data.body,
          },
          form_data: data,
        };

        return asyncFillWidget({ payload, widget })
          .then((data: any) => {
            if (!data.create_email_pressure) throw new Error('pressure_failed');

            analyticsEvents && analyticsEvents.pressureSavedData();
            return dispatch({ type: 'success', payload: data });
          })
          .catch((_e: any) => {
            // console.log('e', e);
            return dispatch({
              type: 'failed',
              payload: [t('Pressure Network Failed')],
            });
          });
      }
    };

  if (state.data) {
    const {
      FinishCustomMessage: {
        component: FinishCustomMessage,
        props: customProps,
      },
      FinishDefaultMessage: {
        component: FinishDefaultMessage,
        props: defaultProps,
      },
    } = overrides;

    return finishMessageType === 'custom' ? (
      <FinishCustomMessage
        mobilization={mobilization}
        widget={widget}
        {...customProps}
      />
    ) : (
      <FinishDefaultMessage
        mobilization={mobilization}
        widget={widget}
        {...defaultProps}
      />
    );
  }

  return (
    <Translate>
      {({ t }: any) => (
        <div id={`widget-${widget.id}`}>
          <div onKeyDown={(e) => e.stopPropagation()} />
          <Header backgroundColor={mainColor}>
            {callToAction || titleText}
          </Header>
          <Form
            widget={widget}
            pureTargets={pureTargets}
            onSubmit={handleSubmit(t)}
            saving={state.loading}
            BeforeStandardFields={() => {
              return (
                <>
                  <Targets
                    targets={targetList}
                    pureTargets={pureTargets}
                    pressureType={pressure_type || 'email'}
                  />
                  {EmailFields.before(
                    targetList,
                    analyticsEvents.pressureIsFilled()
                  )}
                </>
              );
            }}
            AfterStandardFields={() => (
              <EmailFields.after
                disableSubjectAndBody={
                  disableEditField === 's' || optimizationEnabled
                }
              />
            )}
            errors={state.errors}
          />
          {countText && (
            <Count
              shadow
              value={widget.count || 0}
              color={mainColor}
              text={countText}
              startCounting={typeof window !== 'undefined'}
            />
          )}
        </div>
      )}
    </Translate>
  );
};

// Wrapper All Plugin to get targets group
const EmailPressureTargets = ({ asyncFetchTargets, ...props }: any) => (
  <FetchTargets
    asyncFetchTargets={asyncFetchTargets}
    widgetId={props.widget.id}
  >
    {({ data }: any) =>
      <EmailPressure pressureTargets={data} {...props} />
      // <h2>EmailPressure Loaded</h2>
    }
  </FetchTargets>
);

export default EmailPressureTargets;