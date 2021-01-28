import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import Timer from './Timer';
import styles from './Layout.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title = 'images' }) => {
  const [state, setState] = useState<boolean>(false);
  const [time, setTime] = useState<string>('2021-01-28 16:00:00');
  const [tz, setTz] = useState<string>('Europe/Minsk');
  const [timeAndTz, setTimeAndTz] = useState({
    time: '2021-01-28 16:00:00',
    timeZone: 'Europe/Minsk',
  });

  const handlerButton = () => {
    if (time && tz) {
      setTimeAndTz({ time: time, timeZone: tz });
      setState(false);
    } else {
      alert('Enter date');
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header />
      <section>{children}</section>
      <section className={styles.wrapTimer}>
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
          <Timer
            time={timeAndTz.time}
            timeZone={timeAndTz.timeZone}
            onFinish={() => setState(true)}
          />
        )}
      </section>
      <div className={styles.nav}>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <select value={tz} onChange={(e) => setTz(e.currentTarget.value)}>
          <option value="America/Los_Angeles">America/Los_Angeles</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/Minsk">Europe/Minsk</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
          <option value="Asia/Krasnoyarsk">Asia/Krasnoyarsk</option>
        </select>
        <button onClick={handlerButton}>ОК</button>
      </div>
      <footer />
    </>
  );
};

export default Layout;
