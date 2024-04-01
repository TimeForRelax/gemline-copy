//@ts-ignore
import smoothscroll from 'smoothscroll-polyfill';
import { useEffect, useState } from 'react';
import { usePrevious } from './usePrevious';

export const useBlockBodyScroll = (condition: boolean) => {
  const [body, setBody] = useState<HTMLElement>();

  const prevCondition = usePrevious(condition);

  useEffect(() => {
    smoothscroll.polyfill();
  });

  useEffect(() => {
    let bodyElement = document.getElementById('body');
    let bodyElementByTag: any = document.getElementsByTagName('body');
    bodyElement && setBody(bodyElement);
    !bodyElement && bodyElementByTag[0] && setBody(bodyElementByTag[0]);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSwitch = (value: boolean) => {
    if (body) {
      body.style.overflow = value ? 'hidden' : 'visible';
    }
  };

  useEffect(() => {
    condition !== prevCondition && handleSwitch(condition);
  }, [condition]);
};
