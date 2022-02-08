import React from "react";
import { Stack, Skeleton } from "bonde-components";
import TargetsStatistics from "./TargetsStatistics";
import { Widget } from "../../../FetchWidgets";
import EventsCards from "./EventsCards";
import BondePressureCards from "./BondePressureCards";
import DisclaimerRelease from "./DisclaimerRelease";
import usePerformance from "./hooks/usePerformance";
import Card from "./Card";
import Charts from "./Charts";
import StepByStepCard from "./StepByStepCard";

type Props = {
  widget: Widget
}

const PerformanceScene: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = usePerformance({ widget });

  if (error) return <span>Failed</span>;

  if (loading || !data) {
    return (
      <Stack display="flex" flex={1} spacing={6}>
        <Stack direction="row" spacing={4}>
          <Stack spacing={6}>
            <Stack direction="row" spacing={4}>
              {[1, 2].map(id => (
                <Skeleton key={id} isLoading startColor="gray.50" endColor="gray.100">
                  <Card />
                </Skeleton>))}
            </Stack>
            <Skeleton display="flex" flex={1} isLoading startColor="gray.50" endColor="gray.100" />
          </Stack>
          <Skeleton
            display="flex"
            flex={1}
            h="350px"
            isLoading
            startColor="gray.50"
            endColor="gray.100"
          />
        </Stack>
        <Skeleton
          display="flex"
          flex={1}
          isLoading
          startColor="gray.50"
          endColor="gray.100"
        />
      </Stack>
    )
  }

  const {
    firstEventTimestamp,
    widgetCreatedAt,
    aggregateEvents,
    aggregateEmails,
    pressuresCount,
    charts,
    activeTargets
  } = data;

  const hasntEventHistory = firstEventTimestamp > widgetCreatedAt && aggregateEvents.length === 0;

  // Alvos
  const step1 = activeTargets.length === 0;
  // Ajustes
  const step2 = !widget.settings?.button_text;
  // Pós-ação
  const step3 = !widget.settings?.sender_name || !widget.settings?.sender_email || !widget.settings?.email_subject || !widget.settings?.email_text;

  return (
    <Stack spacing={6}>
      {!hasntEventHistory && (
        <DisclaimerRelease
          firstEventTimestamp={firstEventTimestamp}
          widgetCreatedAt={widgetCreatedAt}
        />
      )}
      {pressuresCount === 0 && (
        <StepByStepCard stepsValidation={[step1, step2, step3]} />
      )}
      <Stack direction="row" spacing={4}>
        <Stack direction="column" spacing={6}>
          <BondePressureCards targetsCount={activeTargets.length} pressuresCount={pressuresCount} />
          <EventsCards aggregateEvents={aggregateEvents} />
        </Stack>
        <Charts
          pressures={charts.pressures}
          start={charts.interval_start}
          end={charts.interval_end}
        />
      </Stack>
      {!step1 && (
        <TargetsStatistics
          aggregateEmails={aggregateEmails}
          activeTargets={activeTargets}
        />
      )}
    </Stack>
  );
}

export default PerformanceScene;
