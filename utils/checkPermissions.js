const CustomError = require('../errors');

// to make sure a user cant view another user details
const chechPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (requestUser.role === 'admin') return; //admin can automatically access any user details
  if (requestUser.userId === resourceUserId.toString()) return; //do nothing if requesting user is same as requested user
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = chechPermissions;
