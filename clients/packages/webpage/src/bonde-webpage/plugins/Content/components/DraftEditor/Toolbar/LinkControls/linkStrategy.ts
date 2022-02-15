import { Entity } from 'draft-js';

export default (contentBlock: any, callback: any) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    if (entityKey) {
      const entityInstance = Entity.get(entityKey);
      return entityInstance !== null && entityInstance.getType() === 'LINK';
    }
    return false;
  }, callback);
};
