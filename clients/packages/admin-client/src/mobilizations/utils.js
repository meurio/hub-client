export const isLaunched = mobilization => (
  !!mobilization.custom_domain &&
  !!mobilization.facebook_share_image &&
  !!mobilization.facebook_share_title &&
  !!mobilization.facebook_share_description &&
  !!mobilization.twitter_share_text
)
