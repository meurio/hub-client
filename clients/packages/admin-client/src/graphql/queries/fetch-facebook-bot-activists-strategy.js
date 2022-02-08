import { gql } from 'bonde-core-tools';

//
// @param Object({ extraFields: Array })
//
export default ({ extraFields = [] }) => gql`
query fetchFacebookBotActivistsStrategy(
  $search: JSON!
  $first: Int
) {
  query: getFacebookBotActivistsStrategy(
    search: $search,
    first: $first
  ) {
    totalCount
    activists: nodes {
      fbContextRecipientId
      ${extraFields.join(' ')}
    }
  }
}
`
