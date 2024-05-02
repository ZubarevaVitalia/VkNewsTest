import { FC, useEffect, useMemo, useState } from 'react';
import {
  Cell,
  IconButton,
  Group,
  Div,
  Header,
} from '@vkontakte/vkui';
import { Icon16DropdownOutline, Icon16ChevronOutline } from '@vkontakte/icons';
import { NewsInfo } from '../../../types';
const API_URL = 'https://hacker-news.firebaseio.com/v0/item/'

export interface CommentProps {
    itemId: number;
  }


export const Comment: FC<CommentProps> = ({ itemId }) => {
  const [fetchedComment, setComment] = useState<NewsInfo>({id:itemId});
  const [showKids, setShowKids] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const url = new URL(API_URL + `${itemId}` + '.json?print=pretty')
      const info = await (await fetch(url)).json();
      setComment(info);
    }
    
    fetchData();
  }, []);

  const buttonKids = useMemo(() => {
    if(typeof fetchedComment.kids == "undefined" || !fetchedComment.kids.length){
        return <Div style={{display:'inline-block'}}> </Div>
    }

    if(showKids){
        return (
            <IconButton onClick={() => setShowKids(false)} style={{display:'inline-block'}}>
                <Icon16DropdownOutline style={{padding:'0px'}}/>
            </IconButton>
        )
    }

    return (
        <IconButton onClick={() => setShowKids(true)} style={{display:'inline-block'}}>
            <Icon16ChevronOutline style={{padding:'0px'}}/>
        </IconButton>
    )
  },[fetchedComment, showKids])

  const commentContent = useMemo(() => {
    if(fetchedComment.deleted || fetchedComment.dead){
        return <Div>Комментарий удален</Div>
    }

    return (
        <Div dangerouslySetInnerHTML= {{__html: fetchedComment.text}} />
    )
  },[fetchedComment])

  return (   
    <>
    <Group header={<>
                <Header style={{display:'inline-block'}} mode="secondary">
                    {fetchedComment.by}
                </Header>
                {buttonKids}
            </>}>
        {commentContent}
        {showKids && 
                <Group> 
                    {fetchedComment.kids?.map((id) => <Comment key={id} itemId={id}/>)}
                </Group>}
    </Group>
    </>
  );
};