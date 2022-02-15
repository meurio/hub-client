/* eslint-disable */
import React from 'react';
import {
  CallAgain,
  CallCompleted,
  CallFailed,
  CallNextTarget,
  Calling,
  HowItWorks,
  FinishButton,
} from './components';
import styled from '@emotion/styled';

const UnordedList = styled.ul`
  font-family: inherit;
  list-style: none;
  padding: 0;
  font-size: 0.8rem;
  margin: 0 0 0.8rem;
`;

const PhoneCalls = styled.div`
  color: #333333;
  background-color: #FFFFFF;

  .heading {
    font-size: .85rem;
    text-transform: uppercase;
    margin: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    font-size: .8rem;
    margin: 0 0 .8rem;
  }

  ul li {
    text-transform: uppercase;
    padding: 1.7rem 1.5rem;
    padding-right: .8rem;
  }

  ul li.success { background-color: #00C08A; }
  ul li.warning { background-color: #FFD500; }
  ul li.primary { background-color: #40B4E5; }
  ul li.danger { background-color: #C20000; }

  ul li .flex-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul li .fa-phone-square,
  ul li .fa-phone {
    font-size: 2.4rem;
    margin-right: 1rem;
    position: relative;
    top: 1px;
  }

  ul li .fa-phone-square { color: #333333; }
  ul li .fa-phone { color: #333333; }

  ul li .call-item {
    display: flex;
  }

  .call-status-message {
    margin-left: 20px;
  }

  .call-status-message.success{ color: #00C08A; }
  .call-status-message.warning{ color: #FFD500; }
  .call-status-message.primary{ color: #40B4E5; }
  .call-status-message.danger{ color: #DD2295; }

  .btn-call {
    border: none;
    color: #FFFFFF;
    background-color: transparent;
    border-radius: 2px;
    text-transform: uppercase;
    padding: .8rem 1rem;
    margin-left: 1rem;
    cursor: pointer;
    outline: none;
  }

  .btn-call.calling {
    background-color: #222;
  }

  .btn-call.primary {
    background-color: #40B4E5;
  }

  .btn-call.outlined {
    border: 1px solid #333333;
    color: #333333;
    padding: calc(.8rem - 1px) calc(1rem - 1px);
  }

  .btn-call.full-width {
    width: 100%;
    margin: 0;
  }

  ul li .finish {
    display: flex;
    flex-direction: row;
    text-transform: none;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  ul li .fa-check-circle {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  ul li .fa-times-circle {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  ul li .inline-container {
    display: flex;
    text-transform: none;
    text-align: right;
    align-items: center;
  }

  ul li .inline-container .prefix {
    margin-right: .3rem;
  }

  ul li .inline-container .btn-call {
    margin: 0;
  }

  .target-name {
    display: flex;
    align-items: center;
  }

  .target-name-two {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .how-it-works {
    padding: 0 1.5rem;
    font-size: .8rem;
    text-transform: uppercase;
  }

  .how-it-works > ol {
    text-align: left;
    padding-left: 1.5rem;
    font-size: .8rem;
    text-transform: none;
    margin-top: .5rem;
  }

  .how-it-works > ol > li {
    margin-bottom: .4rem;
  }

  .caption {
    font-size: .7rem;
    font-weight: 300;
    text-transform: uppercase;
    margin: 1rem 0;
    display: flex;
    flex-wrap: wrap;
  }

  .caption .item {
    padding-left: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;
    width: calc(50% - 1.5rem);
  }

  .caption .bullet {
    content: '';
    border-radius: 50%;
    width: 6px;
    height: 6px;
    margin-right: 1rem;
    background-color: #FFFFFF;
  }
  .caption .bullet.primary { background-color: #40B4E5; }
  .caption .bullet.success { background-color: #00C08A; }
  .caption .bullet.warning { background-color: #FFD500; }
  .caption .bullet.danger { background-color: #DD2295; }
`;

type AfterProps = {
  addTwilioCallMutation: any;
  buttonColor: string;
  toggleFinishMessage: any;
  callManagement: Array<{
    name: string;
    value: string;
    attempts: number;
    twilioCallTo: string;
    twilioCallTransitionStatus: string;
    twilioCallTransitionCallDuration: string;
  }>;
};

const CallingTargets = ({
  addTwilioCallMutation,
  buttonColor,
  toggleFinishMessage,
  callManagement,
}: AfterProps) => {
  return (
    <PhoneCalls>
      <UnordedList>
        {callManagement.map((target, i: number) => {
          const {
            name,
            value,
            attempts,
            twilioCallTo: to,
            twilioCallTransitionStatus: status,
            twilioCallTransitionCallDuration: duration,
          } = target;

          const componentKey = `target-phone-${i}`;

          if (to === value) {
            if (status === 'completed') {
              return (
                <CallCompleted
                  listKey={componentKey}
                  name={name}
                  duration={duration}
                />
              );
            } else if (
              ['initiated', 'ringing', 'in-progress'].includes(status)
            ) {
              return (
                <Calling status={status} listKey={componentKey} name={name} />
              );
            } else if (['busy', 'failed', 'no-answer'].includes(status)) {
              if (attempts < 0)
                return (
                  <CallAgain
                    listKey={componentKey}
                    name={name}
                    attempts={attempts}
                    addTwilioCallMutation={addTwilioCallMutation}
                  />
                );
              return <CallFailed listKey={componentKey} name={name} />;
            }
          }
          return (
            <CallNextTarget
              listKey={componentKey}
              name={name}
              addTwilioCallMutation={addTwilioCallMutation}
            />
          );
        })}
      </UnordedList>
      <HowItWorks />
      <FinishButton
        buttonColor={buttonColor}
        toggleFinishMessage={toggleFinishMessage}
      />
    </PhoneCalls>
  );
};

export default CallingTargets;
