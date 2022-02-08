import { gql, useQuery } from "bonde-core-tools";
import { Widget } from "../../../../FetchWidgets";

const PERFORMANCE_GQL = gql`
  query PerformanceQuery ($widgetId: Int!, $start_date: timestamp, $end_date: timestamp) {
    activity_feed_total(widget_id: $widgetId) {
      events {
        total
        event_type
      }
    }

    activity_feed(filter: { widget_id: $widgetId, offset: 500 }) {
      data {
        email
        total
        events {
          total
          event_type
        }
      }
    }

    activity_feed_timestamp {
      min_timestamp
    }

    activist_pressures_aggregate(where: {
      widget_id: {
        _eq: $widgetId
      }
    }) {
      aggregate {
        count
      }
    }

    activist_pressures_range(
      where: {
        widget_id: { _eq: $widgetId },
        _and: [
          { created_at: { _gte: $start_date } },
          { created_at: { _lte: $end_date } },
        ]
      }
    ) {
      created_at
      total
    }
  }
`;

interface PerformanceArgs {
  widget: Widget
}

export interface ActivityFeedEvent {
  total: number
  eventType: string
}

export interface ActivityFeedEmail {
  email: string
  total: number
  events: ActivityFeedEvent[]
}

export interface ChartPressure {
  name: number
  total: number
}

interface PerformanceData {
  aggregateEvents: ActivityFeedEvent[]
  aggregateEmails: ActivityFeedEmail[]
  firstEventTimestamp: Date
  widgetCreatedAt: Date
  pressuresCount: number
  activeTargets: string[]
  charts: {
    interval_start: any,
    interval_end: any,
    pressures: ChartPressure[]
  }
}

interface PerformanceResult {
  data?: PerformanceData
  loading: boolean
  error: any
}

const usePerformance = ({ widget }: PerformanceArgs): PerformanceResult => {
  // Prepare interval date to fetch charts info
  const now = new Date();
  const before = new Date();
  before.setDate(before.getDate() - 29);

  const { data, loading, error } = useQuery(PERFORMANCE_GQL, {
    variables: {
      widgetId: widget.id,
      start_date: before.toDateString(),
      end_date: now.toDateString()
    }
  });

  if (loading || error) {
    return { loading, error }
  }

  // Parse performance data queries
  const {
    activity_feed_total: activityFeedTotal,
    activity_feed: activityFeed,
    activity_feed_timestamp: activityFeedTimestamp,
    activist_pressures_aggregate: activistPressuresAggregate
  } = data;

  // Parse aggregate events
  const aggregateEvents: ActivityFeedEvent[] = activityFeedTotal.events.map((event: any) => ({
    total: event.total,
    eventType: event.event_type
  }));

  // Parse aggregate emails
  const aggregateEmails: ActivityFeedEmail[] = activityFeed.data.map((activityFeed: any) => ({
    email: activityFeed.email,
    total: activityFeed.total,
    events: activityFeed.events.map((event: any) => ({
      total: event.total,
      eventType: event.event_type
    }))
  }));

  // Parse first event timestamp
  const firstEventTimestamp: Date = new Date(activityFeedTimestamp.min_timestamp * 1000);

  // Parse widget created at
  const widgetCreatedAt: Date = new Date(widget.created_at);

  // Parse pressures count
  const pressuresCount: number = activistPressuresAggregate.aggregate.count;

  // Parse active targets
  let activeTargets: string[];
  if (widget.settings.pressure_type === 'group') {
    activeTargets = widget.groups
      .map((group) => (group.targets || []))
      .reduce((previous, current) => [...previous, ...current], []);
  } else {
    activeTargets = widget.settings.targets || [];
  }

  // Parse charts info
  const diffInMs = (now as any) - (before as any);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const pressures: ChartPressure[] = Array.from({ length: diffInDays + 1 }, (_, index) => {
    const i = new Date(before);
    i.setDate(i.getDate() + index);
    const exist = data.activist_pressures_range.filter((a: any) => new Date(a.created_at).toDateString() === i.toDateString())[0]
    
    return {
      name: i.getDate(),
      total: exist ? exist.total : 0
    }
  })

  return {
    data: {
      aggregateEvents,
      aggregateEmails,
      firstEventTimestamp,
      widgetCreatedAt,
      pressuresCount,
      charts: {
        interval_start: before,
        interval_end: now,
        pressures
      },
      activeTargets
    },
    loading,
    error
  }
}

export default usePerformance;
