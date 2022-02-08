export const hasEmbed = value => value.inlines.some(inline => inline.type === 'embed')

export const appendEmbed = (change: any, embed?: any): any => change
  .insertInline({
    type: 'embed',
    isVoid: true,
    data: { embed }
  })
