import sendEvent from '../../AnalyticsBase';

const DONATION_STARTED = {
  category: 'Doação',
  action: 'Escolheu Valor',
};

const DONATION_FINISHED = {
  category: 'Doação',
  action: 'Servidor Recebeu Dados',
};

const donationSetValue = () => sendEvent(DONATION_STARTED);
const donationFinishRequest = (value: string) =>
  sendEvent({ ...DONATION_FINISHED, label: value });

const Analytics = {
  donationSetValue,
  donationFinishRequest,
};

export default Analytics;
