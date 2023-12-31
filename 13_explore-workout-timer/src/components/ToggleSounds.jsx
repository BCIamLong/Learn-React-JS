import PropTypes from "prop-types";
import styles from "./ToggleSounds.module.css";

ToggleSounds.propTypes = {
  mute: PropTypes.bool,
  onSetMute: PropTypes.func,
};

function ToggleSounds({ mute, onSetMute }) {
  return (
    // <div className={`${styles.toggleSounds} ${styles.mute}`}>
    <div
      className={`${styles.toggleSounds} ${mute ? styles.mute : ""}`}
      onClick={() => onSetMute((mute) => !mute)}
    >
      <p>🔈</p>
      <p className={styles.unsound}>🔇</p>
    </div>
  );
}

export default ToggleSounds;
