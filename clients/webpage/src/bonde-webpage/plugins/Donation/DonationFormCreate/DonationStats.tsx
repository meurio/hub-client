import React from 'react';
import styled from '@emotion/styled';

type CurrencyProps = {
  mainColor: string;
};

const Currency = styled.div<CurrencyProps>`
  font-size: 2.5em;
  line-height: 1em;
  font-weight: bold;
  text-align: center;

  span:first-child {
    color: rgb(102, 102, 102);
    color: ${props => props.mainColor};
  }
  span:last-child {
    color: #666;
    text-transform: uppercase;
    margin: 0.4rem 0 0;
    display: block;
    font-size: 0.8rem;
    line-height: 1rem;
  }
`;

type DonationStatsStylesProps = {
  mainColor: string;
};

const DonationStatsStyles = styled.div<DonationStatsStylesProps>`
  box-shadow: #e3e3e3 0px 15px 18px -10px inset;
  padding: 2rem;

  .footer-stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    span {
      font-size: 0.8em;
      color: #666;
      line-height: 1rem;
    }
    span:last-child {
      color: ${props => props.mainColor};
    }
  }
`;

const Bar = styled.div`
  border: none;
  border-radius: 290486px;
  display: block;
  height: 1rem;
  overflow: hidden;
  padding: 0;
  width: 100%;
  margin: 1rem 0 !important;
  background-color: #dbdbdb;
`;

type ProgressProps = {
  mainColor: string;
  value: number;
};

const Progress = styled.div<ProgressProps>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 290486px;
  font-size: 0.65rem;
  font-weight: bold;
  color: #fff;

  width: ${props => (props.value > 100 ? 100 : props.value)}%;
  background-color: ${props => props.mainColor};
`;

type Props = {
  mainColor: string;
  currencyLabel?: string;
  donationsLabel?: any;
  daysLabel?: any;
  goalLabel?: string;
  data?: any;
  goalDateLimit?: string;
};

const currencyInt = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

type GoalDateRemainingProps = {
  dateLimit: string;
  daysLabel: any;
};

const GoalDateRemaining = ({
  dateLimit,
  daysLabel,
}: GoalDateRemainingProps) => {
  const now = new Date().getTime();
  const [day, month, year] = dateLimit.split('/');
  const limit = new Date(`${year}-${month}-${day}`).getTime();
  const total = Math.ceil((limit - now) / (1000 * 60 * 60 * 24));

  return <span>{daysLabel(total)}</span>;
};

const DonationStats: React.FC<Props> = ({
  data: stats,
  mainColor,
  currencyLabel,
  donationsLabel,
  goalLabel,
  goalDateLimit,
  daysLabel,
}) => {
  if (stats.goal && parseInt(stats.goal) === 1) {
    return (<DonationStatsStyles mainColor={mainColor}>
      <Currency mainColor={mainColor}>
        <span>{`R$ ${currencyInt(stats.pledged)}`}</span>
        <span>{currencyLabel}</span>
      </Currency>
    </DonationStatsStyles>);
  } else if (stats.goal) {
    return (<DonationStatsStyles mainColor={mainColor}>
      <Currency mainColor={mainColor}>
        <span>{`R$ ${currencyInt(stats.pledged)}`}</span>
        <span>{currencyLabel}</span>
      </Currency>
      <Bar>
        <Progress value={stats.progress} mainColor={mainColor}>
          {`${parseInt(stats.progress)}%`}
        </Progress>
      </Bar>
      <div className="footer-stats">
        {donationsLabel && (
          <span>{`${stats.total_donations} ${donationsLabel(
            stats.total_donations
          )}`}</span>
        )}
        {goalLabel && <span>{`${goalLabel} ${currencyInt(stats.goal)}`}</span>}
        {goalDateLimit && daysLabel && (
          <GoalDateRemaining daysLabel={daysLabel} dateLimit={goalDateLimit} />
        )}
      </div>
    </DonationStatsStyles>);
  }

  return null;
};

DonationStats.defaultProps = {
  mainColor: 'red',
  currencyLabel: 'arrecadados',
  goalLabel: 'Meta:',
  donationsLabel: (total: number) => (total > 1 ? 'apoios' : 'apoio'),
  daysLabel: total => {
    if (total === 0) return 'último dia!';
    else if (total > 0 && total < 7) return 'últimos dias!';
    else if (total === 7) return 'última semana';
    else return `faltam ${total} dias`;
  },
  data:
    '{"pledged":20345,"widget_id":8175,"goal":5000,"progress":406.9,"total_donations":572,"total_donators":63}',
};

export default DonationStats;
