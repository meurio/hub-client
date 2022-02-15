import FormAnalytics from '../plugins/Form/Analytics';
import PressureAnalytics from '../plugins/Pressure/Analytics';

describe('Analytics Base', () => {
  it('should receieve formIsFilled content', () => {
    const AnalyticsBase = jest.fn();
    AnalyticsBase(FormAnalytics.formIsFilled());
    expect(AnalyticsBase).toHaveBeenCalledWith(FormAnalytics.formIsFilled());
  });

  it('should receieve formIsSaved content', () => {
    const AnalyticsBase = jest.fn();
    AnalyticsBase(FormAnalytics.formSavedData());
    expect(AnalyticsBase).toHaveBeenCalledWith(FormAnalytics.formSavedData());
  });

  it('should receieve pressureIsFilled content', () => {
    const AnalyticsBase = jest.fn();
    AnalyticsBase(PressureAnalytics.pressureIsFilled());
    expect(AnalyticsBase).toHaveBeenCalledWith(
      PressureAnalytics.pressureIsFilled()
    );
  });

  it('should receieve pressureSavedData content', () => {
    const AnalyticsBase = jest.fn();
    AnalyticsBase(PressureAnalytics.pressureSavedData());
    expect(AnalyticsBase).toHaveBeenCalledWith(
      PressureAnalytics.pressureSavedData()
    );
  });
});
