import { FC, useEffect, useState } from 'react';
import {
  Header,
  Div,
  CellButton,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { NewsInfo } from '../../../types';
import { DEFAULT_VIEW_PANELS } from '../../../routes';

const API_URL = 'https://hacker-news.firebaseio.com/v0/item/'

export interface NewsContentProps{
  newsId: number;
}

export const NewsContent: FC<NewsContentProps> = ({ newsId }) => {
  const routeNavigator = useRouteNavigator();
  const [fetchedNews, setNews] = useState<NewsInfo>({id:newsId, title:''});
  const [time, setTime] = useState<string | ''>();

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
    

  const onNewsClick = () => {
    const params = `id=${newsId}`
    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.NEWS}?${params}`)
  }
  
  return (
    <CellButton subhead={<Header>{fetchedNews?.title}</Header>} 
                onClick={onNewsClick} 
                subtitle={
                    <Div>
                        Рейтинг: {fetchedNews?.score} Дата: {time} Автор: {fetchedNews?.by}
                    </Div>
                } />
  );
};