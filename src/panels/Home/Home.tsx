import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  NavIdProps,
} from '@vkontakte/vkui';
import { NewsContent } from './NewsContent';
import { Icon28RefreshOutline } from '@vkontakte/icons';

const API_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json'
const params = {
  'print':'pretty',
  'orderBy':'"$priority"',
  'limitToFirst': '100',
}

export const Home: FC<NavIdProps> = ({ id }) => {
  const [fetchedNewsIds, setFetchedNewsIds] = useState<number[]>([]);

  const fetchInfo = (url: RequestInfo | URL) => {
    return new Promise<number[]>((resolve) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
    })
  }

  const showInfo = async () => {
    const url = new URL(API_URL)
    url.search = new URLSearchParams(params).toString()
    let info = await fetchInfo(url);
    setFetchedNewsIds(info);
    console.log(info);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      showInfo();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader 
        before={
            <PanelHeaderButton onClick={showInfo}>
              <Icon28RefreshOutline />
            </PanelHeaderButton>
          }>
        Последние новости
      </PanelHeader>
      
      <Group>
        {fetchedNewsIds?.map((newsId) => <NewsContent key={newsId} newsId={newsId} />)}
      </Group>
    </Panel>
  );
};