import type { PlipForm } from './useQueryFilters';

export const checkStatus = (plipForm: PlipForm): string => {
  if (!!plipForm.confirmed_signatures) return 'Concluído';

  else if (
    !plipForm.confirmed_signatures &&
    (
      (plipForm.expected_signatures === 10 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 30))) ||
      (plipForm.expected_signatures === 20 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 60))) ||
      (plipForm.expected_signatures === 30 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 90))) ||
      (plipForm.expected_signatures === 40 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 120))) ||
      (plipForm.expected_signatures === 50 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 150))) ||
      (plipForm.expected_signatures === 100 && new Date(plipForm.created_at) <= new Date(new Date().setDate(new Date().getDate() - 180)))
    )
  ) return 'Pendente';

  else return 'Inscrito';
}