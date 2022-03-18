import React, { useContext } from 'react';
import { gql, useQuery } from 'bonde-core-tools';
//
// @route /mobilizations/:mobilization_id/templates/choose
//
import { connect } from 'react-redux';
import * as CommunitySelectors from '../../../community/selectors';
// import MobSelectors from '../../../mobrender/redux/selectors';
import { asyncUpdateMobilization } from '../../../mobrender/redux/action-creators';
import * as TemplateSelectors from '../../../mobilizations/templates/selectors';
import * as paths from '../../../paths';
import Page from './page';
import { SidebarContext } from '../../sidebar/Provider';
import { MobilizationDetailContext } from '../MobilizationDetailProvider';

const mapStateToProps = (state, props) => ({
  communityId: CommunitySelectors.getCurrentId(state),
  // mobilization: MobSelectors(state, props).getMobilization(),
  templatesGlobal: TemplateSelectors.getGlobalTemplates(state),
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length,
});

const mapActionsToProps = (dispatch, props) => ({
  asyncUpdateMobilization: async (values) => dispatch(asyncUpdateMobilization(values)),
  // createMobilizationFromTemplate: ({ mobilization, template }) => {
  //   dispatch(
  //     asyncUpdateMobilization({
  //       id: mobilization.id,
  //       template_mobilization_id: template.id,
  //     })
  //   ).then(() => {
  //     props.history.push(paths.editMobilization(mobilization.id));
  //   });
  // },
  createEmptyMobilization: ({ mobilization }) => {
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

const PageGraphQL = ({ asyncUpdateMobilization, ...props }) => {
  const { mobilization } = useContext(SidebarContext);
  const { updateBlocksAndWidgets } = useContext(MobilizationDetailContext)
  const { data, loading, error } = useQuery(FETCH_TEMPLATES, {
    variables: { communityId: props.communityId },
    fetchPolicy: 'network-only',
  });

  if (error) {
    console.log('PageGraphQL error', error);
    return 'Failed!';
  }

  const createMobilizationFromTemplate = ({ mobilization, template }) => {
    return asyncUpdateMobilization({ id: mobilization.id, template_mobilization_id: template.id })
      .then((data) => {
        console.log("data", { data });
        updateBlocksAndWidgets();
        props.history.push(paths.editMobilization(mobilization.id));
      })
      .catch((err) => {
        console.log("err", err);
      })
  }

  return (
    <Page
      {...props}
      loading={loading}
      mobilization={mobilization}
      createMobilizationFromTemplate={createMobilizationFromTemplate}
      customTemplatesLength={
        (data || {}).customTemplates ? data.customTemplates.aggregate.count : 0
      }
      globalTemplates={(data || {}).globalTemplates ? data.globalTemplates : []}
    />
  );
};

export default connect(mapStateToProps, mapActionsToProps)(PageGraphQL);
