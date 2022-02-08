import { useQuery, gql } from "bonde-core-tools";

const PLIP_PERFORMANCE_QUERY = gql`
  query ($widget_id: Int!, $pending_created_at: timestamptz, $start_date: timestamptz, $end_date: timestamptz) {
    total_subscribers: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id }
      }
    ) {
      aggregate {
        count
      }
    }
    
    pending_subscribers: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id },
        confirmed_signatures: { _is_null: true },
        created_at: { _lte: $pending_created_at }
      }
    ) {
      aggregate {
        count
      }
    }
    
    pending_signatures: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id },
        confirmed_signatures: { _is_null: true }
      }
    ) {
      aggregate {
        sum {
          expected_signatures
        }
      }
    }
    
    confirmed_signatures: plips_aggregate(
      where: {
        widget_id: { _eq: $widget_id },
        confirmed_signatures: { _is_null: false }
      }
    ) {
      aggregate {
        confirmed_subscribers: count
        sum {
          confirmed_signatures
        }
      }
    }
    
    states_signatures: plips_by_state(
      where: {
        widget_id: { _eq: $widget_id }
      }
    ) {
      state
      expected_signatures
      confirmed_signatures
      subscribers
    }

    subscribers_range: plips_subscribers_range(
      where: {
        widget_id: { _eq: $widget_id },
        _and: [
          { created_at: { _gte: $start_date } },
          { created_at: { _lte: $end_date } },
        ]
      }
    ) {
      total
      widget_id
      created_at
    }

    plips(
      where: {
        widget_id: { _eq: $widget_id }
      },
      limit: 10
    ) {
      name: form_data(path: "name")
      email: form_data(path: "email")
      state
      expected_signatures
      confirmed_signatures
      created_at
    }
  }
`;

export interface StateSignature {
  state: any;
  expected_signatures: number;
  confirmed_signatures: number;
  subscribers: number;
}

export interface SubscribersRange {
  total: number;
  created_at: string;
}

export interface PlipsForm {
  name: string;
  email: string;
  state: string;
  expected_signatures?: number;
  confirmed_signatures?: number;
  created_at: string;
}

interface ResultData {
  total_subscribers: {
    aggregate: {
      count: number;
    }
  };
  pending_subscribers: {
    aggregate: {
      count: number;
    }
  };
  pending_signatures: {
    aggregate: {
      sum: {
        expected_signatures: number;
      }
    }
  };
  confirmed_signatures: {
    aggregate: {
      confirmed_subscribers: number;
      sum: {
        confirmed_signatures: number;
      }
    }
  };
  states_signatures: StateSignature[];
  subscribers_range: SubscribersRange[];
  plips: PlipsForm[]
}

interface ResultQuery<T> {
  data?: T;
  loading: boolean;
  error?: any;
}

export interface PerformanceData {
  total_subscribers: number;
  pending_subscribers: number;
  confirmed_subscribers: number;
  pending_signatures: number;
  confirmed_signatures: number;
  states_signatures: StateSignature[]
  subscribers_range: SubscribersRange[];
  subscribers_range_start: Date;
  subscribers_range_end: Date;
}

export const usePerformanceQuery = (widget_id: number): ResultQuery<PerformanceData> => {
  // Prepare interval date to fetch charts info
  const now = new Date();
  const before = new Date();
  before.setDate(before.getDate() - 29);

  const { data, loading, error }: ResultQuery<ResultData> = useQuery(PLIP_PERFORMANCE_QUERY, {
    variables: {
      widget_id: widget_id,
      pending_created_at: before.toDateString(),
      start_date: before.toDateString(),
      end_date: now.toDateString()
    }
  });

  if (data) {
    // Parse charts info
    const diffInMs = (now as any) - (before as any);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    const subscribers_range: SubscribersRange[] = Array.from({ length: diffInDays + 1 }, (_, index) => {
      const i = new Date(before);
      i.setDate(i.getDate() + index);
      const exist = data.subscribers_range.filter((a: any) => new Date(a.created_at).toDateString() === i.toDateString())[0]
      
      return {
        created_at: String(i.getDate()),
        total: exist ? exist.total : 0
      }
    })

    return {
      loading,
      error,
      data: {
        total_subscribers: data.total_subscribers.aggregate.count,
        pending_subscribers: data.pending_subscribers.aggregate.count,
        confirmed_subscribers: data.confirmed_signatures.aggregate.confirmed_subscribers,
        pending_signatures: data.pending_signatures.aggregate.sum.expected_signatures,
        confirmed_signatures: data.confirmed_signatures.aggregate.sum.confirmed_signatures,
        states_signatures: data.states_signatures,
        subscribers_range: subscribers_range,
        subscribers_range_start: before,
        subscribers_range_end: now
      }
    }
  }

  return { loading, error, data };
}