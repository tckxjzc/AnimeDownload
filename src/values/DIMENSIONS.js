import { Dimensions, NativeModules } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const STATUS_BAR_HEIGHT = NativeModules.StatusBarManager.HEIGHT;
export default {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    STATUS_BAR_HEIGHT,
};
