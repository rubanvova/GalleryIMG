import { useEffect, useState, useCallback } from 'react';
import styles from './Timer.module.css';
import moment from 'moment-timezone';

const useCountDown = (time: moment.Moment) => {
  return time.valueOf() - Date.now();
};

type PropsTime = {
  time: moment.Moment;
  onFinish: () => void;
};

const Time: React.FC<PropsTime> = ({ time, onFinish }) => {
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

type PropsTimer = {
  time: string;
  onFinish: () => void;
  timeZone: string;
};

const Timer: React.FC<PropsTimer> = ({ time, onFinish, timeZone }) => {
  const [, setState] = useState(0);
  const [timer, setTimer] = useState<any>(null);
  const date = moment(time).tz(timeZone);

  useEffect(() => {
    if (date.valueOf() - Date.now() > 0) {
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
  return <Time time={date} onFinish={onFinishCalback} />;
};

export default Timer;
