import sendEvent from '../../AnalyticsBase';

const FORM_FILLED = {
  category: 'Formulário',
  action: 'Preenchimento Iniciado',
};

const FORM_SAVED = {
  category: 'Formulário',
  action: 'Dados Salvos com Sucesso',
};

const formIsFilled = () => sendEvent(FORM_FILLED);
const formSavedData = () => sendEvent(FORM_SAVED);

const Analytics = {
  formIsFilled,
  formSavedData,
};

export default Analytics;
