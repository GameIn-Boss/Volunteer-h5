/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

const isWeixinAndroid = /Android/.test(navigator.userAgent) && /MicroMessenger/.test(navigator.userAgent);

export default isWeixinAndroid ? createHashHistory() : createHistory();
