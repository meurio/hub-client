import React from 'react'
import { graphql } from 'react-apollo'
// import { browserHistory } from 'react-router'

export default ({
  // [gql]: Query carregamento dos dados.
  query,
  // [object | function]: Parametros utilizados na query caso exista. Se
  // função recebe `ownProps` e deve retornar um `object`.
  queryParams,
  // [integer]: Linhas por página
  limit,
  // [string]: Nome da query utilizada. É usado para mapear as propriedades
  // do componente envovlido.
  queryName,
  parse
}) => (WrappedComponent) => {
  // Injeta como propriedade do componente `WrappedComponent` o seguinte
  // objeto:
  // ```
  // {
  //   loading: Verdade enquanto realiza a requisição
  //   data: Linhas paginadas
  //   totalCount: Total de linhas retornadas pela query
  // }
  // ```

  class PP extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const withQuery = graphql(query, {
    options: (ownProperties) => {
      let options = {
        variables: {
          first: limit,
          offset: (
            ownProperties.location &&
            ownProperties.location.query.page &&
            (ownProperties.location.query.page - 1) * limit
          ) || 0
        }
      }

      if (typeof queryParams === 'function') {
        options = {
          variables: {
            ...queryParams(ownProperties),
            ...options.variables
          }
        }
      } else if (typeof queryParams === 'object') {
        options = {
          variables: {
            ...queryParams,
            ...options.variables
          }
        }
      }

      return options
    },
    props: ({ data, ownProps: { location } }) => {
      const all = data[queryName] ? data[queryName].nodes : []
      return {
        loading: data.loading,
        data: all.map(parse),
        totalCount: data[queryName] ? data[queryName].totalCount : 0,
        refetch: data.refetch,
        onNextPage: () => {
          // browserHistory.push({
          //   ...location,
          //   query: {
          //     ...location.query,
          //     page: parseInt(location.query.page || 1) + 1
          //   }
          // })
        },
        onPreviousPage: () => {
          const previousPage = Number.parseInt(location.query.page || 1) - 1
          if (previousPage > 0) {
            // browserHistory.push({
            //   ...location,
            //   query: {
            //     ...location.query,
            //     page: previousPage
            //   }
            // })
          }
        }
      }
    }
  })

  return withQuery(PP)
}
