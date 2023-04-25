export const URLs = {
  backend: 'http://localhost:8080',

  //Authentifizierung
  register: '/user/auth/register',
  verify: '/user/auth/verify',
  login: '/user/auth/login',
  pwdRstRqu: '/user/auth/pwd-reset-request',
  pwdRst: '/user/auth/reset-pwd',
  refresh: 'user/auth/refresh',
  logout: '/logout',
  delete: 'user/auth/delete',


  //Organisation
  getAllOrganisations: '/user/orga/get-all',
  getOrganisation: 'user/orga/get-orga/',
  getOrganisationForUser: '/user/orga/get-for-user/',
  getRoleInOrganisation: '',
  requestJoinToOrga: '',
  acceptOrgaInvite:'',
  declineOrgaInvite: '',
  leaveOrga: '',
  getAllEventsForUserOfOrganisation: '',
  getAllRegisteredEventsForUserInOrga: '',


  //Events
  getRegisteredEventsForUser:'/user/event/get-registered/',
  getAllEventsForUser:'/user/event/get-all/',


  //Organisator
  createEvent:'/organizer/event/create/',
  changeEvent:'/organizer/event/change/',
  deleteEvent: '/organizer/event/delete/'

};
