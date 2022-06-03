import React from 'react';
import { gql, useQuery } from 'bonde-core-tools';
//
// @route /mobilizations/:mobilization_id/templates/choose
//
import { connect } from 'react-redux';
import * as CommunitySelectors from '../../../../../community/selectors';
import MobSelectors from '../../../../../mobrender/redux/selectors';
import { asyncUpdateMobilizationWithTemplate } from '../../../../../mobrender/redux/action-creators';
import * as TemplateSelectors from '../../../../../mobilizations/templates/selectors';
import * as paths from '../../../../../paths';
import Page from './page';

const mapStateToProps = (state, props) => ({
  communityId: CommunitySelectors.getCurrentId(state),
  mobilization: MobSelectors(state, props).getMobilization(),
  templatesGlobal: TemplateSelectors.getGlobalTemplates(state),
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length,
});

const mapActionsToProps = (dispatch, props) => ({
  createMobilizationFromTemplate: ({ mobilization, template }) => {
    dispatch(
      asyncUpdateMobilizationWithTemplate({
        id: mobilization.id,
        template_mobilization_id: template.id,
      })
    ).then(() => {
      props.history.push(paths.editMobilization(mobilization.id));
    });
  },
  createEmptyMobilization: ({ mobilization }) => {
    console.log("createEmptyMobilization", { mobilization });
    props.history.push(paths.createBlock(mobilization));
  },
});

const FETCH_TEMPLATES = gql`
  query allTemplates($communityId: Int!) {
    customTemplates: template_mobilizations_aggregate(
      where: { community_id: { _eq: $communityId }, global: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }

    globalTemplates: template_mobilizations(where: { global: { _eq: true } }) {
      id
      name
      userId: user_id
      colorScheme: color_scheme
      facebookShareTitle: facebook_share_title
      facebookShareDescription: facebook_share_description
      headerFont: header_font
      bodyFont: body_font
      facebookShareImage: facebook_share_image
      slug
      customDomain: custom_domain
      twitterShareText: twitter_share_text
      communityId: community_id
      usesNumber: uses_number
      global
      createdAt: created_at
      updateAt: updated_at
      goal
      favicon
    }
  }
`;

const PageGraphQL = (props) => {
  const { data, loading, error } = useQuery(FETCH_TEMPLATES, {
    variables: { communityId: props.communityId },
    fetchPolicy: 'network-only',
  });

  if (error) {
    console.log('PageGraphQL error', error);
    return 'Failed!';
  }

  return (
    <Page
      {...props}
      loading={loading}
      customTemplatesLength={
        (data || {}).customTemplates ? data.customTemplates.aggregate.count : 0
      }
      globalTemplates={(data || {}).globalTemplates ? data.globalTemplates : []}
    />
  );
};

export default connect(mapStateToProps, mapActionsToProps)(PageGraphQL);
