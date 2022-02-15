/* eslint-disable prefer-promise-reject-errors */
import FormAnalytics from '../../plugins/Form/Analytics';

const asyncFormEntryCreate = ({
  mobilizationId,
  formEntry,
}: {
  mobilizationId: number;
  formEntry: Record<string, any>;
}) => (_dispatch: any, _getState: any, { api }: any) => {
  const endpoint = `/mobilizations/${mobilizationId}/form_entries`;
  const body = { form_entry: formEntry };
  return api
    .post(endpoint, body)
    .then(({ data }: { data: any }) => {
      FormAnalytics.formSavedData();
      return Promise.resolve(data);
    })
    .catch((failure: any) => {
      return Promise.reject({ _error: `Response ${failure}` });
    });
};

// const updateWidget = (state: any, payload: any) => {
//   const widget = MobSelectors(state).getWidget(payload.widget_id);
//   return { ...widget, form_entries_count: widget.form_entries_count + 1 };
// };

export default asyncFormEntryCreate;
