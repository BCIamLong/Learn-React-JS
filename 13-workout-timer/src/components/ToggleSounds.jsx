import PropsType from "prop-types";
import { memo } from "react";

ToggleSounds.propTypes = {
  allowSound: PropsType.bool,
  setAllowSound: PropsType.func,
};
function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);

// const ToggleSounds = memo(function ToggleSounds({ allowSound, setAllowSound }) {
//   return (
//     <button
//       className="btn-sound"
//       onClick={() => setAllowSound((allow) => !allow)}
//     >
//       {allowSound ? "🔈" : "🔇"}
//     </button>
//   );
// });

// ToggleSounds.propTypes = {
//   allowSound: PropsType.bool,
//   setAllowSound: PropsType.func,
// };

// export default ToggleSounds;
