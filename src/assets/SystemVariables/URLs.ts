export const URLs = {
  backend: 'http://localhost:8080',

  //Authentifizierung
  register: '/user/auth/register',
  verify: '/user/auth/verify',
  login: '/user/auth/login',
  pwdRstRqu: '/user/auth/pwd-reset-request',
  pwdRst: '/user/auth/reset-pwd',
  refresh: '/user/auth/refresh',
  logout: '/logout',
  delete: '/user/auth/delete/',

  //User
  getInfo: '/user/info/',
  resetPWD: '/user/auth/reset-pwd',

  //Organisation
  getAllOrganisations: '/user/orga/get-all',
  getOrganisation: '/user/orga/get-orga/',
  getOrganisationForUser: '/user/orga/get-for-user/',
  getRoleInOrganisation: '',
  acceptOrgaInvite:'',
  declineOrgaInvite: '',
  leaveOrga: '',
  getAllEventsForUserOfOrganisation: '',
  getAllRegisteredEventsForUserInOrga: '',
  getOrgaInvitationsForUser:'/user/orga/get-invitations/',


  //Events
  getRegisteredEventsForUser:'/user/event/get-registered/',
  getAllEventsForUser:'/user/event/get-all/',
  getEventInvitationsForUser:'/user/event/get-invitations/',

  //Organisator
  createEvent:'/organizer/event/create/',
  changeEvent:'/organizer/event/change',
  deleteEvent: '/organizer/event/delete/',
  createEventSeres:'/organizer/event-series/create/',
  getManagingEventsInOrga: '/event/managing/get/',
  getUnafiliatedUsers: '/organizer/event/get/unaffiliated-users',
  getUnafiliatedGroups: '/organizer/event/get/unaffiliated-groups',
  createPreset:'/organizer/preset/create/',
  changePreset:'/organizer/preset/change',
  deletePreset:'/organizer/preset/delete/',
  getPresetsFromOrga:'/organizer/preset/get-from-orga/',


  //Administrator


  //Documents
  getFiles: '/attendee/get-files/',
  downloadFile: '/attendee/download-files',
};
