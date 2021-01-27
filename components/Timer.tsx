import { useEffect, useState, useCallback } from 'react';
import styles from './Timer.module.css';

const useCountDown = (time: Date) => {
  return time.getTime() - Date.now();
};

type PropsTimer = {
  time: Date;
  onFinish: () => void;
};

const Time: React.FC<PropsTimer> = ({ time, onFinish }) => {
  const countDown = useCountDown(time);
  useEffect(() => {
    if (countDown <= 0) {
      onFinish();
    }
  }, [countDown]);

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return (
    <div className={styles.timer}>
      <div>{days}</div>
      <div>:</div>
      <div>{hours}</div>
      <div>:</div>
      <div>{minutes}</div>
      <div>:</div>
      <div>{seconds}</div>
    </div>
  );
};

const Timer: React.FC<PropsTimer> = ({ time, onFinish }) => {
  const [, setState] = useState(0);
  const [timer, setTimer] = useState<any>(null);
  useEffect(() => {
    if (time.getTime() - Date.now() > 0) {
      const t = setInterval(() => {
        setState(Date.now());
      }, 1000);
      setTimer(t);
    }
  }, []);

  const onFinishCalback = useCallback(() => {
    clearInterval(timer);
    onFinish();
  }, [timer, onFinish]);
  return <Time time={time} onFinish={onFinishCalback} />;
};

type PropsShowTimer = {
  date: string;
};

const ShowTimer: React.FC<PropsShowTimer> = ({ date }) => {
  const [state, setState] = useState<boolean>(false);
  const time = new Date(date);

  return (
    <div className={styles.wrapTimer}>
      {state ? (
        <iframe
          className={styles.video}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/DLzxrzFCyOs?autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <Timer time={time} onFinish={() => setState(true)} />
      )}
    </div>
  );
};

export default ShowTimer;
