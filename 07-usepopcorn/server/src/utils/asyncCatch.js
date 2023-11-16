export default (fn) => (req, res, next) => fn(req, res, next).catch(next);

// (fn) => (req, res, next) => {
//   try {
//     fn(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// };
