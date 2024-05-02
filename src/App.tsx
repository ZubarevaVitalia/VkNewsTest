import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home } from './panels/Home/Home';
import { DEFAULT_VIEW_PANELS } from './routes';
import { News } from './panels/News/News';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <News id="news" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
