import sendEvent from '../../AnalyticsBase';

const PRESSURE_FILLED = {
  category: 'Pressão',
  action: 'Preenchimento Iniciado',
};

const PRESSURE_SAVED = {
  category: 'Pressão',
  action: 'Dados Salvos com Sucesso',
};

const pressureIsFilled = () => sendEvent(PRESSURE_FILLED);
const pressureSavedData = () => sendEvent(PRESSURE_SAVED);

const Analytics = {
  pressureIsFilled,
  pressureSavedData,
};

export default Analytics;
