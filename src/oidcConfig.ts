const oidcConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_0cK7yNVJr",
  client_id: "35gs2safccnf49vo9d7ubqv65o",
  redirect_uri: `${window.location.origin}/login`,
  response_type: "code",
  scope: "openid email phone",
}

export default oidcConfig