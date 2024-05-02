import { FC, useEffect, useState } from 'react';
import {
    useRouteNavigator,
    useSearchParams,
  } from '@vkontakte/vk-mini-apps-router'
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  NavIdProps,
  Cell,
  Link,
  IconButton,
  Header,
} from '@vkontakte/vkui';
import { Icon28ArrowLeftOutline, Icon16Sync } from '@vkontakte/icons';
import { NewsInfo } from '../../types';
import { Comment } from './Comments/Comment';

const API_URL = 'https://hacker-news.firebaseio.com/v0/item/'

export const News: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [params] = useSearchParams();
  const newsId = params.get('id') || 0;

  const [fetchedNews, setNews] = useState<NewsInfo | undefined>();
  const [time, setTime] = useState<string | undefined>();

  async function fetchData() {
    const url = new URL(API_URL + `${newsId}` + '.json?print=pretty')
    const info = await (await fetch(url)).json();
    const date = new Date(info.time * 1000);
    setTime(date.toLocaleString('ru-GB', {
                          dateStyle: 'full',
                          timeStyle: 'long',
    }));
    setNews(info);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
  <Panel id={id}>
    <PanelHeader 
      before={
          <PanelHeaderButton onClick={() => routeNavigator.back()}>
            <Icon28ArrowLeftOutline />
          </PanelHeaderButton>
        }>
      {fetchedNews?.title}
    </PanelHeader>
    
    <Group>
      <Cell before='Ссылка на новость'>
        <Link href={fetchedNews?.url} target="_blank">{fetchedNews?.url}</Link>
      </Cell>
      <Cell before='Дата публикации'>
          {time}
      </Cell>
      <Cell before='Автор'>
          {fetchedNews?.by}
      </Cell>
      <Group header={<>
                <Header style={{display:'inline-block'}} mode="secondary">
                    Комментарии {fetchedNews?.descendants}
                </Header>
                <IconButton onClick={fetchData} style={{display:'inline-block', color:'#818c99'}}>
                    <Icon16Sync style={{padding:'0px'}}/>
                </IconButton>
                </>}>
        {fetchedNews?.kids?.map((id) => <Comment key={id} itemId={id} />)}
      </Group>
    </Group>
  </Panel>
    
  );
};