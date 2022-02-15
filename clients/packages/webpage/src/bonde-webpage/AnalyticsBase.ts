type Event = {
  category: string;
  action: string;
  label?: string;
  value?: string;
};

const AnalyticsBase = ({ action, category, label, value }: Event) => {
  if (
    typeof window !== 'undefined' &&
    typeof (window as any).gtag !== 'undefined'
  ) {
    // console.log('event', { action, category, label, value });
    (window as any).gtag('event', action, {
      debug_mode: true,
      event_category: category,
      event_label: label,
      value,
    });
  }
};

export default AnalyticsBase;
