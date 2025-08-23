import {Assets} from 'react-native-ui-lib';

Assets.loadAssetsGroup('icons', {
  alert: require('assets/images/logo.png'),
  // hide: require('assets/icons/hide.png'),
  // show: require('assets/icons/view.png'),
});

const images = {
  logo: require('assets/images/logo.png'),
  bg_login: require('assets/images/bg_login.png'),
  img_1: require('assets/images/img_1.png'),
  img_2: require('assets/images/img_2.png'),
  userDefault: require('assets/images/user.jpg'),
  camera: require('assets/images/camera.png'),
  BILL: require('assets/images/bill.png'),
  chervon_down: require('assets/images/down.png'),
  placehohder: require('assets/images/placeholder.jpg'),
  icon_calendar: require('assets/images/calendar.png'),
  user: require('assets/images/user.jpg'),
  record: require('assets/images/record.png'),
  bg_header: require('assets/images/bg_header.png'),
  loading: require('assets/animations/loading.json'),
};

export const icons = {
  ic_create: require('assets/icons/ic_create.png'),
  ic_edit: require('assets/icons/ic_edit.png'),
  ic_delete: require('assets/icons/ic_delete.png'),
  ic_loading: require('assets/icons/ic_loading.gif'),
  ic_pin: require('assets/icons/map.png'),
};

export const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="143" height="20" viewBox="0 0 143 20" fill="none">
<path d="M19.0451 0L12.2442 6.80083L5.44342 0H0V19.0451H5.44342V8.16168L12.2442 14.966L19.0451 8.16168V19.0451H24.4885V0H19.0451Z" fill="#64BAFB"></path>
<path d="M24.4883 19.0451H32.65L43.5368 8.16168V13.6051H39.4542V19.0451H48.9768V0H43.5368L24.4883 19.0451Z" fill="#64BAFB"></path>
<path d="M63.4986 0H50.145V5.44342H56.9458V19.0451H62.3893V5.44342H63.4986H69.1901H70.2995V19.0451H75.7429V5.44342H82.5437V0H69.1901H63.4986Z" fill="#64BAFB"></path>
<path d="M83.7324 19.0451H102.778V13.6051H89.1724V12.2442H102.778V6.80083H89.1724V5.44342H102.778V0H83.7324V19.0451Z" fill="#64BAFB"></path>
<path d="M106.508 2.78717C104.648 4.64758 103.721 6.8904 103.721 9.52254C103.721 12.1547 104.651 14.3975 106.508 16.2579C108.369 18.1183 110.612 19.0451 113.244 19.0451H122.766V13.6017H113.244C112.117 13.6017 111.156 13.202 110.36 12.4062C109.561 11.6069 109.165 10.6457 109.165 9.52254C109.165 8.3994 109.564 7.43819 110.36 6.6389C111.159 5.83962 112.121 5.44342 113.244 5.44342H122.766V0H113.244C110.612 0 108.369 0.930205 106.508 2.78717Z" fill="#64BAFB"></path>
<path d="M137.56 0V6.80083H129.395V0H123.955V19.0451H129.395V12.2442H137.56V19.0451H143V0H137.56Z" fill="#64BAFB"></path>
</svg>`;

export default images;
