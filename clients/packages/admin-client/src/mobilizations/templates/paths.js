export const mobilizationTemplatesCreate = mobilization =>
  `/mobilizations/${mobilization.id}/templates/create`

export const mobilizationTemplatesList = () =>
  '/mobilizations/templates/list'

export const mobilizationTemplatesUpdate = templateId =>
  `/mobilizations/templates/${templateId}/update`

export const mobilizationTemplatesDestroy = templateId =>
  `/mobilizations/templates/${templateId}/destroy`

export const mobilizationTemplatesChoose = mobilization =>
  `/mobilizations/${mobilization.id}/templates/choose`

export const mobilizationTemplatesChooseCustomList = mobilization =>
  `/mobilizations/${mobilization.id}/templates/choose/custom`

export const mobilizationTemplatesChooseGlobalList = mobilization =>
  `/mobilizations/${mobilization.id}/templates/choose/global`
