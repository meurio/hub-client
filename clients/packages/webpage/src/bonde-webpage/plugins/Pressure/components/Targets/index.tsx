import React from 'react';
import { useField } from 'react-final-form';

import { Translate } from '../../../../components/MobilizationClass';
import { pressureUtils } from '../../utils';
import { Wrapper, Label, Container, ListWrapper, Item, Span } from './styles';

const parseTarget = (target: string) => {
  const targetSplit = target.split('<') || [];
  const valid = targetSplit.length === 2;
  return valid
    ? { name: targetSplit[0]?.trim(), value: targetSplit[1]?.replace('>', '') }
    : null;
};

export type GroupTarget = {
  identify: string;
  label: string;
  targets?: string[];
  email_subject?: string;
  email_body?: string;
};

const Targets = ({
  targets,
  pureTargets,
  pressureType,
}: {
  targets: string[];
  pureTargets?: GroupTarget[];
  pressureType: string | 'unique' | 'group';
}) => {
  let groupTarget: Pick<GroupTarget, 'targets'> = { targets };
  const { input } = useField('targetsInput');

  if (pureTargets && pureTargets.length > 0 && pressureType === 'group') {
    const newGroup: GroupTarget | undefined = pureTargets.filter(
      (t: GroupTarget) => t.identify === input.value
    )[0];
    if (newGroup) {
      groupTarget = newGroup;
    }
  }

  const newTargets = groupTarget.targets || [];
  const isPressurePhone = pressureType === pressureUtils.PRESSURE_TYPE_PHONE;
  const targetsCount = newTargets.length;

  return targetsCount > 0 ? (
    <Wrapper>
      <Label>
        <Translate>
          {({ t }: any) => t('Pressure Target Label', { count: targetsCount })}
        </Translate>
      </Label>
      <Container>
        <ListWrapper>
          {newTargets.map((obj: string, index) => {
            const target = parseTarget(obj);
            return !target ? null : (
              <Item key={`target-item-${index}`}>
                <p>
                  <Span>{target.name}</Span>
                  {!isPressurePhone && <Span>{target.value}</Span>}
                </p>
              </Item>
            );
          })}
        </ListWrapper>
      </Container>
    </Wrapper>
  ) : null;
};

Targets.defaultProps = {
  targets: [],
};

const TargetsPhone = (props: any) => {
  return (
    <Wrapper>
      <Label>
        <Translate>
          {({ t }: any) =>
            t('Pressure Target Label', { count: props.targets.length })
          }
        </Translate>
      </Label>
      <Container>
        <ListWrapper>
          {props.targets.map((target: string, index: number) => (
            <Item key={`target-phone-${index}`}>
              <p>
                <Span>{target.split('<')[0]}</Span>
              </p>
            </Item>
          ))}
        </ListWrapper>
      </Container>
    </Wrapper>
  );
};

const TargetsPhoneFunc = (props: any) =>
  props.pressureType === pressureUtils.PRESSURE_TYPE_PHONE ? (
    <TargetsPhone {...props} />
  ) : (
    <Targets {...props} />
  );

export default TargetsPhoneFunc